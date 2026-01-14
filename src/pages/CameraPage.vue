<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="column no-wrap overflow-hidden background-photo q-pa-lg">
        <div class="grid grid-cols-3 items-center text-white">
          <!-- esquerda (vazio) -->
          <div></div>

          <!-- centro -->
          <div class="text-center">
            <span class="text-h5 text-weight-light">Tirar Foto</span>
          </div>

          <!-- direita -->
          <div class="flex justify-end">
            <q-btn flat icon="close" to="/report" />
          </div>
        </div>

        <q-separator color="white" inset class="full-width q-my-md" />

        <CameraComp />
        <div class="text-center q-pa-xs">
          <span class="text-h7 text-weight-light text-white">clique para tirar sua foto</span>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import CameraComp from 'src/components/CameraComp.vue';
</script>

<style scoped>
.background-photo {
  background-color: #242222;
}
</style>
