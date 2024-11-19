import { ApolloClient, InMemoryCache, createHttpLink as createDefaultHttpLink } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'  // Импортируем onError для обработки ошибок
import { useAccessStore } from '@/store/access'

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

// глобальная обработка ошибок
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      // Выводим GraphQL ошибки
      console.error(`GraphQL ошибка: ${message}, на пути: ${path}`);
    });
  }
  if (networkError) {
    // Выводим ошибки сети
    console.error(`Ошибка сети: ${networkError}`);
  }
})

// Добавление токена в заголовки запроса
const authLink = setContext((_, { headers }) => {
  const accessStore = useAccessStore()
  const token = accessStore.getToken
  if (!token) {
    return headers
  }
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: errorLink.concat(authLink).concat(defaultHttpLink),  // Объединяем errorLink, authLink и основной HTTP-линк
  cache,
})

const erpCalculationApolloClient = new ApolloClient({
  link: errorLink.concat(authLink).concat(erpCalculatioinHttpLink),  // Для второго клиента тоже добавляем обработку ошибок
  cache,
})


// export default apolloClient

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
  clients: {
    webCalcClient: erpCalculationApolloClient,
  },
})

export default apolloProvider
