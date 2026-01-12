import { defineStore } from 'pinia';

export interface NominatimAddress {
  city?: string;
  town?: string;
  village?: string;
  road?: string;
  house_number?: string;
  neighbourhood?: string;
  lat?: number;
  lng?: number;
}

export const useLocationStore = defineStore('location', {
  //gets
  state: () => ({
    address: {
      city: '',
      road: '',
      houseNumber: '',
      neighbourhood: '',
      lat: 0,
      lng: 0,
    },
  }),
  actions: {
    setAddress(payload: NominatimAddress) {
      this.address = {
        city: payload.city || payload.town || payload.village || '',
        road: payload.road || '',
        houseNumber: payload.house_number || '',
        neighbourhood: payload.neighbourhood || '',
        lat: payload.lat || 0,
        lng: payload.lng || 0,
      };
    },
  },
});
