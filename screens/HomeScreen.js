import React from 'react';
import { AsyncStorage, ScrollView, StyleSheet, View } from 'react-native';
import { graphql, compose, withApollo } from 'react-apollo';

import gql from 'graphql-tag';
import Colors from '../constants/Colors';
import FullLoading from '../components/loading/FullLoading';
import {
  Body,
  Heading,
  HabitSquare,
  Wrapper,
  Row,
  Block
} from '../components/styled';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  _renderX = () => {
    const { habits } = this.props.info;
    return (
      <Wrapper>
        <Heading center left large>
          HABITS
        </Heading>
        {habits.map(habit => {
          return (
            <Block key={habit.id} huge>
              <Body noMargin medium>
                {habit.title} {habit.starred && '🌟'}
              </Body>
              <Body placeholder tiny>
                {habit.description}
              </Body>
              <Row wrap>
                {habit.habits.map(day => {
                  return (
                    <HabitSquare key={day.id} done={day.done}>
                      <Body stiny white={day.done} center noMargin>
                        {new Date(day.date).getDate()}
                      </Body>
                    </HabitSquare>
                  );
                })}
              </Row>
            </Block>
          );
        })}
      </Wrapper>
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
    return <ScrollView>{this._renderX()}</ScrollView>;
  }
}

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
