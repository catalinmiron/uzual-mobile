import gql from 'graphql-tag';

const register = gql`
  mutation register($name: String, $email: String!, $password: String!) {
    register: signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

export default { register };
