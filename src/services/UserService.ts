import { api } from 'src/boot/axios';
import type { UserForm, UserResponse } from 'src/models/User';

export const UserService = {
  async register(userData: UserForm): Promise<UserResponse> {
    const res = await api.post<UserResponse>('/users', userData);
    return res.data;
  },

  async getAll(): Promise<UserResponse> {
    const res = await api.get<UserResponse>('/users');
    return res.data;
  },
};
