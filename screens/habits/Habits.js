import React from 'react';
import { Platform, AsyncStorage } from 'react-native';
import { Icon } from 'expo';
import FullLoading from '../../components/FullLoading';
import {
  Body,
  Heading,
  Wrapper,
  Block,
  Flat,
  FabButton
} from '../../components/styled';
import Habit from '../../components/Habit';

export default class Home extends React.PureComponent {
  static navigationOptions = {
    header: null
  };

  _onFabPress = () => {
    this.props.navigation.navigate('CreateHabit');
  };

  _renderEmptyState = () => {
    return (
      <Block>
        <Body placeholder noMargin>
          You have no habits :-(. Most of us have habits right? So please add
          one :)
        </Body>
      </Block>
    );
  };

  componentWillMount() {
    // this._logout();
  }

  _logout = () => {
    new Promise.all([
      AsyncStorage.clear(),
      this.props.client.cache.reset()
    ]).then(() => {
      this.props.navigation.navigate('Auth');
    });
  };

  render() {
    const { loading, habits } = this.props.data;
    if (loading && !habits) {
      return <FullLoading />;
    }

    return (
      <React.Fragment>
        <Flat
          data={habits}
          renderItem={({ item }) => <Habit habit={item} />}
          keyExtractor={item => item.id}
        />
        <FabButton onPress={this._onFabPress} big>
          <Icon.Ionicons
            name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
            size={this.props.theme.size.xlarge}
            style={{ marginBottom: -3 }}
            color={this.props.theme.colors.white}
          />
        </FabButton>
      </React.Fragment>
    );
  }
}
