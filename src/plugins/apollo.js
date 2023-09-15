import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://service.harwind.com.ua/eam-web-graphql/api/graphql',
  headers: {
    "Schema": "_EAMSERVICE"
  }
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})
// export default apolloClient

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

export default apolloProvider