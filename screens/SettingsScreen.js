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
import FullLoading from '../components/loading/FullLoading';

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
    if (this.props.info.loading && !this.props.info.me) {
      return <FullLoading />
    }
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          {this._renderX()}
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
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
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
      pollInterval: 20000,
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true
    }
  }),
  withApollo
)(SettingsScreen);