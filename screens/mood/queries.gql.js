import gql from 'graphql-tag';

const moods = gql`
  query moods($start: DateTime!, $end: DateTime!) {
    moods(where: { date_gte: $start, date_lte: $end }, orderBy: date_ASC) {
      id
      type
      date
    }
  }
`;

export default { moods };
