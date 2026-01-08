<template>
  <div>
    <p>{{ lat }} {{ lng }}</p>

    <!--telinha do mapa-->
    <div ref="mapContainer" style="width: 100%; height: 188px; max-height: 50vh"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

defineOptions({ name: 'GeoLocation' });

const lat = ref(0);
const lng = ref(0);
const map = ref<L.Map>();
const mapContainer = ref<HTMLElement>();
const marker = ref<L.Marker>();

onMounted(() => {
  if (mapContainer.value) {
    map.value = L.map(mapContainer.value).setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,

      attribution: '&copy; OpenStreetMap',
    }).addTo(map.value);

    getLocation();
  }
});

function getLocation() {
  if (navigator.geolocation) {
    //watch pra acompanhar a localização

    navigator.geolocation.watchPosition(
      (position) => {
        lat.value = position.coords.latitude;
        lng.value = position.coords.longitude;

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
