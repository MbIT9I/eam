<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <equipment-item v-if="!!equipmentId" :equipmentId="equipmentId" />
    <support-form v-if="!!equipmentCode " :equipmentCode="equipmentCode" />
    <support-applications v-if="false && !!equipmentCode " :equipmentCode="equipmentCode" />
    <!-- <accessories v-if="!!equipmentCode " :equipmentCode="equipmentCode" /> -->
    <useful-links v-if="!!equipmentId" :equipmentId="equipmentId" />
    <attachments v-if="!!equipmentId" :equipmentId="equipmentId" />
</template>

<script setup>
import EquipmentItem from '@/components/EquipmentItem.vue';
import SupportForm from '@/components/SupportForm.vue';
import SupportApplications from '@/components/SupportApplications.vue';
import UsefulLinks from '@/components/UsefulLinks.vue';
import Attachments from '@/components/Attachments.vue';
// import Accessories from '@/components/Accessories.vue';
// import { useRoute } from 'vue-router';
// const route = useRoute();
</script>

<script>
import gql from 'graphql-tag'
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
        }
    },
    apollo: {
      equipmentCode: {
          query: gql`query equipmentCode ($equipmentId: String) { _eamequipment { equipmentData(equipmentId: $equipmentId) { equipmentCode: equipmentId } } }`,
          variables () {
              return { equipmentId: this.equipmentId }
          },
          update: data => data._eamequipment.equipmentData.equipmentCode,
      }
    },
    data () {
        return {
            equipmentCode: '',
        }
    }
}
</script>
