import gql from 'graphql-tag';

const habits = gql`
  query habits($start: DateTime, $end: DateTime) {
    habits {
      id
      title
      description
      starred
      habits(orderBy: date_ASC, where: { date_gte: $start, date_lte: $end }) {
        id
        date
        done
      }
    }
  }
`;

export default { habits };
