<template>
    <v-btn 
        icon = "mdi-theme-light-dark"
        @click="toggleTheme"
    >
    </v-btn>
</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>