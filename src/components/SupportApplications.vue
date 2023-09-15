<template>
    <v-card class="mt-5" v-if="!!serviceApplications?.length">
        <v-card-title class="pa-0 ma-0">
            <p class="text-h5 text--primary pa-2">
                {{ $t('all-service-requests') }}
            </p>
        </v-card-title>
        <v-card-actions class="pt-2">
            <v-data-table class="w-100"
                :headers="headers"
                :items="serviceApplications"
                key="id"
            >
                <template v-slot:item.status="{ item }">
                    <v-chip :color="item.selectable.status === 'CREATION' ? 'green' : 'red'">
                        {{ item.selectable.status }}
                    </v-chip>
                </template>
                <template v-slot:item.id="{ item }">
                    <router-link :to="{ name: 'ServiceApplication', params: { applicationId: item.selectable.id } }">
                        {{ item.selectable.id }}
                    </router-link>
                </template>
            </v-data-table>
        </v-card-actions>
    </v-card>
</template>


<script>
import gql from 'graphql-tag'

export default {
  props: {
    equipmentCode: {
      type: String,
      required: true
    }
  },
  apollo: {
    serviceApplications: {
      query: gql`query getServiceApplications ($args: GetRequestParams) { _eamservicerequests { serviceRequest(args: $args) { id status declarer position phone createdAt content } } }`,
      variables () {
        return { args: { equipmentId: this.equipmentCode } }
      },
      update: data => data._eamservicerequests.serviceRequest,
    }
  },
  data () {
    return {
      serviceApplications: {},
      headers: [
        { title: this.$t('number'), key: 'id' },
        { title: this.$t('created-at'), key: 'createdAt' },
        { title: this.$t('status'), key: 'status' },
        { title: this.$t('name'), key: 'declarer' },
        { title: this.$t('content'), key: 'content' },
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.v-card-title {
  background-color: rgba(var(--v-theme-secondary-darken-1));
  .text-h5 {
      text-transform: uppercase !important;
  }
}
</style>