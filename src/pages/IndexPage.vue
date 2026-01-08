<template>
  <!--onda de fundo-->
  <q-layout view="lHh Lpr lFf">
    <div class="absolute-top-left full-width">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 413 488" fill="none">
        <path
          d="M-2 0V382.053C-2 382.053 30.2351 450.788 113.112 442.811C195.989 434.835 213.177 391.876 313.243 471.049C313.243 471.049 348.543 504.185 413 502.967V0H-2Z"
          fill="#FAF8F5"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="60"
        viewBox="0 0 410 71"
        fill="none"
        class="absolute full-width"
        style="top: 395px"
      >
        <path
          d="M395.649 70.6649C342.855 70.6649 311.572 46.3267 311.238 46.0464C248.685 -3.09732 210.338 6.27483 157.278 19.265C143.205 22.7095 128.638 26.2741 112.029 29.2646C30.8493 43.8969 -9.09944 1.33508 -9.5 0.894511L-8.51196 0C-8.12476 0.42722 31.3967 42.4417 111.775 27.9562C128.358 24.9657 142.885 21.4144 156.944 17.97C210.378 4.89971 248.978 -4.53919 312.053 45.005C312.44 45.3121 350.399 74.817 413.353 68.422L413.487 69.7438C407.305 70.3846 401.35 70.6649 395.649 70.6649Z"
          fill="#F9F0E3"
        />
      </svg>
    </div>
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
            <h1 class="my-font2">{{ $t('index.title') }}</h1>
            <p class="my-font3 text-justify text-grey-7 px-10">
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
