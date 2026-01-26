<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-col p-6 md:p-12 background-photo">
        <div class="grid grid-cols-3 items-center text-white">
          <!-- esquerda (vazio) -->
          <div></div>

          <!-- centro -->
          <div class="text-center">
            <span class="text-h5 text-weight-light">Tirar Foto</span>
          </div>

          <!-- direita -->
          <div class="flex justify-end">
            <q-btn flat icon="close" @click="$router.back()" />
          </div>
        </div>

        <q-separator color="white" inset class="full-width q-my-md" />

        <CameraComp @captured="handlePhoto" />
        <footer class="mt-auto pt-6 text-center">
          <p class="text-slate-400 text-xs italic">
            A imagem será salva automaticamente no seu relato.
          </p>
        </footer>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import CameraComp from 'src/components/CameraComp.vue';
import { useLocationStore } from 'src/stores/location';
import { useRouter } from 'vue-router';

const reportStore = useLocationStore();
const router = useRouter();

const handlePhoto = (photoBase64: string) => {
  reportStore.addPhoto(photoBase64);
  router.back();
};
</script>

<style scoped>
.background-photo {
  background-color: #242222;
}
</style>
