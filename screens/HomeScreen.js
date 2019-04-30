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
import { WebBrowser } from 'expo';
import { graphql, compose, withApollo } from "react-apollo";

import { MonoText } from '../components/StyledText';
import gql from 'graphql-tag';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  _renderX = () => {
    const {habits} = this.props.info;
    return <View style={ styles.welcomeContainer}>
      <View style={{flex: 1, padding: 20, alignItems: 'flex-start'}}>
        <MonoText style={[styles.xxx, {alignSelf: 'center'}]}>
          HABITS
        </MonoText>
        {habits.map((habit) => {
          return <View key={habit.id}>
            <MonoText>{habit.title} {habit.starred && "🌟"}</MonoText>
            <MonoText style={[styles.developmentModeText, {alignSelf: 'flex-start'}]}>{habit.description}</MonoText>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20}}>
              {habit.habits.map(day => {
                return <View key={day.id} style={{
                  height: 20,
                  width: 20,
                  marginRight: 1,
                  marginBottom: 1,
                  backgroundColor: day.done ? "turquoise": "#d3d3d3"
                }}/>
              })}
            </View>
          </View>
        })}
      </View>
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
          {this.props.info.loading && !this.props.info.habits ?
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
    habits {
      id
      title
      description
      starred
      habits(orderBy: date_DESC) {
        id
        date
        done
      }
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
)(HomeScreen);