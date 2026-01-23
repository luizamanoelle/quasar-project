export interface ReportPayload {
  user_id: number;
  type_id: string | null;
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
