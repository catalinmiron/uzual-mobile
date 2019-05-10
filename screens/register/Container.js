import { graphql, compose, withApollo } from 'react-apollo';
import Register from './Register';
import mutations from './mutation.gql';

export default compose(
  graphql(mutations.register, {
    name: 'register'
  }),
  withApollo
)(Register);
