<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="p-6 md:pt-10 max-w-screen-md mx-auto">
        <!--header da pagina-->
        <header class="relative flex items-center justify-between mb-4">
          <q-btn
            flat
            icon="arrow_back"
            @click="$router.push('/citizen/dashboard')"
            color="grey-9"
            aria-label="Voltar para o dashboard"
          />
          <span class="text-lg md:text-4xl font-bold"> {{ $t('report.title') }} </span>

          <q-btn
            flat
            aria-label="Fechar Relato"
            icon="close"
            @click="confirmCancel"
            color="grey-9"
          />
        </header>

        <!--separador-->
        <q-separator color="black" inset class="full-width q-my-md" />

        <!--mapa-->
        <section>
          <GeoLocation />
          <div class="p-4 flex items-start">
            <q-icon name="las la-map-marker" size="lg" />

            <p class="text-sm text-slate-700 font-medium">
              {{ locationStore.address.road }}, {{ locationStore.address.houseNumber }}
              <br />
              <span class="text-slate-500 font-normal">{{
                locationStore.address.neighbourhood
              }}</span>
            </p>
          </div>
        </section>

        <!--endereço-->
        <!--<span class="flex flex-center text-center text-sm md:text-3xl py-4">
            {{ locationStore.address.road }}, {{ locationStore.address.houseNumber }} -
            {{ locationStore.address.neighbourhood }}
          </span>-->

        <section>
          <!--titulo-->
          <div>
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
          <div class="grid grid-cols-5 sm:grid-cols-5 gap-3">
            <div v-for="opt in problemOptions" :key="opt.value">
              <!--botao-->
              <q-btn
                style="border-radius: 25px"
                :color="opt.color"
                class="full-width transition-opacity duration-300"
                :class="{
                  'opacity-30': reportStore.type !== null && reportStore.type !== opt.value,
                }"
                @click="reportStore.type = opt.value"
              >
                <!--icon sepaeado-->
                <div class="my-3">
                  <q-icon :name="opt.icon" :style="{ color: opt.iconColor }" />
                </div>
              </q-btn>

              <!--texto-->
              <div
                class="text-center"
                :class="{
                  'opacity-30': reportStore.type !== null && reportStore.type !== opt.value,
                }"
              >
                <label>{{ opt.label }}</label>
              </div>
            </div>
          </div>
        </section>

        <!--botao da foto-->
        <section class="mt-2">
          <label class="text-bold text-base">Evidências (Máx 3)</label>
          <div class="grid grid-cols-3 gap-3 mt-2">
            <div v-for="(photo, index) in locationStore.photos" :key="index" class="relative group">
              <!--imagem-->
              <q-img :src="photo" class="h-25 w-full" fit="contain" />
              <!--botao de excluir-->
              <q-btn
                aria-label="Excluir foto tirada"
                round
                color="negative"
                icon="close"
                size="xs"
                class="absolute -top-2 -right-2 z-20 shadow-lg"
                @click="locationStore.removePhoto(index)"
              />
            </div>

            <!--botao de tirar foto-->
            <button
              v-if="locationStore.photos.length < 3"
              @click="$router.push('/citizen/cam')"
              class="h-24 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400"
              aria-label="Tirar foto da evidência"
            >
              <q-icon name="add_a_photo" size="lg" />
              <span class="text-[13px] font-bold mt-1">{{ locationStore.photos.length }}/3</span>
            </button>
          </div>
        </section>

        <!--descrição-->
        <section>
          <div class="mt-2">
            <!--titulo-->
            <span class="text-bold text-base">{{ $t('report.description') }}</span>

            <!--input-->
            <q-input
              outlined
              v-model="reportStore.description"
              type="textarea"
              rows="3"
              class="w-full rounded-2xl bg-white"
              :placeholder="$t('report.placeholder')"
            >
              <template v-slot:append>
                <q-icon
                  name="close"
                  aria-label="Apagar descrição"
                  @click="reportStore.description = ''"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
          </div>
        </section>

        <!--enviar-->
        <div class="mt-9">
          <q-btn
            @click="submitReport"
            :loading="loading"
            no-caps
            color="black"
            class="full-width"
            rounded
          >
            <span class="text-bold text-xl px-4">{{ $t('report.send') }}</span>
            <q-icon name="las la-paper-plane" />
          </q-btn>
        </div>

        <!--ordem de hierarquia das page-->
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLocationStore } from 'src/stores/location';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { ReportService } from 'src/services/ReportService';
import { useAuthStore } from 'src/stores/auth';
import { useReportStore } from 'src/stores/report';

import GeoLocation from 'src/components/GeoLocation.vue';
import HelpDialog from 'src/components/HelpDialog.vue';

const { t } = useI18n();
const $q = useQuasar();
const router = useRouter();
const locationStore = useLocationStore();
const authStore = useAuthStore();
const reportStore = useReportStore();

const lightDialog = ref(false);
const loading = ref(false);

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

const confirmCancel = () => {
  $q.dialog({
    title: t('report.titleCancel'),
    message: t('report.message'),
    cancel: {
      label: t('report.cancel.label'),
      flat: true,
      color: 'grey-9',
    },
    ok: {
      label: t('report.ok.label'),
      color: 'negative',
      unelevated: true,
    },
    persistent: true,
  }).onOk(() => {
    locationStore.clearPhotos();

    if (reportStore.clearReport) reportStore.clearReport();

    void router.push('/citizen/dashboard');

    $q.notify({
      message: t('report.notify.messa'),
      color: 'grey-8',
      icon: 'close',
    });
  });
};

const submitReport = async () => {
  if (!reportStore.type) {
    $q.notify({ color: 'warning', message: t('report.requiredCategory') });
    return;
  }

  loading.value = true;

  try {
    const payload = {
      user_id: authStore.user?.id || 0,
      type_id: reportStore.type,
      description: reportStore.description,
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

    reportStore.clearReport();
    locationStore.clearPhotos();

    $q.notify({
      color: 'positive',
      message: t('report.success'),
      icon: 'check',
    });
    void router.push('/citizen/dashboard');
  } catch {
    $q.notify({ type: 'negative', message: t('report.fail') });
  } finally {
    loading.value = false;
  }
};
</script>
