import { graphql, compose, withApollo } from 'react-apollo';
import CreateHabit from './CreateHabit';
import mutations from './mutations.gql';
import { withTheme } from 'styled-components';

export default compose(
  graphql(mutations.createHabit, {
    name: 'createHabit'
  }),
  graphql(mutations.deleteHabit, {
    name: 'deleteHabit'
  }),
  withApollo,
  withTheme
)(CreateHabit);
