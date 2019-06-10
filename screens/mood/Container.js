import { graphql, compose, withApollo } from 'react-apollo';
import Mood from './Mood';
import queries from './queries.gql';
import mutations from './mutations.gql';
import { withTheme } from 'styled-components';
import { start, end, TIME_FORMAT } from '../../utils/dayjs';
import { POLL_INTERVAL } from '../../constants/vars';

export default compose(
  graphql(queries.moods, {
    options: {
      pollInterval: POLL_INTERVAL,
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      variables: {
        start,
        end
      }
    }
  }),
  graphql(mutations.setMood, {
    name: 'setMood'
  }),
  withApollo,
  withTheme
)(Mood);
