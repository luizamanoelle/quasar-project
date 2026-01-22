<template>
  <!--onda de fundo-->
  <q-layout view="lHh Lpr lFf">
    <!--q page é usado p nao criar barra de rolagem e alinhar c os headers e footers do quasar-->
    <q-page-container>
      <q-page>
        <!--header-->
        <div class="m-6 md:pt-10">
          <div class="text-center">
            <span class="text-2xl md:text-4xl"
              >{{ $t('dashboard.greeting') }}, {{ authStore.user?.name || 'User' }}</span
            >
            <p class="text-grey-7">{{ $t('dashboard.today') }} {{ day }} {{ month }}</p>
          </div>

          <q-separator color="black" inset class="full-width q-my-md" />

          <!--mapa-->
          <GeoLocation />
        </div>

        <!--localização---->
        <div class="text-center text-bold text-xl md:text-3xl py-4">
          <span>{{ $t('dashboard.location') }} {{ locationStore.address.city }}</span>
        </div>

        <!--cards-->
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full px-6"
        >
          <!--loading-->
          <div v-if="loading" class="flex flex-center">
            <q-spinner-dots color="primary" size="40px" />
          </div>

          <!-- se o loading terminar e as ocorrencias nao estiverem vazias mostra-->
          <template v-else-if="occurrence.length > 0">
            <div v-for="item in occurrence" :key="item.id">
              <q-card
                bordered
                class="bg-white h-full flex flex-col overflow-hidden border-gray-100 p-2"
              >
                <q-img
                  v-if="item.imagens && item.imagens.length > 0"
                  :src="item.imagens[0]"
                  class="h-35"
                  fit="cover"
                />

                <q-card-section class="q-pa-sm">
                  <div class="flex justify-between items-center no-wrap full-width">
                    <div class="text-xs font-bold uppercase text-black truncate">
                      {{ getName(item.tipo_id) }}
                    </div>

                    <div
                      :class="`bg-${getStatusColor(item.status)}`"
                      class="rounded-full w-3 h-3 ml-2 flex-shrink-0"
                    ></div>
                  </div>

                  <div class="text-xs py-1 text-gray-600 full-width">
                    {{ item.localizacao?.endereco || 'Endereço não disponível' }}
                  </div>
                </q-card-section>

                <q-card-actions class="flex justify-between items-center mt-auto q-px-sm q-pb-sm">
                  <span class="text-xs text-gray-500">
                    {{ item.data_criacao }}
                  </span>
                </q-card-actions>
              </q-card>
            </div>
          </template>
        </div>
        <!--ordem de hierarquia das page-->
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import GeoLocation from 'src/components/GeoLocation.vue';
import { useLocationStore } from 'src/stores/location';
import { ref, onMounted } from 'vue';
import { api } from 'src/boot/axios';
import { useAuthStore } from 'src/stores/auth';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface Ocorrência {
  id: number;
  tipo_id: number;
  localizacao?: {
    endereco: string;
  };
  imagens?: string[];
  data_criacao: string;
  status: number;
}

const locationStore = useLocationStore();
const authStore = useAuthStore();

const today = new Date();
const day = today.getDate();
const month = today.toLocaleDateString(undefined, { month: 'short' });

const occurrence = ref<Ocorrência[]>([]);
const loading = ref(true);

const getStatusColor = (status: number) =>
  ({ 1: 'negative', 2: 'warning', 3: 'positive' })[status] || 'grey';

const getName = (id: number | string) => {
  const key = `dashboard.types.${id}`;
  // t() retorna a tradução; se não achar a chave do ID, retorna 'General'
  return t(key) !== key ? t(key) : t('dashboard.types.general');
};

const fetchOcorrencias = async () => {
  loading.value = true;
  try {
    const res = await api.get('/ocorrencias');
    occurrence.value = res.data;
  } catch (e) {
    console.error('Erro ao buscar ocorrências', e);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  void fetchOcorrencias();
});
</script>
