import { api } from 'src/boot/axios';
import type { Report, ReportPayload } from 'src/models/Report';

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

  // --- NOVOS MÉTODOS ---
  async getById(id: string | number): Promise<Report> {
    const res = await api.get<Report>(`/reports/${id}`);
    return res.data;
  },

  async updateStatus(id: number, status: number): Promise<void> {
    await api.patch(`/reports/${id}`, { status });
  },
};
