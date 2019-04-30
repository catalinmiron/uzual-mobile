import React from 'react';
import {
  AsyncStorage,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
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
      <View style={{flex: 1, paddingHorizontal: 20}}>
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
    </View>
  }

  // componentWillMount() {
  //   this._logout()
  // }

  // _logout= () => {
  //   new Promise.all([
  //     AsyncStorage.clear(),
  //     this.props.client.cache.reset()
  //   ])
  //   .then(() => {
  //     this.props.navigation.navigate("Auth");
  //   })
  // }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
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
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
  }
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