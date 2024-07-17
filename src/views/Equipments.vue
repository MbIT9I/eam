<template>
    <equipment-item v-if="!!equipmentId" :equipmentId="equipmentId" />
    <support-form v-if="!!equipmentCode " :equipmentCode="equipmentCode" />
    <support-applications v-if="!!equipmentCode " :equipmentCode="equipmentCode" />
    <!-- <accessories v-if="!!equipmentCode " :equipmentCode="equipmentCode" /> -->
</template>

<script setup>
import EquipmentItem from '@/components/EquipmentItem.vue';
import SupportForm from '@/components/SupportForm.vue';
import SupportApplications from '@/components/SupportApplications.vue';
// import Accessories from '@/components/Accessories.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<script>
import gql from 'graphql-tag'
export default {
    components: {
        EquipmentItem,
        SupportForm,
        SupportApplications,
        // Accessories
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
