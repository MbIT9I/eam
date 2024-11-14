<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <v-card max-width="400px" class="pa-4">
      <v-card-title>
        <span class="text-h5">Выход</span>
      </v-card-title>

      <v-btn @click="logout" color="error" block>
        Выйти
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const logout = () => {
      sessionStorage.removeItem('accessToken');
      router.push('/login');
    };

    return {
      logout,
    };
  },
};
</script>
