import { graphql, compose, withApollo } from 'react-apollo';
import Home from './Home';
import queries from './queries.gql';
import { withTheme } from 'styled-components';

export default compose(
  graphql(queries.habits, {
    options: {
      pollInterval: 5000,
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true
    }
  }),
  withApollo,
  withTheme
)(Home);
