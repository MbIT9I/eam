<template>
    <v-menu
        v-if="currenUserProps"
        offset-y>
        <template v-slot:activator="{ props }">
            <v-btn
                v-bind="props"
                text
                icon="mdi-account-circle"
                color="primary"
                class="ml-2">
            </v-btn>
        </template>
        <div>
            <v-card class="white--text py-3 px-3">
                {{ currenUserProps.nameid }}
                <v-divider class="my-3"/>
                <v-btn
                    v-bind="props"
                    flat
                    block
                    @click="logout">
                    <v-icon class="mr-2">mdi-logout</v-icon>
                    Вихід
                </v-btn>
            </v-card>
        </div>
    </v-menu>
    <v-btn
        v-else
        text
        icon="mdi-account-circle"
        color="grey"
        class="ml-2"
        @click="goToLogin"/>
</template>
<script>
import { useAccessStore } from '@/store/access'
const accessStore = useAccessStore()

export default {
    methods: {
      goToLogin() {
        this.$router.push({ path: '/login', query: { redirect: this.$route.fullPath } })
      },
      logout() {
        accessStore.setToken(null);
        location.reload();
      }
    },
    computed: {
      currenUserProps() {
        return accessStore.userProps
      }
    },
}

</script>
