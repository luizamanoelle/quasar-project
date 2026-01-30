<template>
  <q-page class="p-4 md:p-10">
    <!--loading-->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <q-spinner-ios color="primary" size="3em" />
    </div>

    <div v-else-if="report" class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-2">
        <!--titulo da ocorrencia e data-->
        <!--titulo da ocorrencia-->
        <div class="grid grid-cols-3 items-center mb-1">
          <!--voltar-->
          <div class="flex justify-start">
            <q-btn
              flat
              :aria-label="$t('common.back')"
              icon="arrow_back"
              @click="$router.push('/admin/dashboard')"
            />
          </div>

          <!--titulo central-->
          <div class="text-center">
            <span class="text-2xl md:text-4xl font-semibold">
              {{ getReportTypeName(report.type_id) }}
            </span>
          </div>

          <!--fechar-->
          <div class="flex justify-end">
            <q-btn flat icon="close" @click="confirmCancel" />
          </div>
        </div>

        <!--data fora do header-->
        <div class="text-center mb-4">
          <p class="text-sm">{{ $t('view.date') }} {{ report.date }}</p>
        </div>

        <!--card do status-->
        <div class="rounded-3xl p-4" :class="getStatus(report.status).color">
          <!--status e icon-->
          <div class="text-2xl font-bold flex justify-between items-center">
            {{ getStatus(report.status).label }}
            <q-icon :name="getStatus(report.status).icon" size="sm" />
          </div>

          <!--descrição-->
          <div class="text-sm opacity-90 mt-1">
            {{ getStatus(report.status).description }}
          </div>
        </div>

        <q-separator inset class="q-my-md" />

        <!--fotos-->
        <section>
          <!--titulo e count-->
          <div class="flex items-center justify-between mb-3">
            <span class="text-2xl font-semibold">
              {{ $t('view.photos') }}
            </span>
            <span class="text-sm bg-surface px-2 py-1 rounded-full">
              {{ report.photos?.length || 0 }}
            </span>
          </div>

          <section
            v-if="report.photos?.length"
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            <!--imagem-->
            <div
              v-for="(photo, idx) in report.photos"
              :key="idx"
              class="aspect-square rounded-2xl overflow-hidden cursor-pointer my-2"
              @click="openImage(photo)"
            >
              <q-img :src="photo" class="w-full h-full object-cover" />
            </div>
          </section>
        </section>

        <!--info-->
        <div class="rounded-2xl border border-gray-200">
          <q-list separator>
            <!--localização-->
            <q-item>
              <q-item-section avatar>
                <q-icon name="place" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption class="mb-1 uppercase">
                  {{ $t('view.location') }}
                </q-item-label>
                <q-item-label class="font-semibold">
                  {{ report.location?.address }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <!--descrição-->
            <q-item v-if="report.description">
              <q-item-section avatar>
                <q-icon name="description" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption class="mb-1 uppercase">
                  {{ $t('view.description') }}
                </q-item-label>
                <q-item-label class="text-sm"> "{{ report.description }}" </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>

      <div class="space-y-6">
        <!--att status-->
        <div class="rounded-3xl p-6 border border-gray-200 sticky top-6">
          <span class="block text-2xl font-bold mb-4 text-center">
            {{ $t('view.update') }}
          </span>

          <button
            v-for="opt in Object.values(STATUS_CONFIG)"
            :key="opt.value"
            class="w-full p-3 rounded-3xl flex items-center gap-5 border-2 mb-3"
            :class="tempStatus === opt.value ? 'border-gray-500' : 'border-transparent'"
            @click="tempStatus = opt.value"
          >
            <!--icons-->
            <div :class="`bg-${opt.color} text-${opt.color} p-3 rounded-full`">
              <q-icon :name="opt.icon" size="sm" />
            </div>

            <!--title-->
            <div class="flex-1 text-left">
              <div class="font-bold">
                {{ opt.label }}
              </div>
            </div>
          </button>

          <!--confirmar troca de status-->
          <div class="mt-5">
            <q-btn
              v-if="hasChanges"
              icon="las la-check"
              :label="$t('common.confirm')"
              color="positive"
              class="w-full mt-6 py-4 rounded-xl font-bold text-lg"
              :loading="updating"
              @click="confirmStatusChange"
            />
          </div>
        </div>
      </div>
    </div>

    <!--open image-->
    <q-dialog v-model="imageDialog" maximized transition-show="fade" transition-hide="fade">
      <div class="flex flex-col h-full backdrop-blur-md">
        <q-btn icon="close" flat round class="absolute top-6 right-6 z-50" v-close-popup />
        <q-img :src="selectedImage" fit="contain" class="h-full w-full" />
      </div>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { ReportService } from 'src/services/ReportService';
import type { Report, StatusConfigItem } from 'src/models/Report';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const $q = useQuasar();

const report = ref<Report | null>(null);
const loading = ref(true);
const updating = ref(false);
const tempStatus = ref<number | null>(null);
const imageDialog = ref(false);
const selectedImage = ref('');

const getStatus = (s: number): StatusConfigItem => {
  return STATUS_CONFIG[s] ?? STATUS_CONFIG[1]!;
};

const STATUS_CONFIG: Record<number, StatusConfigItem> = {
  1: {
    value: 1,
    label: t('view.status.1.label'),
    color: 'bg-negative',
    icon: 'schedule',

    description: t('view.status.1.description'),
  },
  2: {
    value: 2,
    label: t('view.status.2.label'),
    color: 'bg-warning',
    icon: 'engineering',
    description: t('view.status.2.description'),
  },
  3: {
    value: 3,
    label: t('view.status.3.label'),
    color: 'bg-positive',
    icon: 'check_circle',

    description: t('view.status.3.description'),
  },
};

//vai ver se mudou o status
const hasChanges = computed(() => report.value && tempStatus.value !== report.value.status);

//nome da categoria
const getReportTypeName = (id: string | number | undefined) => {
  if (!id) return 'Ocorrência';
  return t(`dashboard.types.${id}`);
};

// Ações
const fetchDetails = async () => {
  loading.value = true;
  try {
    const data = await ReportService.getById(String(route.params.id));
    report.value = data;
    tempStatus.value = data.status;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const confirmStatusChange = async () => {
  if (!tempStatus.value || !report.value) return;
  updating.value = true;

  try {
    await ReportService.updateStatus(report.value.id, tempStatus.value);

    report.value.status = tempStatus.value;
    $q.notify({ type: 'positive', message: t('view.status.confirm'), position: 'top' });

    void router.push('/admin/dashboard');
  } catch {
    console.error('Erro');
    $q.notify({ type: 'negative', message: t('view.status.confirmfail') });
  } finally {
    updating.value = false;
  }
};

const openImage = (img: string) => {
  selectedImage.value = img;
  imageDialog.value = true;
};

const confirmCancel = () => {
  $q.dialog({
    title: t('report.titleCancel'),
    message: t('report.message'),
    cancel: true,
    persistent: true,
  }).onOk(() => {
    router.back();
  });
};

onMounted(fetchDetails);
</script>
