import React from 'react';
import {
  Platform,
  Dimensions,
  Image,
  CameraRoll,
  Share,
  TouchableOpacity
} from 'react-native';
import { v4 as uuid } from 'uuid';
import { captureRef as takeSnapshotAsync } from 'react-native-view-shot';
import * as Icon from '@expo/vector-icons';
import queries from './queries.gql';
import FullLoading from '../../components/FullLoading';
import * as Permissions from 'expo-permissions';
import {
  RowAligned,
  Body,
  Heading,
  Wrapper,
  Scroll,
  Button,
  Spacer
} from '../../components/styled';
import MoodGraph from '../../components/MoodGraph';
import DayMood from '../../components/DayMood';
import { start, current, end, TIME_FORMAT } from '../../utils/dayjs';
import { POLL_INTERVAL } from '../../constants/vars';
const { width, height } = Dimensions.get('screen');
const hitSlop = { top: 10, left: 10, bottom: 10, right: 10 };

export default class Mood extends React.Component {
  static navigationOptions = {
    header: null
  };
  moodGraphRef = React.createRef();

  componentWillReceiveProps(nextProps) {
    if (nextProps.navigation.getParam('isLoading')) {
      setTimeout(() => {
        takeSnapshotAsync(this.moodGraphRef, {
          format: 'png',
          result: 'tmpfile',
          quality: 1
        }).then(result => {
          this.props.navigation.setParams({
            isLoading: false,
            imageUri: result
          });
        });
      }, 0);
      // let saveResult = await CameraRoll.saveToCameraRoll(result, 'photo');
    }
  }

  _renderHeader = () => {
    return (
      <RowAligned>
        <Heading left large>
          MOODS
        </Heading>
        <Wrapper style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={this._takeSnapshot} hitSlop={hitSlop}>
            <Icon.Ionicons
              name={Platform.OS === 'ios' ? 'ios-share' : 'md-share'}
              size={this.props.theme.size.xlarge}
              style={{ marginBottom: -3 }}
              color={this.props.theme.colors.default}
            />
          </TouchableOpacity>
        </Wrapper>
      </RowAligned>
    );
  };

  _renderContent = () => {
    const { moods } = this.props.data;
    return (
      <>
        <MoodGraph moods={moods} />
        {!this._hasDayMood() && (
          <DayMood setMood={this._onSetMood} query={queries.moods} />
        )}
      </>
    );
  };

  _onSetMood = async type => {
    const date = current.format(TIME_FORMAT);
    await this.props.data.stopPolling();
    this.props.setMood({
      variables: {
        date,
        type
      },
      optimisticResponse: {
        __typename: 'Mutation',
        setMood: {
          __typename: 'Mood',
          date,
          type,
          id: uuid()
        }
      },
      update: (proxy, { data: { setMood } }) => {
        try {
          const data = proxy.readQuery({
            query: queries.moods,
            variables: { start, end }
          });

          const lastMood = data.moods.slice(-1);
          if (lastMood[0] && lastMood[0].date.startsWith(date)) {
            data.moods.splice(-1, 1, setMood);
          } else {
            data.moods.push(setMood);
          }

          proxy.writeQuery({
            query: queries.moods,
            variables: { start, end },
            data
          });
          this.props.data.startPolling(POLL_INTERVAL);
        } catch (err) {
          console.error(err);
        }
      }
    });
  };

  _takeSnapshot = async () => {
    this.props.navigation.setParams({ tabBarVisible: false, isLoading: true });
  };

  _cancelSharing = () => {
    this.props.navigation.setParams({
      isLoading: false,
      imageUri: null,
      tabBarVisible: true
    });
  };

  _onSaveMoodGraph = async () => {
    const { isLoading, imageUri } = this._getProps();
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== 'granted') {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (newPermission.status === 'granted') {
        await CameraRoll.saveToCameraRoll(imageUri, 'photo');
      }
    } else {
      await CameraRoll.saveToCameraRoll(imageUri, 'photo');
    }

    this._cancelSharing();
  };

  _onShareMoodGraph = async () => {
    try {
      const { imageUri } = this._getProps();
      const result = await Share.share({
        message:
          'My Mood graph from @Uzualapp (https://uzual.app) make me feel better.',
        url: imageUri
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          this._cancelSharing();
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  _getProps = () => {
    return {
      isLoading: this.props.navigation.getParam('isLoading', false),
      imageUri: this.props.navigation.getParam('imageUri', null)
    };
  };

  _renderX = () => {
    const { isLoading } = this._getProps();

    return (
      <Wrapper
        ref={this.moodGraphRef}
        center={isLoading}
        noMargin={isLoading}
        style={{
          height: isLoading ? height : undefined
        }}
      >
        {!isLoading && this._renderHeader()}
        {/* <Body>
          From: {start.format(TIME_FORMAT)} - To:{current.format(TIME_FORMAT)}
        </Body> */}
        {this._renderContent()}
        {isLoading && this._renderCopyright()}
      </Wrapper>
    );
  };

  _renderSnapshot = () => {
    const { imageUri } = this._getProps();
    return (
      <Wrapper center>
        <Image
          source={{ uri: imageUri }}
          style={[{ width, height }]}
          resizeMode='contain'
        />
        <RowAligned
          center
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: height * 0.1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: this.props.theme.colors.loadingBg
          }}
        >
          <Button
            width={width * 0.2}
            loadingBg
            noMargin
            marginRight={this.props.theme.spacing.default}
            onPress={this._cancelSharing}
          >
            <Body center placeholder>
              Cancel
            </Body>
          </Button>
          <Button
            width={width * 0.2}
            loadingBg
            noMargin
            onPress={this._onShareMoodGraph}
            hitSlop={hitSlop}
          >
            <Body center primary>
              Share
            </Body>
          </Button>
          <Button
            width={width * 0.2}
            loadingBg
            noMargin
            onPress={this._onSaveMoodGraph}
            marginRight={this.props.theme.spacing.default}
          >
            <Body center={this.props.theme.spacing.default}>Save</Body>
          </Button>
        </RowAligned>
      </Wrapper>
    );
  };

  _renderCopyright = () => {
    return (
      <Body center noMargin placeholder marginTop={30}>
        Go get Uzual.app -> https://uzual.app
      </Body>
    );
  };

  render() {
    if (this.props.data.loading && !this.props.data.moods) {
      return <FullLoading />;
    }

    const { imageUri } = this._getProps();
    if (imageUri) {
      return this._renderSnapshot();
    }
    return <Scroll>{this._renderX()}</Scroll>;
  }

  _hasDayMood = () => {
    const { moods } = this.props.data;
    const lastMood = moods.slice(-1);

    if (lastMood.length === 0) {
      return false;
    }
    if (lastMood[0].date.startsWith(current.format(TIME_FORMAT))) {
      return true;
    }

    return false;
  };
}
