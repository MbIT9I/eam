import { defineStore } from 'pinia';

export const useAccessStore = defineStore('access', {
  state: () => ({
    token: null,
    userProps: null,
  }),

  actions: {
    setToken(token) {
      this.token = token;

      if (token) {
        localStorage.setItem('accessToken', token);
        const parts = token.split('.');

        if (parts.length === 3) {
          const payload = parts[1];
          const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));

          this.userProps = decodedPayload;
        }
      } else {
        localStorage.removeItem('accessToken');
        this.userProps = null
      }
    },
  },

  getters: {
    getToken: (state) => state.token,
    getUserProps: (state) => state.userProps,
  },
});
