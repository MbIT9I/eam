import { ApolloClient, createHttpLink as createDefaultHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

// HTTP connection to the API
const defaultHttpLink = createDefaultHttpLink({
  // You should use an absolute URL here
  uri: 'https://service.harwind.com.ua/eam-web-graphql/api/graphql',
  headers: {
    "Schema": "_EAMSERVICE"
  }
})

const erpCalculatioinHttpLink = createDefaultHttpLink({
  // You should use an absolute URL here
  uri: 'https://service.harwind.com.ua/eam-web-graphql/api/graphql',
  headers: {
    "Schema": "WEBCALC"
  }
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: defaultHttpLink,
  cache,
})

const erpCalculationApolloClient = new ApolloClient({
  link: erpCalculatioinHttpLink,
  cache,
})


// export default apolloClient

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
  clients: {
    webCalcClient: erpCalculationApolloClient,

  }
})

export default apolloProvider