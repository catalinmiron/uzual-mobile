import React from 'react';
import {
  AsyncStorage,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { graphql, compose, withApollo } from "react-apollo";

import { MonoText } from '../components/StyledText';
import gql from 'graphql-tag';
import Colors from '../constants/Colors';

const Badge = ({isPro}) => (
  <View style={{
    backgroundColor: isPro ? Colors.primary : Colors.grey,
    borderRadius: 5,
    paddingHorizontal: 4,
  }}>
    <MonoText style={[styles.xxx, {fontSize: 10, color: isPro ? Colors.white : Colors.darkGrey}]}>
      {isPro ? "PRO" : "NORMAL"}
    </MonoText>
  </View>
)
class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  _renderX = () => {
    const {me} = this.props.info;
    const {name, email, isPro} = me;
    return <View style={ styles.welcomeContainer}>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: "center"}}>
        <MonoText style={{fontFamily: "Menlo", fontSize: 24, marginRight: 10}}>{name}</MonoText>
        <Badge isPro={isPro} />
      </View>
      <MonoText style={styles.developmentModeText}>{email}</MonoText>
      <TouchableOpacity onPress={this._logout} style={styles.helpLink}>
        <MonoText style={styles.helpLinkText}>Logout</MonoText>
      </TouchableOpacity>
    </View>
  }

  // componentWillMount() {
  //   this._logout()
  // }

  _logout= () => {
    new Promise.all([
      AsyncStorage.clear(),
      this.props.client.cache.reset()
    ])
    .then(() => {
      this.props.navigation.navigate("Auth");
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {this.props.info.loading && !this.props.info.me ?
            <Text style={styles.developmentModeText}>Loading</Text> :
            this._renderX()
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  xxx: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: 18,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});



const query = gql`
  query myInformations{
    me {
      id
      name
      email
      isPro
    }
  }
`;

export default  compose(
  graphql(query, {
    name: 'info',
    options:{
      pollInterval: 1000,
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true
    }
  }),
  withApollo
)(SettingsScreen);