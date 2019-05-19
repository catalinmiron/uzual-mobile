import { AsyncStorage } from 'react-native';
import { ApolloClient, HttpLink, split, concat } from 'apollo-client-preset';
import { WebSocketLink } from 'apollo-link-ws';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { getMainDefinition } from 'apollo-utilities';
import { RetryLink } from 'apollo-link-retry';
import { USER_ACCESS_TOKEN } from '../constants/auth';

const officeURI = '192.168.0.115:4000';
// const officeURI = '10.105.99.218:4000';
// const officeURI = '10.5.5.161:4000';
// const officeURI = '127.0.0.1:4000';
const isDev = __DEV__;
const URI = isDev ? officeURI : 'api.uzual.app';

let prodUri = {
  socket: `wss://api.uzual.app`,
  link: `https://api.uzual.app`
};

let uri = !isDev
  ? {
      socket: `wss://api.uzual.app`,
      link: `https://api.uzual.app`
    }
  : {
      socket: `ws://${URI}`,
      link: `http://${URI}`
    };

const tok =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjanYzbDN2angwMXZ0MDczN2xtaG1xMG5oIiwiaWF0IjoxNTU2NjE5ODU5fQ.jMXCbuT3-WcheHpH0aXr8pUtAyd_yrZUOwvMXbEq8_M';

export default async function setupApolloClient() {
  // await AsyncStorage.setItem(USER_ACCESS_TOKEN, tok);
  const wsLink = new WebSocketLink({
    uri: !isDev ? prodUri.socket : uri.socket,
    options: {
      reconnect: true,
      connectionParams: () => {
        return new Promise(async resolve => {
          const token = await AsyncStorage.getItem(USER_ACCESS_TOKEN);
          resolve({
            Authorization: token ? `Bearer ${token}` : null
          });
        });
      }
    }
  });

  const httpLink = new HttpLink({
    uri: !isDev ? prodUri.link : uri.link
  });

  const authMiddleware = setContext(
    (_, { headers }) =>
      new Promise(async resolve => {
        // get the authentication token from local storage if it exists
        const token = await AsyncStorage.getItem(USER_ACCESS_TOKEN);
        resolve({
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : null
          }
        });
      })
  );

  const retryLink = new RetryLink({
    delay: {
      initial: 500,
      max: Infinity
    },
    attempts: {
      max: Infinity,
      retryIf: (error, _operation) => {
        if (error.message === 'Network request failed') {
          // if (_operation.operationName === 'createPost') {
          return true;
          // }
        }
        return false;
      }
    }
  });

  const httpLinkWithAuth = authMiddleware.concat(httpLink);
  const wsLinkWithAuth = authMiddleware.concat(wsLink);

  const link = concat(
    retryLink,
    split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLinkWithAuth,
      httpLinkWithAuth
    )
  );

  const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all'
    },
    query: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all'
    }
    // mutate: {
    //   errorPolicy: 'all'
    // }
  };

  // const cache = new InMemoryCache({ dataIdFromObject: o => o.id });
  const cache = new InMemoryCache();
  const client = new ApolloClient({
    link,
    cache,
    connectToDevTools: isDev,
    defaultOptions
  });

  await persistCache({
    cache,
    storage: AsyncStorage,
    debug: isDev
  });

  return client;
}
