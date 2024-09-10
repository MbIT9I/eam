// Utilities
import { defineStore } from 'pinia'
import apolloProvider from '@/plugins/apollo'
import gql from 'graphql-tag'

export const useAppStore = defineStore('app', {
  state: () => ({
    //
  }),

  actions: {
    publishLog(id, type, additionalInfo) {
      apolloProvider.defaultClient.mutate({
        mutation: gql`mutation Log($id: String, $type: Int, $additionalInfo: String) {
          _eamservicemut {
            log(id: $id, type: $type, additionalInfo: $additionalInfo)
          }
        }`,
        variables: {
          id,
          type,
          additionalInfo
        }
      })
    }
  }
})
