<template>
  <!--onda de fundo-->
  <q-layout view="lHh Lpr lFf">
    <!--q page é usado p nao criar barra de rolagem e alinhar c os headers e footers do quasar-->
    <q-page-container>
      <q-page class="column no-wrap overflow-hidden q-pa-md">
        <div class="text-center q-pt-lg">
          <span class="my-font tracking-normal">Olá, Luiza</span>
          <p class="text-grey-7">Hoje 07 Jan</p>
        </div>

        <q-separator color="black" inset class="full-width" />

        <GeoLocation />

        <div class="full-width px-6 py-5">
          <q-btn
            :label="$t('index.btnStart')"
            rounded
            padding="16px 0"
            class="full-width font-bold orange text-grey-8 my-font3"
            to="/"
          />
        </div>
        <!--ordem de hierarquia das page-->
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import GeoLocation from 'src/components/GeoLocation.vue';
</script>
