import gql from 'graphql-tag';

const createHabit = gql`
  mutation createHabit(
    $id: ID
    $title: String!
    $description: String!
    $starred: Boolean
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
      habits(orderBy: date_ASC) {
        id
        date
        done
      }
    }
  }
`;

export default { createHabit };
