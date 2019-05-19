import React from 'react';
import { Body, HabitSquare } from './styled';

export default ({ day }) => {
  return (
    <HabitSquare done={day.done} disabled={day.disabled}>
      <Body stiny white={day.done} center noMargin>
        {new Date(day.date).getDate()}
      </Body>
    </HabitSquare>
  );
};
