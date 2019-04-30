import React from 'react';
import { ApolloProvider } from 'react-apollo'
import { SafeAreaView, Platform, StatusBar, StyleSheet } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import setupApolloClient from './config/setup'

export default class App extends React.Component {
  apolloClient = null;
  state = {
    isLoadingComplete: false,
    hasHydrated: false,
  };

  componentDidMount() {
    Platform.OS === 'ios' && StatusBar.setBarStyle("default")
  }

  render() {
    const {isLoadingComplete, hasHydrated} = this.state;

    if (!isLoadingComplete && !hasHydrated) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <ApolloProvider client={this.apolloClient}>
          <SafeAreaView style={{flex: 1}} forceInset={'always'}>
            <AppNavigator />
          </SafeAreaView>
        </ApolloProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    this.apolloClient = await setupApolloClient();

    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true, hasHydrated: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});