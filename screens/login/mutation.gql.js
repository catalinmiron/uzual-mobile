import gql from "graphql-tag";

const login = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token,
      user {
        id
        name
        email
        isPro
        moods(first: 15, orderBy: date_DESC) {
          id
          type
          date
        }
        habits(first: 15) {
          id
          title
          description
          starred
          habits(first: 5, orderBy: date_DESC) {
            id
            date
            done
          }
        }
      }
    }
  }
`;

export default { login };