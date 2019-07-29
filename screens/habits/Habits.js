import React from 'react';
import { Platform, AsyncStorage } from 'react-native';
import * as Icon from '@expo/vector-icons';
import FullLoading from '../../components/FullLoading';
import { Body, Block, Flat, Scroll, FabButton } from '../../components/styled';
import Habit from '../../components/Habit';
import queries from './queries.gql';
import { start, end, current, TIME_FORMAT } from '../../utils/dayjs';
import { POLL_INTERVAL } from '../../constants/vars';
import { v4 as uuid } from 'uuid';
import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { scheduleMoodReminders } from '../../utils/reminders';
import gql from 'graphql-tag';

export default class Home extends React.PureComponent {
  static navigationOptions = {
    header: null
  };

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      this._onSetPushToken(token);
    } else {
      // alert('Must use physical device for Push Notifications');
    }

    await scheduleMoodReminders();
  };

  _onFabPress = () => {
    this.props.navigation.navigate('CreateHabit');
  };

  _renderEmptyState = () => {
    return (
      <Scroll
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: this.props.theme.spacing.huge
        }}
      >
        <Body placeholder noMargin center>
          You have no habits :-(
        </Body>
        <Body center placeholder>
          Hit the + button to add one!
        </Body>
      </Scroll>
    );
  };

  componentWillMount() {
    // this._logout();
  }

  componentDidMount() {
    this.registerForPushNotificationsAsync();
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
    const date = current.format(TIME_FORMAT);
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
          id: dayHabit ? dayHabit.id : uuid(),
          date: dayHabit ? dayHabit.date : date,
          done: dayHabit ? !dayHabit.done : true
        }
      },
      update: async (proxy, { data: { setDailyHabit } }) => {
        console.log('setDailyHabit: ', setDailyHabit);
        try {
          const data = await proxy.readQuery({
            query: queries.habits,
            variables: { start, end }
          });

          const clonedData = JSON.parse(JSON.stringify(data.habits));
          const currentHabit = clonedData.find(habit => habit.id === habitId);
          const currentHabitIndex = clonedData.findIndex(
            habit => habit.id === habitId
          );

          if (dayHabit) {
            currentHabit.habits.splice(-1, 1, setDailyHabit);
          } else {
            currentHabit.habits.push(setDailyHabit);
          }

          const newData = {
            ...data,
            habits: [
              ...clonedData.slice(0, currentHabitIndex),
              currentHabit,
              ...clonedData.slice(currentHabitIndex + 1, data.length)
            ]
          };

          await proxy.writeQuery({
            query: queries.habits,
            variables: { start, end },
            data: newData
          });
          this.forceUpdate();
          this.props.data.startPolling(POLL_INTERVAL);
        } catch (err) {
          console.error(err);
        }
      }
    });
  };

  _onSetPushToken = pushToken => {
    this.props.setPushToken({
      variables: {
        pushToken
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

    // if (!loading && !habits) {
    //   return this._renderEmptyState()
    // }

    return (
      <React.Fragment>
        {habits.length > 0 ? (
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
        ) : (
          this._renderEmptyState()
        )}
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
