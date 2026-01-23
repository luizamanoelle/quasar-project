import { api } from 'src/boot/axios';
import type { ReportPayload } from 'src/models/Report';

export const ReportService = {
  async create(payload: ReportPayload) {
    const res = await api.post('/reports', payload);
    return res.data;
  },
};
