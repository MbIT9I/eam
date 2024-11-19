<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <equipment-item v-if="!!equipmentId" :equipmentId="equipmentId" />
    <support-form v-if="!!equipmentCode " :equipmentCode="equipmentCode" />
    <support-applications v-if="false && !!equipmentCode " :equipmentCode="equipmentCode" />
    <!-- <accessories v-if="!!equipmentCode " :equipmentCode="equipmentCode" /> -->
    <useful-links v-if="!!equipmentId" :equipmentId="equipmentId" />
    <attachments v-if="!!equipmentId" :attachments="attachments" />

      <div v-if="currenUserProps"
        class="pt-5">
        <v-btn
          block
          color="secondary-darken-1"
          :to="{ name: 'InternlFiles', params: { equipmentId: equipmentId } }">
        <v-icon color="white" class="mr-1">mdi-step-forward</v-icon>
        {{ $t('gotoPageInternlFiles') }}
      </v-btn>
      </div>
</template>

<script setup>
import EquipmentItem from '@/components/EquipmentItem.vue';
import SupportForm from '@/components/SupportForm.vue';
import SupportApplications from '@/components/SupportApplications.vue';
import UsefulLinks from '@/components/UsefulLinks.vue';
import Attachments from '@/components/Attachments.vue';

import { useAppStore } from '@/store/app';
import { useAccessStore } from '@/store/access'

// import Accessories from '@/components/Accessories.vue';
// import { useRoute } from 'vue-router';
// const route = useRoute();
</script>

<script>
import { GET_EQUIPMENT_ATTACHMENTS, GET_EQUIPMENT_CODE } from "@/graphql/query";
const store = useAppStore();
const accessStore = useAccessStore()

export default {
    components: {
        EquipmentItem,
        SupportForm,
        SupportApplications,
        // Accessories,
        UsefulLinks,
        Attachments
    },
    computed: {
        equipmentId: {
          get() {
            return this.$route?.params?.equipmentid ?? "";
          },
        },
      currenUserProps() {
        return accessStore.userProps
      }
    },
    apollo: {
      equipmentCode: {
          query: GET_EQUIPMENT_CODE,
          variables () {
              return { equipmentId: this.equipmentId }
          },
          update: data => data._eamequipment.equipmentData.equipmentCode,
          result({ data }) {
            if (!data?._eamequipment?.equipmentData?.equipmentCode) {
            this.$router.push({ name: '404' });
            }
          }
      },
      attachments: {
        query: GET_EQUIPMENT_ATTACHMENTS,
        variables () {
          return { equipmentId: this.equipmentId }
        },
        update: data => data._eamequipment.attachments,
      }
    },
    data () {
        return {
            equipmentCode: '',
            attachments: []
        }
    },
    mounted() {
      store.publishLog(this.equipmentId, 0, 'Equipment Page');
    }
}
</script>
