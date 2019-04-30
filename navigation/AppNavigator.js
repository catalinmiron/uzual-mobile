import React from "react";
import { StyleSheet, AsyncStorage } from "react-native";

import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";

import FullLoading from "../components/loading/FullLoading";

// Auth
import Login from "../screens/login/Container";
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { USER_ACCESS_TOKEN } from "../constants/auth";

const Colors = {
  white: "#FFF",
  liteGrey: "rgba(46, 64, 87, 0.1)"
};
const TAB_BAR_HEIGHT = 56;

const styles = StyleSheet.create({
  tabStyle: {
    backgroundColor: Colors.white,
    justifyContent: "center",
    flex: 0.2
  },
  tabBarStyle: {
    borderTopColor: Colors.liteGrey,
    height: TAB_BAR_HEIGHT,
    alignItems: "center",
    justifyContent: "center"
  }
});

// const TripWithMappedProps = withMappedNavigationProps(Trip);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    }
  },
  {
    headerMode: "none"
  }
);

const LinksStack = createStackNavigator(
  {
    Links: { screen: LinksScreen }
  },
  {
    headerMode: "none"
  }
);

const SettingsStack = createStackNavigator(
  {
    Settings: { screen: SettingsScreen }
  },
  {
    headerMode: "none"
  }
);

const fade = props => {
  const { position, scene } = props;

  const index = scene.index;

  const translateX = 0;
  const translateY = 0;

  const opacity = position.interpolate({
    inputRange: [index - 0.7, index, index + 0.7],
    outputRange: [0.3, 1, 0.3]
  });

  return {
    opacity,
    transform: [{ translateX }, { translateY }]
  };
};

const AppTabs = createBottomTabNavigator(
  {
    HomeTab: { screen: HomeStack },
    LinksTab: { screen: LinksStack },
    SettingsTab: { screen: SettingsStack },
  },
  {
    // initialRouteName: "MyTripsTab",
    initialRouteName: "HomeTab",
    order: ["HomeTab", "LinksTab", "SettingsTab"],
    tabBarOptions: {
      style: styles.tabBarStyle,
      tabStyle: styles.tabStyle,
      showLabel: false
    },
    navigationOptions: ({ navigation }) => ({
      tabBarPosition: "bottom",
      // tabBarIcon: ({ tintColor, focused }) => {
      //   switch (navigation.state.key) {
      //     case "FeedTab":
      //       return focused ? (
      //         <EmojiIcon xlarge icon="earth" />
      //       ) : (
      //         <EmojiIcon xlarge icon="earth" style={{ opacity: 0.8 }} />
      //       );
      //     case "MyTripsTab":
      //       return focused ? (
      //         <EmojiIcon xlarge icon="pin" />
      //       ) : (
      //         <EmojiIcon xlarge icon="pin" style={{ opacity: 0.8 }} />
      //       );
      //     case "ConversationsTab":
      //       return focused ? (
      //         <EmojiIcon xlarge icon="chat" />
      //       ) : (
      //         <EmojiIcon xlarge icon="chat" style={{ opacity: 0.8 }} />
      //       );
      //   }
      // }
    })
  }
);

const AppRoutes = createStackNavigator(
  {
    // CreateTrip: { screen: CreateTrip },
    // Trip: {
    //   screen: Trip,
    //   path: "trip/:tripId"
    // },
    AppTabs: { screen: AppTabs }
  },
  {
    initialRouteName: "AppTabs",
    headerMode: "none"
  }
);

const AuthStack = createStackNavigator(
  {
    Login: { screen: Login }
  },
  {
    headerMode: "none"
  }
);

class Switch extends React.PureComponent {
  constructor() {
    super();

    this._bootstrapAsync();
  }

  componentDidMount() {
    // LoginManager.logOut();
    // Alert.alert("XXX", JSON.stringify(this.props.client.clearStore, null, 2));
    // this.props.client.resetStore();
    // this.props.navigation.navigate("Auth");
    // this.props.client.clearStore();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const token = await AsyncStorage.getItem(USER_ACCESS_TOKEN);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(token ? "App" : "Auth");
  };

  // Render any loading content that you like here
  render() {
    return <FullLoading />;
  }
}

const RootSwitch = createAppContainer(createSwitchNavigator(
  {
    Switch: Switch,
    Auth: AuthStack,
    App: AppRoutes
  },
  {
    initialRouteName: "Switch"
  }
));

export default RootSwitch;

// import React from 'react';
// import { createAppContainer, createSwitchNavigator } from 'react-navigation';

// import MainTabNavigator from './MainTabNavigator';

// export default createAppContainer(createSwitchNavigator({
//   // You could add another route here for authentication.
//   // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//   Main: MainTabNavigator,
// }));