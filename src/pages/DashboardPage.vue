<template>
  <!--onda de fundo-->
  <q-layout view="lHh Lpr lFf">
    <!--q page é usado p nao criar barra de rolagem e alinhar c os headers e footers do quasar-->
    <q-page-container>
      <q-page>
        <!--header-->
        <header class="m-6 md:pt-10 text-center">
          <span class="text-2xl md:text-4xl"
            >{{ $t('dashboard.greeting') }}, {{ authStore.user?.name || 'User' }}</span
          >
          <p class="text-gray-500">{{ $t('dashboard.today') }} {{ day }} {{ month }}</p>

          <q-separator color="black" inset class="full-width q-my-md" />

          <!--mapa-->
          <GeoLocation />
        </header>

        <!--localização---->
        <section class="text-center">
          <div class="text-center text-bold text-xl md:text-3xl py-4">
            <span>{{ $t('dashboard.location') }} {{ locationStore.address.city }}</span>
          </div>
        </section>

        <!--filtros-->
        <div class="flex justify-center q-mb-lg">
          <q-btn-toggle
            v-model="filterMode"
            flat
            stretch
            toggle-color="primary"
            :options="[
              { label: 'Todos os Relatos', value: 'all' },
              { label: 'Meus Relatos', value: 'my' },
            ]"
          />
        </div>

        <!--cards-->
        <div class="px-6 pb-10">
          <!--loading-->
          <div v-if="loading" class="flex justify-center items-center">
            <q-spinner-dots color="primary" size="40px" />
          </div>

          <!-- se o loading terminar e as reports nao estiverem vazias mostra-->
          <div
            v-else-if="filteredReports.length > 0"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            <q-card
              v-for="report in filteredReports"
              :key="report.id"
              flat
              bordered
              class="flex flex-col h-full hover:shadow-md transition-shadow duration-200 border-gray-200"
            >
              <q-img
                v-if="report.photos?.length"
                :src="report.photos[0]"
                class="h-40"
                fit="cover"
              />
              <div v-else class="h-40 bg-gray-100 flex items-center justify-center">
                <q-icon name="image_not_supported" size="md" color="grey-4" />
              </div>

              <q-card-section class="flex-grow p-4">
                <div class="flex justify-between items-start mb-2">
                  <span
                    class="text-xs font-bold uppercase tracking-wider text-gray-700 truncate max-w-[80%]"
                  >
                    {{ getReportTypeName(report.type_id) }}
                  </span>
                  <div
                    :class="statusColorMap[report.status] || 'bg-gray-400'"
                    class="w-3 h-3 rounded-full shadow-sm mt-1"
                    title="Status"
                  ></div>
                </div>

                <p class="text-sm text-gray-600 line-clamp-2">
                  {{ report.location?.address || 'Endereço não disponível' }}
                </p>
              </q-card-section>

              <q-separator color="gray-100" />

              <q-card-actions class="px-4 py-3 bg-gray-50/50">
                <time class="text-xs text-gray-400 font-medium">
                  {{ report.date }}
                </time>
              </q-card-actions>
            </q-card>
          </div>

          <div v-else class="text-center py-20 text-gray-400">
            <q-icon name="assignment_late" size="lg" />
            <p class="mt-2 text-lg italic">Nenhum relato encontrado.</p>
          </div>
        </div>

        <!--ordem de hierarquia das page-->
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useLocationStore } from 'src/stores/location';
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { useI18n } from 'vue-i18n';
import GeoLocation from 'src/components/GeoLocation.vue';
import { ReportService } from 'src/services/ReportService';
import type { Report as CityReport } from 'src/models/Report';

const { t } = useI18n();
const locationStore = useLocationStore();
const authStore = useAuthStore();

const filterMode = ref<'all' | 'my'>('all');

const reports = ref<CityReport[]>([]);
const loading = ref(true);

const today = new Date();
const day = today.getDate();
const month = today.toLocaleDateString(undefined, { month: 'short' });

const filteredReports = computed(() => {
  if (filterMode.value === 'my') {
    return reports.value.filter((report) => report.user_id === authStore.user?.id);
  }
  return reports.value;
});

const statusColorMap: Record<number, string> = {
  1: 'bg-red-400',
  2: 'bg-yellow-400',
  3: 'bg-green-400',
};

const getReportTypeName = (id: number | string) => {
  const key = `dashboard.types.${id}`;
  // t() retorna a tradução; se não achar a chave do ID, retorna 'General'
  return t(key) !== key ? t(key) : t('dashboard.types.general');
};

const loadDashboard = async () => {
  loading.value = true;
  try {
    reports.value = await ReportService.getAll();
  } catch (e) {
    console.error('Erro ao buscar ocorrências', e);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  void loadDashboard();
});
</script>
