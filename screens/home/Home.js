import React from 'react';
import { AsyncStorage, ScrollView } from 'react-native';
import FullLoading from '../../components/FullLoading';
import {
  Body,
  Heading,
  HabitSquare,
  Wrapper,
  Row,
  Block,
  Scroll
} from '../../components/styled';

export default class Home extends React.Component {
  static navigationOptions = {
    header: null
  };

  _renderX = () => {
    const { habits } = this.props.data;
    return (
      <Wrapper>
        <Heading left large>
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
    if (this.props.data.loading && !this.props.data.habits) {
      return <FullLoading />;
    }
    return <Scroll>{this._renderX()}</Scroll>;
  }
}
