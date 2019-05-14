import React from 'react';
import { AsyncStorage, Switch } from 'react-native';
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
  Spacer
} from '../../components/styled';

import { ThemeContext } from '../../App';

const ProBadge = ({ isPro }) => (
  <Badge primary={isPro} shadow={!isPro}>
    <Body stiny white={isPro} noMargin>
      {isPro ? 'PRO' : 'NORMAL'}
    </Body>
  </Badge>
);

export default class Settings extends React.Component {
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
      </Wrapper>
    );
  };

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
