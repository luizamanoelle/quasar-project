import { api } from 'src/boot/axios';
import type { LoginCredentials } from 'src/models/Auth';

export const AuthService = {
  async login(credentials: LoginCredentials) {
    const res = await api.get(`´/usuarios?email=${credentials.email}`);
    const user = res.data[0];

    if (user && user.password === credentials.password) {
      return user;
    }
    return null;
  },
};
