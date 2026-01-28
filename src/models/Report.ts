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

export type ReportPayload = Omit<Report, 'id'>;

export interface StatusConfigItem {
  value: number;
  label: string;
  color: string;
  icon: string;
  gradient: string;
  description: string;
}
