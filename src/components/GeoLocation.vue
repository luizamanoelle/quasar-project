<template>
  <div>
    <!--telinha do mapa-->
    <div ref="mapContainer" style="width: 100%; height: 188px; max-height: 50vh"></div>

    <div v-if="cityName" class="text-center my-font2 text-h5 q-mb-sm q-pa-lg">
      Você está em {{ cityName }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, useTemplateRef } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

defineOptions({ name: 'GeoLocation' });

const lat = ref(0);
const lng = ref(0);
const map = ref<L.Map>();
const mapContainer = useTemplateRef<HTMLElement>('mapContainer');
const marker = ref<L.Marker>();
const cityName = ref('');

onMounted(() => {
  if (mapContainer.value) {
    map.value = L.map(mapContainer.value).setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,

      attribution: '&copy; OpenStreetMap',
    }).addTo(map.value);

    void nextTick(() => {
      getLocation();
    });
  }
});

async function getCity(latitude: number, longitude: number) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'AstenCityApp/1.0', // Identificação necessária para evitar bloqueios
        },
      },
    );
    const data = await res.json();
    console.log('Dados do Nominatim:', data); // Verifica isto no Console do navegador

    if (data.address) {
      // O Nominatim pode devolver a cidade em vários campos dependendo da região
      cityName.value =
        data.address.city ||
        data.address.town ||
        data.address.municipality ||
        data.address.village ||
        data.address.suburb ||
        'Localização identificada';
    }
  } catch (error) {
    console.error('Erro na API Nominatim:', error);
    cityName.value = 'Erro ao obter cidade';
  }
}

function getLocation() {
  if (navigator.geolocation) {
    //watch pra acompanhar a localização
    navigator.geolocation.watchPosition(
      (position) => {
        lat.value = position.coords.latitude;
        lng.value = position.coords.longitude;

        void getCity(lat.value, lng.value);

        if (map.value) {
          //centraliza o mapaa
          map.value.setView([lat.value, lng.value], 20);

          //marcadores
          if (marker.value) {
            marker.value.setLatLng([lat.value, lng.value]);
          } else {
            marker.value = L.marker([lat.value, lng.value], { draggable: true })
              .addTo(map.value)
              .on('dragend', (event) => {
                const newPos = event.target.getLatLng();
                lat.value = newPos.lat;
                lng.value = newPos.lng;

                //att quando arrasta o marker
                void getCity(lat.value, lng.value);
              });
          }
        }
      },
      (error) => {
        console.error('Erro de geolocalização:', error);
      },
    );
  }
}
</script>
