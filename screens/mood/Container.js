import { graphql, compose, withApollo } from 'react-apollo';
import Mood from './Mood';
import queries from './queries.gql';
import { withTheme } from 'styled-components';

export default compose(
  graphql(queries.moods, {
    options: {
      pollInterval: 10000,
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true
    }
  }),
  withApollo,
  withTheme
)(Mood);
