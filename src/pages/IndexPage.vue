<template>
  <!--onda de fundo-->
  <q-layout view="lHh Lpr lFf">
    <!--q page é usado p nao criar barra de rolagem e alinhar c os headers e footers do quasar-->
    <q-page-container>
      <q-page class="flex">
        <div class="full-width full-height flex flex-col items-center p-12 gap-9">
          <div class="flex items-center gap-2">
            <span class="my-font tracking-widest">Asten</span>
            <q-icon :name="`img:${logoUrl}`" size="30px" />
            <span class="my-font tracking-widest">City</span>
          </div>

          <!--evitar sobreposição-->
          <q-space />

          <div class="flex flex-center">
            <q-icon :name="`img:${imageUrl}`" size="250px" />
          </div>

          <q-space />

          <div class="text-center full-width">
            <h1 class="my-font2 text-h4">{{ $t('index.title') }}</h1>
            <p class="my-font3 text-justify-center text-grey-7 px-10">
              {{ $t('index.description') }}
            </p>

            <div class="full-width px-6 py-5">
              <q-btn
                :label="$t('index.btnStart')"
                rounded
                padding="16px 0"
                class="full-width font-bold orange text-grey-8 my-font3"
                to="/dashboard"
              />
            </div>
          </div>
        </div>
        <!--ordem de hierarquia das page-->
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
//importando as imagens
import logoUrl from 'assets/logo.png';
import imageUrl from 'assets/image.svg';
</script>
