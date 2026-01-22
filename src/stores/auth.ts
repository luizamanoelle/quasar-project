import { defineStore } from 'pinia';
import type { LoginCredentials } from 'src/models/Auth';
import { AuthService } from 'src/services/AuthService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user_data') || 'null'),
    token: localStorage.getItem('asten_token') || null,
  }),

  actions: {
    async login(credentials: LoginCredentials) {
      const user = await AuthService.login(credentials);

      if (user) {
        const fakeToken = btoa(JSON.stringify({ id: user.id, email: user.email }));

        this.token = fakeToken;
        this.user = user;

        localStorage.setItem('asten_token', fakeToken);
        localStorage.setItem('user_data', JSON.stringify(user));
        return true;
      }
      return false;
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('asten_token');
      localStorage.removeItem('user_data');
    },
  },
});
