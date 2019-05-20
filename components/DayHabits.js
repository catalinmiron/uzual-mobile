import React from 'react';
import { Body, HabitSquare, Row } from './styled';
import { days } from '../utils/dayjs';
import DayHabitSquare from './DayHabitSquare';

export default class DayHabits extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dayHabits: this._getHabitList()
    };
  }

  componentWillReceiveProps() {
    this.setState({
      dayHabits: this._getHabitList()
    });
  }

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
    return (
      <Row wrap>
        {this.state.dayHabits.map(day => (
          <DayHabitSquare day={day} key={day.id} />
        ))}
      </Row>
    );
  }
}
