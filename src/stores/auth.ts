import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

// 1. Definimos o "formato" das credenciais
interface LoginCredentials {
  email: string;
  senha: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user_data') || 'null'),
    token: localStorage.getItem('asten_token') || null,
  }),

  actions: {
    // 2. Aplicamos o tipo ao parâmetro 'credentials'
    async login(credentials: LoginCredentials) {
      try {
        const res = await api.get(`/usuarios?email=${credentials.email}`);
        const user = res.data[0];

        if (user && user.senha === credentials.senha) {
          const fakeToken = btoa(JSON.stringify({ id: user.id, email: user.email }));

          this.token = fakeToken;
          this.user = user;

          localStorage.setItem('asten_token', fakeToken);
          localStorage.setItem('user_data', JSON.stringify(user));
          return true;
        }
        return false;
      } catch (error) {
        console.error('Erro no login:', error);
        return false;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('asten_token');
      localStorage.removeItem('user_data');
    },
  },
});
