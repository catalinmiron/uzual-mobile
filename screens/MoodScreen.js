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
import FullLoading from '../components/loading/FullLoading';

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
          return <MonoText key={mood.id}>{new Date(mood.date).toLocaleDateString()} - {mood.type}</MonoText>
        })}
      </View>
    </View>
  }

  render() {
    if (this.props.info.loading && !this.props.info.moods) {
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
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
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
      pollInterval: 10000,
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true
    }
  }),
  withApollo
)(MoodScreen);