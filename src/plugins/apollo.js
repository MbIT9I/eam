import { ApolloClient, InMemoryCache, createHttpLink as createDefaultHttpLink } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

// HTTP connection to the API
const defaultHttpLink = createDefaultHttpLink({
  // You should use an absolute URL here
  uri: 'https://service.harwind.com.ua/eam-web-graphql/api/graphql',
  headers: {
    "Schema": "_EAMSERVICE"
  }
})

const token = sessionStorage.getItem('accessToken');
const headers = token ? {
  Authorization: `Bearer ${token}`,
} : {};

const erpCalculatioinHttpLink = createDefaultHttpLink({
  // You should use an absolute URL here
  uri: 'https://service.harwind.com.ua/eam-web-graphql/api/graphql',
  headers: {
    ...headers,
    "Schema": "WEBCALC"
  }
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: defaultHttpLink,
  cache,
  headers
})

const erpCalculationApolloClient = new ApolloClient({
  link: erpCalculatioinHttpLink,
  cache,
  headers
})


// export default apolloClient

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
  clients: {
    webCalcClient: erpCalculationApolloClient,
  },
  headers
})

export default apolloProvider
