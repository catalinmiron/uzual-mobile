import { graphql, compose, withApollo } from 'react-apollo';
import Mood from './Mood';
import queries from './queries.gql';
import { withTheme } from 'styled-components';
import { start, end, TIME_FORMAT } from '../../utils/dayjs';

export default compose(
  graphql(queries.moods, {
    options: {
      pollInterval: 10000,
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      variables: {
        start: start.format(TIME_FORMAT),
        end: end.format(TIME_FORMAT)
      }
    }
  }),
  withApollo,
  withTheme
)(Mood);
