<template>
  <!--onda de fundo-->
  <q-layout view="lHh Lpr lFf">
    <!--q page é usado p nao criar barra de rolagem e alinhar c os headers e footers do quasar-->
    <q-page-container>
      <q-page class="column no-wrap overflow-hidden q-pa-md">
        <div class="flex items-center justify-between q-pt-lg full-width">
          <q-btn flat color="gray-7" icon="arrow_back" to="/dashboard" size="18px" />
          <span class="my-font tracking-normal text-h5"> Reportar Problema </span>
          <q-btn flat color="grey-7" icon="info" to="/dashboard" size="18px" />
        </div>

        <q-separator color="black" inset class="full-width q-my-md" />

        <GeoLocation />
        <!--ordem de hierarquia das page-->
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import GeoLocation from 'src/components/GeoLocation.vue';
</script>
