<template>
  <div class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 10vh">404</div>

      <div class="w-full max-w-sm md:max-w-lg">
        <q-img :src="noresults" class="md:scale-130" fit="contain" />
      </div>
      <div class="text-h3" style="opacity: 0.4">Oops. Nothing here...</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import noresults from 'assets/noresults.svg';
//
</script>
