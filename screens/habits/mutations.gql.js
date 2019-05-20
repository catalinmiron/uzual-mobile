import gql from 'graphql-tag';

const setDailyHabit = gql`
  mutation setDailyHabit($habitId: ID!, $date: String) {
    setDailyHabit(habitId: $habitId, date: $date) {
      id
      done
      date
    }
  }
`;

export default { setDailyHabit };
