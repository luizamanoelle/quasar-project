<template>
  <q-card class="overflow-hidden" flat bordered style="border-radius: 24px">
    <div ref="mapContainer" style="width: 100%; height: 188px; max-height: 50vh"></div>
  </q-card>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, useTemplateRef } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLocationStore } from 'src/stores/location';

defineOptions({ name: 'GeoLocation' });

const lat = ref(0);
const lng = ref(0);
const map = ref<L.Map>();
const mapContainer = useTemplateRef<HTMLElement>('mapContainer');
const marker = ref<L.Marker>();
const cityName = ref('');
//const roadName = ref('');
//const houseName = ref('');
//const neighbourhoodName = ref('');

const locationStore = useLocationStore();

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
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
      {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'luizamanoelle@hotmail.com',
        },
      },
    );

    const data = await res.json();
    console.log('Dados do Nominatim:', data); // Verifica isto no Console do navegador

    if (data.address) {
      locationStore.setAddress({ ...data.address, lat: latitude, lng: longitude });
    }
  } catch (error) {
    console.error('Erro na API Nominatim:', error);
    cityName.value = 'Erro ao obter cidade';
  }
}

function getLocation() {
  if (navigator.geolocation) {
    //watch pra acompanhar a localização
    navigator.geolocation.getCurrentPosition(
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
