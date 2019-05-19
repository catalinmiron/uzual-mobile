import React from 'react';
import { Body, Block } from './styled';
import DayHabits from './DayHabits';

export default ({ habit }) => (
  <Block huge>
    <Body noMargin medium>
      {habit.title} {habit.starred && '🌟'}
    </Body>
    <Body placeholder tiny>
      {habit.description}
    </Body>
    <DayHabits habits={habit.habits} habitId={habit.it} />
  </Block>
);
