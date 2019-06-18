import gql from 'graphql-tag';

const createHabit = gql`
  mutation createHabit(
    $id: ID
    $title: String!
    $description: String!
    $starred: Boolean
    $start: DateTime
    $end: DateTime
  ) {
    createHabit(
      id: $id
      title: $title
      description: $description
      starred: $starred
    ) {
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

const deleteHabit = gql`
  mutation deleteHabit($id: ID!) {
    deleteHabit(id: $id) {
      id
    }
  }
`;

export default { createHabit, deleteHabit };
