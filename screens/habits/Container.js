import { graphql, compose, withApollo } from 'react-apollo';
import Habits from './Habits';
import queries from './queries.gql';
import mutations from './mutations.gql';
import { withTheme } from 'styled-components';
import { start, end } from '../../utils/dayjs';
import { POLL_INTERVAL } from '../../constants/vars';

export default compose(
  graphql(queries.habits, {
    options: {
      pollInterval: POLL_INTERVAL,
      fetchPolicy: 'cache-and-network',
      variables: {
        start,
        end
      }
    }
  }),
  graphql(mutations.setDailyHabit, {
    name: 'setDailyHabit'
  }),
  graphql(mutations.setPushToken, {
    name: 'setPushToken'
  }),
  withApollo,
  withTheme
)(Habits);
