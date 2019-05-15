import { graphql, compose, withApollo } from 'react-apollo';
import Habits from './Habits';
import queries from './queries.gql';
import { withTheme } from 'styled-components';

export default compose(
  graphql(queries.habits, {
    options: {
      pollInterval: 10000,
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true
    }
  }),
  withApollo,
  withTheme
)(Habits);
