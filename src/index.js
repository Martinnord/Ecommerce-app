import React from 'react'
import Routes from './routes'
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: new HttpLink({uri: 'http://localhost:4000' }),
  cache: new InMemoryCache()
});


export default () => {
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,


}
