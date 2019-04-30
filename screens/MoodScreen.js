import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { graphql, compose, withApollo } from "react-apollo";

import { MonoText } from '../components/StyledText';
import gql from 'graphql-tag';

class MoodScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  _renderX = () => {
    const { moods} = this.props.info;
    return <View style={ styles.welcomeContainer}>
      <View>
        <MonoText style={styles.xxx}>
          MOODS
        </MonoText>
        <MonoText style={styles.developmentModeText}>
          01/03/2019 - 30/03/2019
        </MonoText>
        {moods.map((mood) => {
          return <MonoText key={mood.id}>{new Date(mood.date).toLocaleDateString()} - e{mood.type}</MonoText>
        })}
      </View>
    </View>
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {this.props.info.loading && !this.props.info.moods ?
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
    moods(where:{
      date_gte:"2019-03-01",
      date_lte:"2019-03-30"
    }, orderBy: date_ASC) {
      id
      type
      date
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
)(MoodScreen);