import React from 'react';
import { Platform, AsyncStorage } from 'react-native';
import { Icon } from 'expo';
import FullLoading from '../../components/FullLoading';
import {
  Body,
  Heading,
  Wrapper,
  Block,
  Flat,
  FabButton
} from '../../components/styled';
import Habit from '../../components/Habit';
import queries from './queries.gql';
import { start, end, current } from '../../utils/dayjs';
import { POLL_INTERVAL } from '../../constants/vars';
import { v4 as uuid } from 'uuid';

export default class Home extends React.Component {
  static navigationOptions = {
    header: null
  };

  _onFabPress = () => {
    this.props.navigation.navigate('CreateHabit');
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

  _onSetDailyHabit = async habit => {
    const date = current.format('YYYY-MM-DD');
    const dayHabit = habit.habits.find(h => h.date.startsWith(date));
    await this.props.data.stopPolling();
    const { id: habitId } = habit;
    this.props.setDailyHabit({
      variables: {
        habitId,
        date
      },
      optimisticResponse: {
        __typename: 'Mutation',
        setDailyHabit: {
          __typename: 'DayHabit',
          id: uuid(),
          date,
          done: dayHabit ? !dayHabit.done : true
        }
      },
      update: (proxy, { data: { setDailyHabit } }) => {
        try {
          const data = proxy.readQuery({
            query: queries.habits,
            variables: { start, end }
          });
          const currentHabit = data.habits.find(habit => habit.id === habitId);

          if (dayHabit) {
            currentHabit.habits.splice(-1, 1, setDailyHabit);
          } else {
            currentHabit.habits.push(setDailyHabit);
          }
          proxy.writeQuery({
            query: queries.habits,
            variables: { start, end },
            data
          });
          this.props.data.startPolling(POLL_INTERVAL);
        } catch (err) {
          console.error(err);
        }
      }
    });
  };

  _onHabitPress = habit => {
    this.props.navigation.navigate('CreateHabit', { habit });
  };

  render() {
    const { loading, habits } = this.props.data;
    if (loading && !habits) {
      return <FullLoading />;
    }

    return (
      <React.Fragment>
        <Flat
          data={habits}
          renderItem={({ item }) => (
            <Habit
              habit={item}
              onSetDailyHabit={this._onSetDailyHabit}
              onPress={this._onHabitPress}
            />
          )}
          keyExtractor={item => item.id}
        />
        <FabButton onPress={this._onFabPress} big>
          <Icon.Ionicons
            name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
            size={this.props.theme.size.xlarge}
            style={{ marginBottom: -3 }}
            color={this.props.theme.colors.white}
          />
        </FabButton>
      </React.Fragment>
    );
  }
}
