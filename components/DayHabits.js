import React from 'react';
import FullLoading from './FullLoading';
import { Body, Heading, HabitSquare, Row, Block } from './styled';
import { start, current, end, days } from '../utils/dayjs';
import dayjs from 'dayjs';

export default class DayHabits extends React.Component {
  _getHabitList = () => {
    const { habitId, habits } = this.props;

    return days.map(({ date, disabled }) => {
      const index = habits.findIndex(habit => habit.date.startsWith(date));
      return index !== -1
        ? {
            ...habits[index],
            disabled
          }
        : {
            id: `${date}-${habitId}`,
            done: false,
            date,
            disabled
          };
    });
  };

  render() {
    const dayHabits = this._getHabitList();
    return (
      <Row wrap>
        {dayHabits.map(day => {
          return (
            <HabitSquare key={day.id} done={day.done} disabled={day.disabled}>
              <Body stiny white={day.done} center noMargin>
                {new Date(day.date).getDate()}
              </Body>
            </HabitSquare>
          );
        })}
      </Row>
    );
  }
}
