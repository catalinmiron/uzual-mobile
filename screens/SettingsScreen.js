import React from 'react';
import { AsyncStorage, ScrollView, StyleSheet, View } from 'react-native';
import { graphql, compose, withApollo } from 'react-apollo';

import gql from 'graphql-tag';
import FullLoading from '../components/loading/FullLoading';
import {
  Body,
  Heading,
  Wrapper,
  RowAligned,
  Button,
  Badge
} from '../components/styled';

const ProBadge = ({ isPro }) => (
  <Badge primary={isPro} shadow={!isPro}>
    <Body stiny white={isPro} noMargin>
      {isPro ? 'PRO' : 'NORMAL'}
    </Body>
  </Badge>
);
class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  _renderX = () => {
    const { me } = this.props.info;
    const { name, email, isPro } = me;
    return (
      <Wrapper center>
        <RowAligned center>
          <Heading large noMargin marginRight>
            {name}
          </Heading>
          <ProBadge isPro={isPro} />
        </RowAligned>
        <Body center>{email}</Body>
        <Button onPress={this._logout} shadow>
          <Body center noMargin>
            Logout
          </Body>
        </Button>
      </Wrapper>
    );
  };

  _logout = () => {
    new Promise.all([
      AsyncStorage.clear(),
      this.props.client.cache.reset()
    ]).then(() => {
      this.props.navigation.navigate('Auth');
    });
  };

  render() {
    if (this.props.info.loading && !this.props.info.me) {
      return <FullLoading />;
    }
    return <ScrollView>{this._renderX()}</ScrollView>;
  }
}

const query = gql`
  query myInformations {
    me {
      id
      name
      email
      isPro
    }
  }
`;

export default compose(
  graphql(query, {
    name: 'info',
    options: {
      pollInterval: 20000,
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true
    }
  }),
  withApollo
)(SettingsScreen);
