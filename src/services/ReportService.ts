import { api } from 'src/boot/axios';
import type { ReportPayload } from 'src/models/Report';

export const ReportService = {
  async create(payload: ReportPayload) {
    const res = await api.post('/reports', payload);
    return res.data;
  },

  async getAll(): Promise<Report[]> {
    const res = await api.get<Report[]>('/reports');
    return res.data;
  },

  async getByUserId(userId: number): Promise<Report[]> {
    const res = await api.get<Report[]>(`/reports?user_id=${userId}`);
    return res.data;
  },
};
