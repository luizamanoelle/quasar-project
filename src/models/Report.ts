// src/models/Report.ts
export interface Report {
  id: number;
  user_id: number;
  type_id: string;
  description: string;
  location: {
    address: string;
    neighborhood: string;
    lat: number;
    lng: number;
  };
  photos: string[];
  date: string;
  status: number;
}

// Use 'type' para evitar o erro de interface vazia do ESLint
export type ReportPayload = Omit<Report, 'id'>;
