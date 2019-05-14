import { graphql, compose, withApollo } from 'react-apollo';
import CreateHabit from './CreateHabit';
import mutations from './mutations.gql';
import queries from '../home/queries.gql';
import { withTheme } from 'styled-components';

export default compose(
  graphql(mutations.createHabit, {
    name: 'createHabit',
    options: {
      update: (proxy, { data: { createHabit } }) => {
        try {
          const data = proxy.readQuery({ query: queries.habits });
          data.habits.push(createHabit);
          proxy.writeQuery({ query: queries.habits, data });
        } catch (err) {
          console.error(err);
        }
      }
    }
  }),
  withApollo,
  withTheme
)(CreateHabit);
