<template>
    <v-card class="mt-5"  v-if="!!accessories?.length">
    <v-card-title class="pa-0 ma-0">
        <p class="text-h5 text-white pa-2">
            {{ $t('additional-options') }}
        </p>
    </v-card-title>
    <v-card-actions class="pt-2">
        <v-data-table class="w-100"
            :headers="headers"
            :items="accessories"
        >
        <template v-slot:item.isInstalled="{ item }">
            <v-checkbox
            v-model="item.selectable.isInstalled"
            :disabled="true"
            ></v-checkbox>
        </template>
        <template v-slot:item.description="{ item }">
          <v-dialog width="500">
            <template v-slot:activator="{ props }">
              <v-btn  v-if="item.selectable.description" v-bind="props" icon="mdi-information"> </v-btn>
            </template>

          <template v-slot:default="{ isActive }">
            <v-card :title="$t('additionalInfo')">
              <v-card-text>
                {{ item.selectable.description }}
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  :text="$t('closeDialog')"
                  @click="isActive.value = false"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>

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
    accessories: {
      query: gql`query getAccessories ($equipmentId: String) { _eamequipment { accessories(equipmentId: $equipmentId) { code name description typeCode typeName isInstalled } } }`,
      variables () {
        return { equipmentId: this.equipmentCode }
      },
      update: data => data._eamequipment.accessories,
    }
  },
  data () {
    return {
        accessories: {},
        headers: [
            { title: this.$t('included'), key: 'isInstalled' },
            { title: this.$t('type'), key: 'typeName' },
            { title: this.$t('name'), key: 'name' },
            { title: "", key: 'description' },
        ]
    }
  }
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