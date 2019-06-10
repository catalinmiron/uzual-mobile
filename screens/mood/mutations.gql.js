import gql from 'graphql-tag';

const setMood = gql`
  mutation setMood($date: String, $type: MoodTypes!) {
    setMood(date: $date, type: $type) {
      id
      type
      date
    }
  }
`;

export default { setMood };
