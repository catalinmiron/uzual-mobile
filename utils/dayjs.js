import dayjs from 'dayjs';
const dayInstance = dayjs();

const start = dayInstance.startOf('month');
const end = dayInstance.endOf('month');
const current = dayInstance;
const len = end.diff(start, 'days');
const month = dayInstance.month();
const daysInMonth = dayInstance.daysInMonth();
const year = dayInstance.year();

// Memoize
// Expose a method that will accept an argument (Month)
// and it will return the list of days as Array[]
// This is going to be useful when we'll have a month
// picker on Habit screen but also for the Mood screen
// because there you can also filter the current month.
const days = [...Array(daysInMonth - 1).keys()].map(u => {
  const date = start.add(u, 'day').format('YYYY-MM-DD');

  return {
    date,
    disabled: dayjs(date).isAfter(current)
  };
});

export { start, end, current, days };
