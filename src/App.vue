<template>
  <v-container>
    <v-theme-provider :theme="getTheme()" with-background class="pa-2">
      <router-view />
    </v-theme-provider>
  </v-container>
</template>
<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

function getTheme () {
  return theme.global.name.value
}
</script>
