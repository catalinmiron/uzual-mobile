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

const setPushToken = gql`
  mutation setPushToken($pushToken: String!) {
    setPushToken(pushToken: $pushToken) {
      pushToken
    }
  }
`;

export default { setDailyHabit, setPushToken };
