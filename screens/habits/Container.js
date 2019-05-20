import { graphql, compose, withApollo } from 'react-apollo';
import Habits from './Habits';
import queries from './queries.gql';
import mutations from './mutations.gql';
import { withTheme } from 'styled-components';
import { start, end } from '../../utils/dayjs';

export default compose(
  graphql(queries.habits, {
    options: {
      pollInterval: 10000,
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
  withApollo,
  withTheme
)(Habits);
