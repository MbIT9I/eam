<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <v-card max-width="800px" class="pa-4">
      <v-card-title>
        <span class="text-h5">Вхід в обліковий запис</span>
      </v-card-title>

      <v-form @submit.prevent="login"
        v-model="valid" ref="form"
        :disabled="isLoading"
         autocomplete="on">
        <v-text-field
          v-model="loginData.login"
          :disabled="isLoading"
          name="login"
          label="Ім'я користувача"
          prepend-icon="mdi-account"
          :rules="[rules.required]"
          autocomplete="username"
          required
        />
        <v-text-field
          v-model="loginData.password"
          :disabled="isLoading"
          label="Пароль"
          type="password"
          prepend-icon="mdi-lock"
          placeholder="Пароль"
          name="password"
          autocomplete="current-password"
          :rules="[rules.required]"
          required
        />
        <!--<v-checkbox
          v-model="loginData.rememberMe"
          label="Запомнить меня"
        />-->
        <v-btn
          type="submit"
          class="mt-3"
          :disabled="!valid || isLoading"
          :loading="isLoading"
          color="primary"
          block
        >
          Увійти
        </v-btn>
      </v-form>

      <v-alert v-if="error" type="error" class="mt-3" dense>
        {{ error }}
      </v-alert>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loginData: {
        login: '',
        password: '',
        rememberMe: true,
        fingerprint: 'ed3b5d8c811f85417ecaae07505e6cfc', // Статичный fingerprint
      },
      isLoading: false,
      error: null,
      valid: false,
      rules: {
        required: value => !!value || 'Це поле обов\'язково',
      },
    };
  },
  methods: {
    async login() {
      this.isLoading = true;
      try {
        const response = await fetch('https://service.harwind.com.ua/eam-web-graphql/api/authentication/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fingerprint: this.loginData.fingerprint,
            login: this.loginData.login,
            password: this.loginData.password,
            rememberMe: true//this.loginData.rememberMe,
          }),
        });

        const data = await response.json();

        if (data.Success) {
          //if(this.loginData.rememberMe) {
          sessionStorage.setItem('accessToken', data.AccessToken);
          //}
          console.log(this.$router)
          this.$router.push('/');
        } else {
          console.log(data)
          this.error = data.FailReason || 'Невірні дані для входу';
        }
      } catch (err) {
        console.error(err);
        this.error = 'Помилка при підключенні до сервера';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
