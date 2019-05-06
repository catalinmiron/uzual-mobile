import React from 'react';
import {
  AsyncStorage,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { WebBrowser } from 'expo';
import { graphql, compose, withApollo } from 'react-apollo';

import { MonoText } from '../components/StyledText';
import gql from 'graphql-tag';
import Colors from '../constants/Colors';
import FullLoading from '../components/loading/FullLoading';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  _renderX = () => {
    const { habits } = this.props.info;
    return (
      <View style={styles.welcomeContainer}>
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <MonoText style={[styles.xxx, { alignSelf: 'center' }]}>
            HABITS
          </MonoText>
          {habits.map(habit => {
            return (
              <View key={habit.id}>
                <MonoText>
                  {habit.title} {habit.starred && '🌟'}
                </MonoText>
                <MonoText
                  style={[
                    styles.developmentModeText,
                    { alignSelf: 'flex-start' }
                  ]}
                >
                  {habit.description}
                </MonoText>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginBottom: 20
                  }}
                >
                  {habit.habits.map(day => {
                    return (
                      <View
                        key={day.id}
                        style={{
                          height: 20,
                          width: 20,
                          marginRight: 1,
                          marginBottom: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: day.done
                            ? Colors.primary
                            : Colors.grey
                        }}
                      >
                        <MonoText
                          style={{
                            fontSize: 10,
                            color: day.done ? Colors.white : Colors.darkGrey
                          }}
                        >
                          {new Date(day.date).getDate()}
                        </MonoText>
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  componentWillMount() {
    // this._logout();
  }

  _logout = () => {
    new Promise.all([
      AsyncStorage.clear(),
      this.props.client.cache.reset()
    ]).then(() => {
      this.props.navigation.navigate('Auth');
    });
  };

  render() {
    if (this.props.info.loading && !this.props.info.habits) {
      return <FullLoading />;
    }
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>{this._renderX()}</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  developmentModeText: {
    marginBottom: 20,
    color: Colors.midGrey,
    fontSize: 12,
    lineHeight: 19,
    textAlign: 'center'
  },
  xxx: {
    color: Colors.midGrey,
    fontSize: 18,
    lineHeight: 19,
    textAlign: 'center'
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10
  }
});

const query = gql`
  query myInformations {
    habits {
      id
      title
      description
      starred
      habits(orderBy: date_ASC) {
        id
        date
        done
      }
    }
  }
`;

export default compose(
  graphql(query, {
    name: 'info',
    options: {
      pollInterval: 5000,
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true
    }
  }),
  withApollo
)(HomeScreen);
