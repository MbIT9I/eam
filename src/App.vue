<template>
  <v-container>
    <v-theme-provider :theme="getTheme()" with-background class="pa-2">
      <router-view />
    </v-theme-provider>
  </v-container>
</template>
<script setup>
import { useTheme } from 'vuetify'
import { useAccessStore } from '@/store/access'

const theme = useTheme()
const accessStore = useAccessStore()

function getTheme () {
  return theme.global.name.value
}

const token = localStorage.getItem('accessToken');
accessStore.setToken(token ? token : null)
</script>
