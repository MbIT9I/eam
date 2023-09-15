
<template>
  <v-app-bar flat elevation="1">
    <v-app-bar-title>
      <v-img src="https://harwind.com.ua/assets/images/logo-uk.svg" max-width="200"/>
    </v-app-bar-title>
    <them-switcher />
    <language-switcher />
  </v-app-bar>
</template>

<script setup>
import ThemSwitcher from '@/components/ThemSwitcher.vue';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';

</script>