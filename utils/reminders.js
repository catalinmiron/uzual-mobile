import dayjs from 'dayjs';
import { Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import { MOOD_REMINDER } from '../constants/vars';

/*
  mood reminders (8PM daily)
  habits reminders
  daily goals
  random mantras (positive quotes)
*/

// https://docs.expo.io/versions/latest/sdk/notifications/#notificationsschedulelocalnotificationasynclocalnotification-schedulingoptions

// An object that describes when the notification should fire.
// time (date or number) -- A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
// repeat (optional) (string) -- 'minute', 'hour', 'day', 'week', 'month', or 'year'.
// (Android only) intervalMs (optional) (number) -- Repeat interval in number of milliseconds
const scheduleMoodReminders = async () => {
  // const hasNotificationId = AsyncStorage.getItem(MOOD_REMINDER);
  await Notifications.cancelAllScheduledNotificationsAsync();

  // if (hasNotificationId) {
  //   console.log('Already have a notification.');
  //   return;
  // }

  const time = dayjs()
    .add(dayjs().hour() > 20 ? 1 : 0, 'day')
    .set('hour', 20)
    .set('minutes', 0);

  console.log('Scheduled notification for: ', time);

  const notificationId = await Notifications.scheduleLocalNotificationAsync(
    {
      title: 'Mood reminder',
      body: `It's time to set your current mood. Always stay positive!` //Come with a better text
    },
    {
      time: time.valueOf(),
      repeat: 'day'
    }
  );
  // Check how to schedule local notifications in newer Expo SDKs.
  console.log('Mood Reminders NotificationID: ', notificationId);
  await AsyncStorage.setItem(MOOD_REMINDER, notificationId);
};

export { scheduleMoodReminders };
