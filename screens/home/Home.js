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
  Scroll,
  FabButton
} from '../../components/styled';
import DayHabits from '../../components/DayHabits';

export default class Home extends React.Component {
  static navigationOptions = {
    header: null
  };

  _onFabPress = () => {
    this.props.navigation.navigate('CreateHabit');
  };

  _renderHabits = () => {
    const { habits } = this.props.data;

    return (
      <Wrapper>
        <Heading left large>
          HABITS
        </Heading>
        {habits.length > 0
          ? this._renderHabitsList()
          : this._renderEmptyState()}
      </Wrapper>
    );
  };

  _renderEmptyState = () => {
    return (
      <Block>
        <Body placeholder noMargin>
          You have no habits :-(. Most of us have habits right? So please add
          one :)
        </Body>
      </Block>
    );
  };

  _renderHabitsList = () => {
    const { habits } = this.props.data;

    return (
      <React.Fragment>
        {habits.map(habit => {
          return (
            <Block key={habit.id} huge>
              <Body noMargin medium>
                {habit.title} {habit.starred && '🌟'}
              </Body>
              <Body placeholder tiny>
                {habit.description}
              </Body>
              <DayHabits habits={habit.habits} habitId={habit.it} />
            </Block>
          );
        })}
      </React.Fragment>
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

    return (
      <React.Fragment>
        <Scroll>{this._renderHabits()}</Scroll>
        <FabButton onPress={this._onFabPress} big>
          <Body white noMargin xlarge center>
            +
          </Body>
        </FabButton>
      </React.Fragment>
    );
  }
}
