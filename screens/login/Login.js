import React from 'react';
import { Image, AsyncStorage } from 'react-native';
import { USER_ACCESS_TOKEN } from '../../constants/auth';
import FullLoading from '../../components/FullLoading';
import {
  Body,
  Heading,
  Wrapper,
  LoginWrapper,
  Input,
  Button,
  Scroll,
  Spacer
} from '../../components/styled';

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isLoading: false,
    error: null
  };

  _change = (type, value) => {
    this.setState({
      [type]: value,
      error: null
    });
  };

  _getErrorMessage = () => {
    const { email, password } = this.state;
    if (!email && !password) {
      return 'Fields are mandatory';
    }
    if (!email) {
      return 'Email is missing';
    }
    if (!password) {
      return 'Password is missing';
    }
  };

  _goToRegister = () => {
    this.props.navigation.navigate('Register');
  };

  _login = async () => {
    console.log('login');
    const { email, password } = this.state;
    if (!email || !password) {
      const error = this._getErrorMessage();
      return this.setState({
        error
      });
    }
    await this.setState({
      isLoading: true
    });

    try {
      const { data } = await this.props.login({
        variables: {
          email,
          password
        }
      });
      if (data && data.login && data.login.token) {
        await AsyncStorage.setItem(USER_ACCESS_TOKEN, data.login.token);
        return this.props.navigation.navigate('App');
      }
    } catch (err) {
      this.setState({
        isLoading: false,
        error:
          err.graphQLErrors.length > 0
            ? err.graphQLErrors[0].message
            : 'Something went wrong.'
      });
    }
  };

  render() {
    return (
      <Scroll
        scrollEnabled={false}
        center
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center'
        }}
      >
        <Wrapper center>
          <LoginWrapper center behavior='position' enabled>
            <Image
              source={require('../../assets/images/brain.png')}
              style={{
                height: 100,
                width: 100,
                resizeMode: 'contain',
                alignSelf: 'center'
              }}
            />
            <Heading xxxlarge center>
              UZUAL
            </Heading>
            <Body huge faded center>
              Feed your brain with habits for a better mood
            </Body>
            <Body left placeholder tiny>
              Email
            </Body>
            <Input
              defaultValue={this.state.email}
              autoCapitalize={'none'}
              onChangeText={e => this._change('email', e.toLowerCase())}
            />
            <Body left placeholder tiny>
              Password
            </Body>
            <Input
              defaultValue={this.state.password}
              secureTextEntry
              onChangeText={e => this._change('password', e)}
            />
            {this.state.error && <Body error>{this.state.error}</Body>}
            <Button onPress={this._login} primary huge>
              <Body white center noMargin>
                LOGIN
              </Body>
            </Button>
            <Spacer>
              <Body shadow center noMargin>
                OR
              </Body>
            </Spacer>
            <Button onPress={this._goToRegister} noBg noMargin huge>
              <Body center noMargin>
                REGISTER
              </Body>
            </Button>
          </LoginWrapper>
          {this.state.isLoading && <FullLoading />}
        </Wrapper>
      </Scroll>
    );
  }
}
