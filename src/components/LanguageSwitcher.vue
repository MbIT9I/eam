<!-- Dropdown menu choosing language -->
<template>
    <v-menu v-if="!!supportedLocales?.length" offset-y>
        <template v-slot:activator="{ props }">
            <v-btn
                v-bind="props"
                text icon="mdi-translate"
                color="primary"
                class="ml-2"
            >
            </v-btn>
        </template>
        <v-list>
            <v-list-item
                v-for="lang in supportedLocales"
                :key="lang"
                :value="lang"
                @click="changeLocalization(lang)"
                :title="$t(`languages.${lang}`)"
            />
        </v-list>
    </v-menu>
</template>

<script setup>


</script>

<script>
import { SUPPORT_LOCALES } from '../plugins/i18n'
export default {
    methods: {
      changeLocalization(lang) {
        this.$i18n.locale = lang
      }
    },
    computed: {
        supportedLocales() {
            return SUPPORT_LOCALES
        }
    }
}

</script>