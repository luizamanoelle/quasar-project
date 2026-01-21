<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="p-6 md:pt-10 max-w-screen-md mx-auto">
        <!--header da pagina-->
        <header class="flex items-center justify-between mb-4">
          <q-btn flat icon="arrow_back" to="/dashboard" color="grey-9" />
          <span class="text-lg md:text-4xl font-bold"> Reportar Problema </span>
          <q-btn flat color="grey-9" icon="info" to="/dashboard" size="15px" />
        </header>
        <!--separador-->
        <q-separator color="black" inset class="full-width q-my-md" />

        <!--mapa-->
        <GeoLocation />

        <!--endereço-->
        <!--<span class="flex flex-center text-center text-sm md:text-3xl py-4">
            {{ locationStore.address.road }}, {{ locationStore.address.houseNumber }} -
            {{ locationStore.address.neighbourhood }}
          </span>-->

        <!--titulo-->
        <div class="mt-5">
          <span class="text-bold text-base">Escolha a categoria:</span>
        </div>

        <!--help-->
        <div @click="lightDialog = true">
          <q-icon name="help" size="12px" class="text-gray-500" />
          <span class="text-[11px] font-light text-gray-500">
            Não sei em qual categoria se encaixa meu problema!
          </span>
        </div>
        <help-dialog v-model="lightDialog" />

        <!--row de botões pra selecionar a categorias do report-->
        <div class="row q-col-gutter-md flex-center">
          <div v-for="opt in problemOptions" :key="opt.value" class="col">
            <!--botao-->
            <q-btn
              bordered
              style="border-radius: 25px"
              :color="opt.color"
              class="full-width transition-opacity duration-300"
              :class="{
                'opacity-30': reportForm.type !== null && reportForm.type !== opt.value,
              }"
              @click="reportForm.type = opt.value"
            >
              <!--icon sepaeado-->
              <div class="column items-center my-3">
                <q-icon :name="opt.icon" size="25px" :style="{ color: opt.color2 }" />
              </div>
            </q-btn>

            <!--texto-->
            <div
              class="text-center text-[11.4px] transition-opacity duration-300"
              :class="{ 'opacity-30': reportForm.type !== null && reportForm.type !== opt.value }"
            >
              {{ opt.label }}
            </div>
          </div>
        </div>

        <!--botao da foto-->
        <div class="mt-4">
          <span class="text-base font-bold text-gray-800"> Tire sua Foto: </span>

          <div class="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-1 mt-2">
            <div v-for="(photo, index) in locationStore.photos" :key="index" class="relative">
              <q-img :src="photo" class="h-25 w-full rounded shadow-md" fit="cover" />
              <q-btn
                round
                color="negative"
                icon="close"
                size="xs"
                class="absolute -top-2 -right-2 z-20 shadow-lg"
                @click="locationStore.removePhoto(index)"
              />
            </div>

            <div v-if="locationStore.photos.length < 3">
              <q-btn
                color="grey-8"
                style="height: 100px; border: 2px dashed #ccc"
                flat
                to="/cam"
                class="!rounded-xl border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100 transition-all flex flex-col"
              >
                <div class="flex flex-col items-center justify-center">
                  <q-icon name="add_a_photo" size="32px" />
                  <span class="text-xs mt-2 font-medium">
                    {{ locationStore.photos.length }}/3
                  </span>
                </div>
              </q-btn>
            </div>
          </div>
        </div>

        <!--descrição-->
        <div class="mt-4">
          <!--titulo-->
          <span class="text-bold text-base">Descreva o problema:</span>

          <!--input-->
          <q-input
            outlined
            v-model="text"
            type="textarea"
            rows="3"
            placeholder="Ex: 'O buraco está escondido por uma poça dágua'"
            :dense="dense"
          >
            <template v-slot:append>
              <q-icon name="close" @click="text = ''" class="cursor-pointer" />
            </template>
          </q-input>
        </div>

        <!--localização-->
        <div class="mt-2">
          <!--titulo-->
          <span class="text-bold text-base">Localização:</span>
          <q-item>
            <q-item-label caption
              >{{ locationStore.address.road }}, {{ locationStore.address.houseNumber }} -
              {{ locationStore.address.neighbourhood }}</q-item-label
            >
          </q-item>
        </div>

        <!--enviar-->
        <q-btn
          @click="submitReport"
          no-caps
          color="black"
          class="full-width q-mt-md py-md"
          rounded
          to="/dashboard"
        >
          <span class="q-ml-md text-h6 text-weight-bold">Enviar Ocorrência</span></q-btn
        >

        <!--ordem de hierarquia das page-->
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GeoLocation from 'src/components/GeoLocation.vue';
import { useLocationStore } from 'src/stores/location';
import HelpDialog from 'src/components/HelpDialog.vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const locationStore = useLocationStore();
const lightDialog = ref(false);
const dense = ref(false);
const text = ref('');

interface ReportForm {
  type: string | null;
  description?: string;
}

const reportForm = ref<ReportForm>({
  type: null, //tipo de ocorrencia
});

const problemOptions = [
  { label: 'Vias', value: '1', icon: 'build', color: 'warning', color2: '#a25107' },
  { label: 'Limpeza', value: '2', icon: 'delete_outline', color: 'positive', color2: '#1E5128' },
  { label: 'Luz', value: '3', icon: 'flash_on', color: 'accent', color2: '#a29607' },
  { label: 'Agua', value: '4', icon: 'water_drop', color: 'info', color2: '#1a1a40' },
  { label: 'Trânsito', value: '5', icon: 'car_crash', color: 'negative', color2: '#750000' },
];

async function submitReport() {
  try {
    const payload = {
      usuario_id: 1,
      tipo_id: reportForm.value.type,
      descricao: text.value,
      localizacao: {
        endereco: `${locationStore.address.road}, ${locationStore.address.houseNumber}`,
        bairro: locationStore.address.neighbourhood,
        lat: locationStore.address.lat,
        lng: locationStore.address.lng,
      },
      imagens: locationStore.photos,
      data_criacao: new Date().toLocaleDateString('pt-BR'),
      status: 1,
    };
    //post
    await api.post('/ocorrencias', payload);

    locationStore.clearPhotos();

    $q.notify({
      color: 'positive',
      message: 'Ocorrência enviada com sucesso!',
      icon: 'check',
    });
  } catch {
    $q.notify({
      color: 'negative',
      message: 'Erro ao registrar!',
      icon: 'error',
    });
  }
}
</script>
