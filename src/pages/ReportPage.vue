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
        <div class="text-center items-center full-width text-grey-9 my-font3">
          <p>
            {{ locationStore.address.road }}, {{ locationStore.address.houseNumber }} -
            {{ locationStore.address.neighbourhood }}
          </p>
        </div>
        <div class="q-ma-xs">
          <span class="my-font2 tracking-normal text-h6 q-pa-md">Relate seu problema:</span>
          <div>
            <q-btn
              flat
              no-caps
              size="12px"
              color="grey-7"
              icon="help"
              label="Não sei em qual categoria se encaixa meu problema!"
              @click="lightDialog = true"
            />
          </div>

          <q-dialog v-model="lightDialog" persistent>
            <q-card>
              <q-bar>
                <div>Como saber a categoria?</div>

                <q-space />

                <q-btn dense flat icon="close" v-close-popup>
                  <q-tooltip>Close</q-tooltip>
                </q-btn>
              </q-bar>

              <q-card-section>
                <strong>1. Infraestrutura Urbana</strong><br />
                Foca na manutenção física das vias.<br />
                <strong>O que abrange:</strong> Buracos no asfalto, calçadas quebradas, bueiros sem
                tampa ou entupidos, e falta de sinalização (placas tortas ou faixas apagadas).
              </q-card-section>

              <q-card-section class="q-pt-none">
                <strong>2. Iluminação Pública</strong><br />
                FEssencial para a segurança do cidadão à noite.<br />
                <strong>O que abrange:</strong> Lâmpadas queimadas em postes, postes caídos, luzes
                acesas durante o dia ou trechos de ruas totalmente às escuras.
              </q-card-section>
              <q-card-section class="q-pt-none">
                <strong>3. Limpeza e Meio Ambiente</strong><br />
                Envolve a saúde pública e a estética da cidade.<br />
                <strong>O que abrange:</strong> Acúmulo de lixo irregular, descarte de
                móveis/entulho em terrenos baldios, necessidade de poda de árvores que oferecem
                risco ou mato muito alto em áreas públicas.
              </q-card-section>
              <q-card-section class="q-pt-none">
                <strong>4. Saneamento e Água</strong><br />
                Geralmente envolve a empresa de águas da cidade<br />
                <strong>O que abrange:</strong> Vazamentos de água limpa na calçada, refluxo de
                esgoto, cheiro forte de efluentes ou falta de abastecimento em um bairro específico.
              </q-card-section>
              <q-card-section class="q-pt-none">
                <strong>5. Mobilidade e Trânsito</strong><br />
                Foca no fluxo de veículos e pedestres.<br />
                <strong>O que abrange:</strong> Semáforos estragados, carros abandonados em via
                pública, ou obstrução de ciclovias e rampas de acessibilidade.
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
        <div class="q-gutter-xs flex justify-center full-width">
          <div
            v-for="(icon, index) in icons"
            :key="index"
            class="column items-center"
            style="min-width: 80px"
          >
            <q-btn
              :icon="icon"
              :color="colors[index % colors.length]"
              text-color="grey-9"
              rounded
              size="lg"
              unelevated
            />

            <div class="q-mt-xs text-caption text-weight-medium text-grey-9">
              {{ descriptions[index] || 'Descrição' }}
            </div>
          </div>
        </div>

        <!--ordem de hierarquia das page-->
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GeoLocation from 'src/components/GeoLocation.vue';
import { useLocationStore } from 'src/stores/location';

const locationStore = useLocationStore();
const lightDialog = ref(false);
const icons = ['build', 'cleaning_services', 'flash_on', 'water', 'car_crash'];
const colors = ['warning', 'positive', 'accent', 'info', 'negative'];
const descriptions = ['Infraestrutura', 'Limpeza', 'Iluminação', '  Saneamento', 'Trânsito'];
</script>
