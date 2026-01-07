import { boot } from 'quasar/wrappers';
import Vue3Geolocation from 'vue3-geolocation';

export default boot(({ app }) => {
  app.use(Vue3Geolocation);
});
