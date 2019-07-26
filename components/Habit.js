import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Body, Block } from './styled';
import DayHabits from './DayHabits';

export default ({ habit, onSetDailyHabit, onPress }) => (
  <TouchableWithoutFeedback
    onPress={() => onSetDailyHabit(habit)}
    onLongPress={() => onPress(habit)}
  >
    <Block huge>
      <Body noMargin medium>
        {habit.title} {habit.starred && '🌟'}
      </Body>
      <Body placeholder tiny>
        {habit.description}
      </Body>
      <DayHabits habits={habit.habits} habitId={habit.id} />
    </Block>
  </TouchableWithoutFeedback>
);
