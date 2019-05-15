import gql from 'graphql-tag';

const habits = gql`
  query habits {
    habits {
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

export default { habits };
