<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <div
          class="flex flex-center flex-col full-width min-h-screen md:flex-row p-6 md:p-12 gap-2"
        >
          <!--titulo-->
          <div>
            <p class="text-3xl md:text-5xl font-bold">
              {{ $t('index.title') }}
              <span class="text-grey-9">{{ $t('index.appName') }}!</span>
            </p>
          </div>

          <!--imagem-->
          <div class="w-full max-w-sm md:max-w-lg">
            <q-img :src="imageUrl" class="md:scale-110" fit="contain" />
          </div>

          <!--descrição-->
          <p class="text-center text-grey-8 text-lg md:text-xl max-w-md">
            {{ $t('index.description') }}
          </p>

          <!--botão-->
          <div class="w-full max-w-xs md:max-w-sm lg:max-w-lg">
            <q-btn
              :label="$t('index.btnStart')"
              color="black"
              rounded
              unelevated
              padding="16px"
              icon="las la-play"
              class="full-width font-bold text-white shadow-2"
              to="/login"
            />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import imageUrl from 'assets/home.svg';
</script>
