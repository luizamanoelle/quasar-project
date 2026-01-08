<template>
  <div>
    <p>google maps compoenent</p>
    <button @click="getLocation()">Get Location</button>
    {{ lat }} , {{ lng }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({ name: 'GeoLocation' });

const lat = ref(0);
const lng = ref(0);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat.value = position.coords.latitude;
      lng.value = position.coords.longitude;
    });
  }
}
</script>
