import { graphql, compose, withApollo } from 'react-apollo';
import Login from './Login';
import mutations from './mutation.gql';
import { withTheme } from 'styled-components';

export default compose(
  graphql(mutations.login, {
    name: 'login'
  }),
  withApollo,
  withTheme
)(Login);
