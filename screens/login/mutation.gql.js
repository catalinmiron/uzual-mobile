import gql from "graphql-tag";

const login = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token,
      # user {
      #   id
      #   name
      #   email
      #   isPro
      # }
    }
  }
`;

export default { login };