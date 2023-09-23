<template>
    <v-btn 
        icon = "mdi-logout-variant"
        :href = "getUrl()"
    >
    </v-btn>
</template>

<script setup>
    import { useRoute } from 'vue-router'
    const route = useRoute()

    function getUrl () {
        return  document.location.origin + '/eam-web' + route.path
    }
</script>