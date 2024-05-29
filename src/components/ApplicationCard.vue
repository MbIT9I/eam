<template>
    <v-card class="mt-5">
        <v-card-title class="pa-0 ma-0">
            <p class="text-h5 text-white pa-2">
                {{ $t('application-history') }} 
                <!-- {{ applicationCode }} -->
            </p>
        </v-card-title>
        <v-card-actions class="pt-2">

            <v-data-table class="w-100"
                :headers="headers"
                :items="serviceApplicationHistory"
                key="id">
                <template v-slot:item.createdAt="{ item }">
                    {{ new Date(item.selectable.createdAt).toLocaleDateString() }}
                </template>
                <template v-slot:item.status="{ item }">
                    {{ $t("type-descriprions."+item.selectable.status) }}
                </template>

            </v-data-table>

        </v-card-actions>
    </v-card>
</template>

<script>
import gql from 'graphql-tag'

export default {
    props: {
        applicationCode: {
            type: String,
            required: true
        }
    },
    apollo: {
        serviceApplicationHistory: {
            query: gql`query getServiceApplicationHistory ($requestId: Int) { _eamservicerequests { serviceRequestLog(requestId: $requestId) { id status createdAt } } }`,
            variables () {
                return { requestId: this.applicationCode ?? "" }
            },
            update: data => data._eamservicerequests.serviceRequestLog,
        }
    },
    data () {
        return {
            serviceApplicationHistory: [],
            headers: [
                { title: this.$t('date'), key: 'createdAt', formatter: (value) => new Date(value).toLocaleString() },
                { title: this.$t(`event`), key: 'status' }
            ]
        }
    },
    mounted() {
        console.log(this.serviceApplicationHistory);
    },
}
</script>

<style scoped lang="scss">
.v-card-title {
  background-color: rgba(var(--v-theme-secondary-darken-1));
  .text-h5 {
      font-size: large;
      font-weight: 700;
      text-transform: uppercase !important;
  }
}
</style>