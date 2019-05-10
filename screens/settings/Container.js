import { graphql, compose, withApollo } from 'react-apollo';
import Settings from './Settings';
import queries from './queries.gql';
import { withTheme } from 'styled-components';

export default compose(
  graphql(queries.me, {
    options: {
      pollInterval: 20000,
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true
    }
  }),
  withApollo,
  withTheme
)(Settings);
