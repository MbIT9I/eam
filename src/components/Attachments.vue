<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-v-slot -->
<template>
    <v-card class="mt-5" v-if="!!attachments?.length">
        <v-card-title class="pa-0 ma-0">
            <p class="text-h5 text-white pa-2">
                {{ $t('equipment-attachments') }}
            </p>
        </v-card-title>
        <v-card-actions class="pt-2">
            <!-- <v-data-table class="w-100"
                :headers="headers"
                :items="attachments"
                key="id">
                <template v-slot:item.id="{ item }">
                    <v-icon @click="downloadFile(item.value)">mdi-download</v-icon>
                </template>
            </v-data-table> -->
            <v-sheet class="d-flex flex-column w-100" >
              <v-sheet class="d-flex py-2 px-2 align-center justify-space-between attachment"
                v-for="attachment in attachments" :key="attachment.id">
                <span style="max-width: 90%;">{{ attachment.fileName }}</span>
                <v-icon  @click="downloadFile(attachment)">mdi-download</v-icon>
              </v-sheet>
            </v-sheet>
        </v-card-actions>
    </v-card>
</template>


<script>
import gql from 'graphql-tag'
import { useAppStore } from '@/store/app';
const store = useAppStore();
export default {
    props: {
    equipmentId: {
      type: String,
      required: true
    }
  },
  apollo: {
    attachments: {
      query: gql`query getEquipmentAttachments ($equipmentId: String) { _eamequipment { attachments(equipmentId: $equipmentId) { id fileName dateAdd description type typeName extension } } }`,
      variables () {
        return { equipmentId: this.equipmentId }
      },
      update: data => data._eamequipment.attachments,
    }
  },
  data () {
    return {
        attachments: []
    }
  },
  computed: {
    headers() {
      return [
        // { title: this.$t('typeName'), key: 'typeName' },
        { title: this.$t('fileName'), key: 'fileName' },
        { title: this.$t('download'), key: 'id' },
      ]
    }
  },
  methods: {
    downloadFile(attachment) {
      store.publishLog(this.equipmentId, 2, attachment.fileName);

      this.$apolloProvider.defaultClient.query({
          // Query
          query: gql`query getAttachmentId($id: Int) { _eamequipment { attachmentUrl(id: $id) { success fileName errorMessage } } }`,
          // Parameters
          variables: {
              id: attachment.id
          }
      })
      .then(({data}) => {
          console.log(data)
          var response = data._eamequipment.attachmentUrl
          if (response.success) {
              window.open(`https://erp.harwind.com.ua/ws/GetFile.ashx?file=${response.fileName}`, '_blank')
          } else {
              this.$store.dispatch('showError', response.errorMessage)
          }
      })
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
.attachment
{
  border-bottom-style: solid;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-width: 0.5px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  :hover {
    cursor: pointer;
    background-color: rgba(var(--v-theme-secondary-darken-1),0.1);
  }
}
</style>
