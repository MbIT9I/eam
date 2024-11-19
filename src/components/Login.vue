<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <v-card max-width="800px" class="pa-4">
      <v-card-title>
        <span class="text-h5">{{ $t('loginFormTitle') }}</span>
      </v-card-title>

      <v-form
        @submit.prevent="login"
        v-model="valid"
        ref="form"
        :disabled="isLoading"
        autocomplete="on"
      >
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
          @click="login"
          type="submit"
          class="mt-3"
          :disabled="!valid || isLoading"
          :loading="isLoading"
          color="primary"
          block
        >{{ $t('login') }}</v-btn>
      </v-form>

      <v-alert v-if="error" type="error" class="mt-3" dense>{{ error }}</v-alert>
    </v-card>
  </v-container>
</template>
<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAccessStore } from "@/store/access";

const accessStore = useAccessStore();
const router = useRouter();
const route = useRoute();

if (accessStore.getToken) {
  router.push(route.query.redirect || "/");
}

const loginData = ref({
  login: "",
  password: "",
  rememberMe: true,
  fingerprint: process.env.VUE_APP_FINGERPRINT,
});
const isLoading = ref(false);
const error = ref(null);
const valid = ref(false);
const rules = {
  required: (value) => !!value || "Це поле обов'язково",
};

const login = async () => {
  isLoading.value = true;
  try {
    const response = await fetch(
      "https://service.harwind.com.ua/eam-web-graphql/api/authentication/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fingerprint: loginData.value.fingerprint,
          login: loginData.value.login,
          password: loginData.value.password,
          rememberMe: true, // this.loginData.rememberMe,
        }),
      }
    );

    const data = await response.json();
    if (data.Success) {
      accessStore.setToken(data.AccessToken);
      // После успешного входа перенаправляем
      router.push(route.query.redirect || "/");
    } else {
      error.value = data.FailReason || "Невірні дані для входу";
    }
  } catch (err) {
    console.error(err);
    error.value = "Помилка при підключенні до сервера";
  } finally {
    isLoading.value = false;
  }
};
</script>
