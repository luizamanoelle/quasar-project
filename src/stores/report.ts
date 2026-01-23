import { defineStore } from 'pinia';

export const useReportStore = defineStore('report', {
  state: () => ({
    type: null as string | null,
    description: '',
  }),
  actions: {
    clearReport() {
      this.type = null;
      this.description = '';
    },
  },
});
