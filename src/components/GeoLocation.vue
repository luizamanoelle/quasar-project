<template>
  <!--mostrar o mapa-->
  <q-card class="overflow-hidden" flat bordered style="border-radius: 24px">
    <div ref="mapContainer" style="width: 100%; height: 150px; max-height: 50vh"></div>
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
const locationStore = useLocationStore();

onMounted(() => {
  //inicia o mapa 
  if (mapContainer.value) {
    map.value = L.map(mapContainer.value).setView([51.505, -0.09], 13);

    //visual do mapa 
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,

      attribution: '&copy; OpenStreetMap',
    }).addTo(map.value);

    //garante q o mapa carrega antes de pegar a movimentação 
    void nextTick(() => {
      getLocation();
    });
  }
});

//geoloc reversa
async function getCity(latitude: number, longitude: number) {
  try {
    //espera a resposta
    const res = await fetch(
      //formato jsonv2
      //addressdetails=1 é o detalhamento
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
      {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'luizamanoelle@hotmail.com',
        },
      },
    );

    //converte a resposta
    const data = await res.json();
    console.log('Dados do Nominatim:', data);

    //salva no pinia
    if (data.address) {
      locationStore.setAddress({ ...data.address, lat: latitude, lng: longitude });
    }
  } catch (error) {
    console.error('Erro na API Nominatim:', error);
  }
}

//geolocalização
function getLocation() {
  //se conseguir localizar
  if (navigator.geolocation) {
    //getcurrent pra acompanhar a localização
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //salva as coord
        lat.value = position.coords.latitude;
        lng.value = position.coords.longitude;

        //geoloc reversa
        void getCity(lat.value, lng.value);

        if (map.value) {
          //centraliza o mapaa
          map.value.setView([lat.value, lng.value], 25);

          //marcadores
          if (marker.value) {
            marker.value.setLatLng([lat.value, lng.value]);
          } else {
            marker.value = L.marker([lat.value, lng.value], { draggable: true })
              .addTo(map.value)
              //corrigir manualmente 
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
