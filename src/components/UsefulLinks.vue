<template>
    <v-card class="mt-5">
        <v-card-title class="pa-0 ma-0">
            <p class="text-h5 text-white pa-2">
                {{ $t('useful-links') }}
            </p>
        </v-card-title>
        <v-card-actions class="pt-2">
            <!-- output links from usefulLink: [{ id, name, url }] -->
            <v-list>
                <v-list-item v-for="link in usefulLinks" :key="link.id">
                    <v-list-item-content>
                        <v-list-item-title>
                            <a :href="link.url" target="_blank">{{ link.name }}</a>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card-actions>
    </v-card>
</template>

<script>
import gql from 'graphql-tag'

export default {
  props: {
    equipmentId: {
      type: String,
      required: true
    }
  },
  apollo: {
    usefulLinks: {
      query: gql`query getUsefulLinks ($equipmentId: String) { _eamequipment { usefulLinks: webLinks(equipmentId: $equipmentId) { id name url } } }`,
      variables () {
        return { equipmentId: this.equipmentId }
      },
      update: data => data._eamequipment.usefulLinks,
    }
  },
  data () {
    return {
      usefulLinks: []
    }
  },
}

</script>

<style scoped lang="scss">
.v-card-title {
  background-color: rgba(var(--v-theme-secondary-darken-1));
  .text-h5 {
      font-size: large !important;
      font-weight: 700;
      text-transform: uppercase !important;
  }
}
</style>