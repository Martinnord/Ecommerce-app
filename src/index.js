import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';

import Routes from './routes';

const link = createUploadLink({ uri: 'http://localhost:4000' });

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);
