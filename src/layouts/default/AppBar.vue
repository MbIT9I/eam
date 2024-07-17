
<template>
  <v-app-bar flat elevation="1">
    <v-app-bar-title>
      <a href="https://harwind.com.ua/">
        <v-img src="https://harwind.com.ua/assets/images/logo-uk.svg" max-width="200"/>
      </a>
    </v-app-bar-title>
    <them-switcher />
    <language-switcher />
    <!-- <old-eam /> -->
  </v-app-bar>
</template>

<script setup>
import ThemSwitcher from '@/components/ThemSwitcher.vue';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
// import OldEam from '@/components/OldEam.vue';

</script>