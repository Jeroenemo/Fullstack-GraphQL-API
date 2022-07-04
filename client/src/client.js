import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'

/**
 * Create a new apollo client and export as default
 */
//network interface to access gql server
const link = new HttpLink({uri:'http://localhost:4000/'})
//In memory cache interface from apollo
const cache = new InMemoryCache() 

const client = new ApolloClient({
  link,
  cache
})

export default client