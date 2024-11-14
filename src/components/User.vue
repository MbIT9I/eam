<template>
    <v-menu offset-y>
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
                {{ userProps.nameid }}
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
</template>
<script setup>
</script>
<script>
export default {
    data() {
      return {
        userProps: {}
      }
    },
    methods: {
      logout() {
        console.log('fdff')
        sessionStorage.removeItem('accessToken');
        this.$router.push('/login');
      }
    },
    mounted() {
        const token = sessionStorage.getItem('accessToken');
        if (token) {
        const parts = token.split('.');

        if (parts.length === 3) {
            const payload = parts[1];
            const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));

            this.userProps = decodedPayload;
        } else {
            console.error('Неправильний формат токена');
        }
        } else {
        console.error('Токен не знайдено в sessionStorage');
        }
    }

}

</script>
