<template>
  <v-sheet
    border="md opacity-12"
    class="d-block d-md-flex"
  >
    <v-sheet class="w-100 w-md-50 d-flex justify-center align-center" >
      <v-carousel v-if="equipment?.images?.length" continuous cycle :show-arrows="false">
        <v-carousel-item v-for="(img, i) in equipment?.images" :key="i">
          <div class="d-flex fill-height justify-center align-center">
            <v-img :src="`https://erp.harwind.com.ua/ws/GetFile.ashx?file=${img}`" max-width="500" />
          </div>
        </v-carousel-item>
      </v-carousel>
      <v-carousel v-else continuous cycle :show-arrows="false">
        <v-carousel-item>
          <div class="d-flex fill-height justify-center align-center">
            <v-img src="@/assets/default-image.png" max-width="500" />
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-sheet>
    <v-sheet class="w-100 w-md-50 d-flex flex-column">
      <v-sheet class="pt-5">
        <v-list  lines="one">
          <v-list-subheader backgroundcolor="primary">
            <p class="text-white"> {{ $t('title.general') }} </p>
          </v-list-subheader>
          <v-list-item> 
            <v-list-item-title class="equipment-title wrapped-text">
              {{ equipment?.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="equipment-subtitle wrapped-text" v-if="!!equipment?.description">
              {{ equipment?.description }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-sheet>
      <v-sheet class="pt-5">
        <v-list  lines="one">
          <v-list-subheader backgroundcolor="primary">
            <p class="text-white">{{ $t('title.equipment-info') }}</p>
          </v-list-subheader>
          <v-list-item :title="$t('type')">
            <v-list-item-subtitle class="wrapped-text">
              <v-icon>mdi-account</v-icon>
              {{ equipment?.typeName }}
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item :title="$t('model-name')" >
            <v-list-item-subtitle class="wrapped-text">
              <v-icon>mdi-account</v-icon>
              {{ equipment?.modelName }}
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item :title="$t('install-date')">
            <v-list-item-subtitle>
              <v-icon>mdi-calendar</v-icon>
              {{ equipment?.installDate === "0001-01-01" ? $t('not-set') : equipment?.installDate }}
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item :title="$t('factory-number')">
            <v-list-item-subtitle>
              <v-icon>mdi-factory</v-icon>
              {{ equipment?.factoryNumber }}
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item v-if="!!equipment?.manufacturerOrganizationName" :title="$t('manufacturer-name')">
            <v-list-item-subtitle class="wrapped-text">
              <v-icon>mdi-account</v-icon>
              {{ equipment?.manufacturerOrganizationName }}
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item :title="$t('owner-name')">
            <v-list-item-subtitle class="wrapped-text">
              <v-icon>mdi-account</v-icon>
              {{ equipment?.ownerOrganizationName }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-sheet>
      <v-sheet class="py-5">
        <v-list>
          <v-list-subheader>
            <p class="text-white"> {{ $t('service-contacts') }} </p>
          </v-list-subheader>
          <v-list-item :title="$t('name')">
            <v-list-item-subtitle>
              <v-icon>mdi-account</v-icon>
              {{ serviceDepartmentInfo?.name }}
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item :title="$t('phone')">
            <v-list-item-action>
              <v-icon>mdi-phone</v-icon>
              <a :href="`tel:${trimPhone(serviceDepartmentInfo?.phone)}`" target="_blank">
                {{ serviceDepartmentInfo?.phone }}
              </a>
            </v-list-item-action>
          </v-list-item>
          <v-list-item :title="$t('address')">
            <v-list-item-action>
              <v-icon>mdi-map-marker</v-icon>
              <a :href="`https://maps.app.goo.gl/vYJ9gMTUNPp7JgQd7`" target="_blank">
                {{ serviceDepartmentInfo?.address }}
              </a>
            </v-list-item-action>
          </v-list-item>
          <v-list-item :title="$t('url')">
            <v-list-item-action>
              <v-icon>mdi-link</v-icon>
              <a :href="serviceDepartmentInfo?.url" target="_blank">
                {{ serviceDepartmentInfo?.url }}
              </a>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-sheet>
  </v-sheet>
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
    serviceDepartmentInfo: {
      query: gql`query serviceDepartmentInfo { _eamcommon { serviceDepartmentInfo: serviceDepartment { name phone address url } } }`,
      update: data => data._eamcommon.serviceDepartmentInfo,
    },
    equipment: {
      query: gql`query equipment ($equipmentId: String) { _eamequipment { equipmentData(equipmentId: $equipmentId) { equipmentId name description factoryNumber installDate modelName typeName manufacturerOrganizationName ownerOrganizationName images } } }`,
      variables () {
        return { equipmentId: this.equipmentId }
      },
      update: data => data._eamequipment.equipmentData,
    }
  },
  data () {
    return {
      // Initialize your apollo data
      serviceDepartmentInfo: {},
      equipment: {}
    }
  },
  methods: {
    // Define your methods
    trimPhone(phoneNumber) {
      return phoneNumber?.replaceAll(' ','').replaceAll('(','').replaceAll(')','').replaceAll('-','');
    }
  }
}
</script>

<style scoped>
.v-list-subheader {
  background-color: rgba(var(--v-theme-secondary-darken-1));
  text-transform: uppercase;
  font-size: large;
  font-weight: bold;
}

.equipment-title {
  font-size: 1.5rem !important; 
  font-weight: 700;
}
.equipment-subtitle {
  font-size: 1rem !important; 
  font-weight: 400;
  padding-top: 5px;
}
.wrapped-text {
  white-space: normal;
  display: flex;
}
.v-list-item-subtitle {
  font-size: 1rem;
}
.v-list-item-action {
  opacity: var(--v-medium-emphasis-opacity);
  a {
    color: var(--v-text-color);
  }
  a:hover {
    color: var(--v-primary);
  }
  a:visited {
    color: var(--v-primary);
  }
}
</style>