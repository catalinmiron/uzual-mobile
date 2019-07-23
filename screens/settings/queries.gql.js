import gql from 'graphql-tag';

const me = gql`
  query me {
    me {
      id
      name
      email
      isPro
      pushToken
    }
  }
`;

export default { me };
