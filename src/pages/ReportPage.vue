<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="p-6 md:pt-10 max-w-screen-md mx-auto bg-slate-50">
        <!--header da pagina-->
        <header class="relative flex items-center justify-center mb-4">
          <div class="absolute left-0">
            <q-btn flat icon="arrow_back" @click="$router.back()" color="grey-9" />
          </div>
          <span class="text-lg md:text-4xl font-bold"> {{ $t('report.title') }} </span>
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
          <span class="text-bold text-base">{{ $t('report.choose') }}</span>
        </div>

        <!--help-->
        <div @click="lightDialog = true">
          <q-icon name="las la-question-circle" size="12px" class="text-gray-500" />
          <span class="text-[11px] font-light text-gray-500">
            {{ $t('report.help') }}
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
                <q-icon :name="opt.icon" size="25px" :style="{ color: opt.iconColor }" />
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
              <q-img :src="photo" class="h-25 w-full rounded shadow-md" fit="contain" />
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
                to="/citizen/cam"
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
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { useLocationStore } from 'src/stores/location';
import { ReportService } from 'src/services/ReportService';

import HelpDialog from 'src/components/HelpDialog.vue';
import GeoLocation from 'src/components/GeoLocation.vue';

const { t } = useI18n();
const $q = useQuasar();
const locationStore = useLocationStore();

const lightDialog = ref(false);
const text = ref('');
const loading = ref(false);

const reportForm = ref({
  type: null as string | null,
});

const problemOptions = [
  {
    label: t('report.types.1'),
    value: '1',
    icon: 'las la-wrench',
    color: 'warning',
    iconColor: '#a25107',
  },
  {
    label: t('report.types.2'),
    value: '2',
    icon: 'delete_outline',
    color: 'positive',
    iconColor: '#1E5128',
  },
  {
    label: t('report.types.3'),
    value: '3',
    icon: 'las la-bolt',
    color: 'accent',
    iconColor: '#a29607',
  },
  {
    label: t('report.types.4'),
    value: '4',
    icon: 'las la-tint',
    color: 'info',
    iconColor: '#1a1a40',
  },
  {
    label: t('report.types.5'),
    value: '5',
    icon: 'car_crash',
    color: 'negative',
    iconColor: '#750000',
  },
];

async function submitReport() {
  if (!reportForm.value.type) {
    $q.notify({ type: 'warning', message: 'Selecione uma categoria' });
    return;
  }

  loading.value = true;
  try {
    const payload = {
      user_id: 1,
      type_id: reportForm.value.type,
      description: text.value,
      location: {
        address: `${locationStore.address.road}, ${locationStore.address.houseNumber}`,
        neighborhood: locationStore.address.neighbourhood,
        lat: locationStore.address.lat,
        lng: locationStore.address.lng,
      },
      photos: locationStore.photos,
      date: new Date().toLocaleDateString('pt-BR'),
      status: 1,
    };
    //post
    await ReportService.create(payload);

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
