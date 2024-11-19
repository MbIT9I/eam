<template>
  <div>
    <v-btn
      color="secondary-darken-1"
      :to="{ name: 'Equipment', params: { equipmentId: equipmentId } }"
    >
      <v-icon color="white" class="mr-1">mdi-step-backward</v-icon>
      {{ $t('backToEquipmentPage') }}
    </v-btn>
    <template v-if="!!equipmentId">
      <pre v-if="errorMessage">{{ errorMessage }}</pre>
      <v-card v-else-if="loading" class="mt-5">
        <v-card-title class="pa-0 ma-0">
          <p class="text-h5 text-white pa-2">{{ $t('internal-files') }}</p>
        </v-card-title>
        <v-card-actions class="pt-2">
          <span class="px-2">{{ $t('loading') }}</span>

        </v-card-actions>
      </v-card>
      <attachments
        v-else-if="attachments && attachments.length"
        :label="'internal-files'"
        :attachments="attachments"
      />
      <div v-else>{{ $t('emptyData') }}</div>
    </template>
  </div>
</template>
<script setup>
import Attachments from "@/components/Attachments.vue";

import { useAppStore } from "@/store/app";
</script>

<script>
import { GET_INNTERNAL_FILES } from "@/graphql/query";
const accessStore = useAppStore();

export default {
  components: {
    Attachments,
  },
  computed: {
    equipmentId: {
      get() {
        return this.$route?.params?.equipmentid ?? "";
      },
    },
  },
  apollo: {
    getInternlFiles: {
      query: GET_INNTERNAL_FILES,
      variables() {
        return { equipmentId: this.equipmentId };
      },
      update(data, error) {
        if (error) {
          console.error("Ошибка при получении вложений оборудования:", error);
          this.loading = false;
          this.errorMessage =
            "Произошла ошибка при загрузке вложений оборудования.";
          return;
        }
        if (data) {
          this.attachments = data._eam_svc_int.getInternlFiles.map((file) => {
            return {
              fileName: file.fileTitle,
              fileDownloadKey: file.fileName,
            };
          });
          this.loading = false;
        }
      },
      onError(error) {
        console.error("Ошибка на уровне Apollo Client:", error);
        this.loading = false;
        this.errorMessage = "Произошла ошибка на сервере или с подключением.";
      },
    },
  },
  data() {
    return {
      attachments: [],
      loading: true,
      errorMessage: null,
    };
  },
  mounted() {
    accessStore.publishLog(this.equipmentId, 0, "Internal files page");
  },
};
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
