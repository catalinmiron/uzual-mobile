import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  Switch,
  Image,
  Linking
} from 'react-native';
import FullLoading from '../../components/FullLoading';
import {
  Body,
  Heading,
  Wrapper,
  RowAligned,
  Button,
  Badge,
  Scroll,
  Row,
  Spacer,
  Line
} from '../../components/styled';

import { ThemeContext } from '../../config/theme';

const ProBadge = ({ isPro }) => (
  <Badge primary={isPro} shadow={!isPro}>
    <Body stiny white={isPro} noMargin>
      {isPro ? 'PRO' : 'NORMAL'}
    </Body>
  </Badge>
);

export default class Settings extends React.PureComponent {
  static navigationOptions = {
    header: null
  };

  _renderX = () => {
    const { me } = this.props.data;
    const { name, email, isPro } = me;
    return (
      <Wrapper center>
        <RowAligned center>
          <Heading large noMargin marginRight>
            {name}
          </Heading>
          <ProBadge isPro={isPro} />
        </RowAligned>
        <Body center>{email}</Body>
        <Button onPress={this._logout} shadow>
          <Body center noMargin>
            Logout
          </Body>
        </Button>
        <ThemeContext.Consumer>
          {({ toggleTheme, theme }) => (
            <Spacer>
              <Row>
                <Body>Dark theme?</Body>
                <Switch
                  value={theme === 'dark'}
                  onValueChange={toggleTheme}
                  trackColor={this.props.theme.colors.primary}
                />
              </Row>
            </Spacer>
          )}
        </ThemeContext.Consumer>
        <Line />
        <Wrapper style={styles.row}>
          <TouchableOpacity
            onPress={() =>
              this._openLink(
                'https://www.youtube.com/playlist?list=PLQocKVqyqZDQrUU7zUfFogbAO0ynvQK2j'
              )
            }
          >
            <Body center>Watch the coding process</Body>
            <Image
              style={styles.image}
              source={require('../../assets/images/youtube-logo.png')}
            />
          </TouchableOpacity>
        </Wrapper>
      </Wrapper>
    );
  };

  _openLink = async url => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log("Don't know how to open URI: " + url);
    }
  };

  componentDidUpdate() {
    if (!this.props.data.loading && !this.props.data.me) {
      this._logout();
    }
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
    if (this.props.data.loading && !this.props.data.me) {
      return <FullLoading />;
    }
    return <Scroll>{this._renderX()}</Scroll>;
  }
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  }
});
