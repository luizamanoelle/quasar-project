<template>
  <q-page>
    <div class="flex flex-center flex-col full-width min-h-screen md:flex-row p-6 md:p-12 gap-2">
      <!--loading-->
      <div v-if="loading" class="flex justify-center items-center h-screen">
        <q-spinner-ios color="primary" size="3em" />
      </div>

      <div v-else-if="report">
        <!--titulo da ocorrencia e data-->

        <div class="md:pt-10 flex justify-between">
          <q-btn
            flat
            aria-label="Voltar"
            icon="arrow_back"
            @click="$router.push('/admin/dashboard')"
            color="grey-9"
          />
          <span class="text-2xl md:text-4xl">
            {{ getReportTypeName(report.type_id) }}
          </span>
          <q-btn flat aria-label="Fechar" icon="close" @click="confirmCancel" color="grey-9" />
          <div class="flex items-center">
            <p class="text-gray-500 text-sm">Registrado em {{ report.date }}</p>
          </div>
        </div>

        <!--card do status-->
        <div class="rounded-3xl p-4 mb-4 text-white" :class="getStatus(report.status).gradient">
          <!--status e icon-->
          <div class="text-2xl font-bold flex justify-between">
            {{ getStatus(report.status).label }}
            <q-icon :name="getStatus(report.status).icon" size="sm" />
          </div>

          <!--descrição-->
          <div class="text-sm opacity-90 mt-1">
            {{ getStatus(report.status).description }}
          </div>
        </div>

        <q-separator color="black" inset class="full-width q-my-md" />
        <!--fotos-->
        <section>
          <!--titulo e count-->
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-800 text-2xl">Evidências</span>
            <span class="text-sm text-gray-400 bg-gray-200 px-2 py-1 rounded-full">{{
              report.photos?.length || 0
            }}</span>
          </div>

          <section v-if="report.photos?.length" class="flex gap-4 pb-4">
            <!--imagem---->
            <div
              v-for="(photo, idx) in report.photos"
              :key="idx"
              class="w-34 h-34 rounded-2xl overflow-hidden"
              @click="openImage(photo)"
            >
              <!--view da foto-->
              <q-img :src="photo" class="w-full h-full object-cover" />
              <div class="bg-black/0"></div>
            </div>
          </section>
        </section>

        <!--info-->
        <div class="bg-white rounded-2xl border border-gray-200">
          <q-list separator>
            <!--localização-->
            <q-item>
              <q-item-section avatar>
                <q-icon name="place" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption class="mb-1 uppercase">Localização</q-item-label>
                <q-item-label class="font-semibold text-gray-800">
                  {{ report.location?.address || 'Sem endereço' }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <!--descrição---->
            <q-item v-if="report.description">
              <q-item-section avatar>
                <q-icon name="description" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption class="mb-1 uppercase">Descrição</q-item-label>
                <q-item-label class="text-gray-600 text-sm">
                  "{{ report.description }}"
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>

      <!--att status-->
      <q-bottom-sheet v-model="mobileSheetOpen">
        <div class="p-6 pb-10">
          <span class="text-3xl font-bold text-gray-900 text-center">Atualizar Ocorrência</span>

          <button
            v-for="opt in Object.values(STATUS_CONFIG)"
            :key="opt.value"
            class="w-full p-2 rounded-3xl flex items-center gap-4 border-2"
            :class="tempStatus === opt.value ? ` border-gray-500` : 'bg-white border-transparent '"
            @click="tempStatus = opt.value"
          >
            <!--icons-->
            <div :class="`bg-${opt.color}-100 text-${opt.color}-600 p-3 rounded-full`">
              <q-icon :name="opt.icon" size="sm" />
            </div>
            <!--title-->
            <div class="flex-1 text-left">
              <div class="font-bold text-gray-900">{{ opt.label }}</div>
            </div>
          </button>

          <!--confirmar troca de status-->
          <div class="my-8 justify-items-end">
            <q-btn
              icon="las la-check"
              v-if="hasChanges"
              label="Confirmar"
              color="positive"
              class="w-full mt-6 py-4 rounded-xl font-bold text-lg shadow-lg flex justify-right text-black"
              :loading="updating"
              @click="confirmStatusChange"
            />
          </div>
        </div>
      </q-bottom-sheet>

      <!--open image-->
      <q-dialog v-model="imageDialog" maximized transition-show="fade" transition-hide="fade">
        <div class="flex flex-col h-full backdrop-blur-md">
          <q-btn
            icon="close"
            flat
            round
            color="white"
            class="absolute top-6 right-6 z-50 bg-white/20"
            v-close-popup
          />
          <q-img :src="selectedImage" fit="contain" class="h-full w-full" />
        </div>
      </q-dialog>
    </div>
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
const mobileSheetOpen = ref(false);
const imageDialog = ref(false);
const selectedImage = ref('');

const getStatus = (s: number): StatusConfigItem => {
  return STATUS_CONFIG[s] ?? STATUS_CONFIG[1]!;
};

const STATUS_CONFIG: Record<number, StatusConfigItem> = {
  1: {
    value: 1,
    label: 'Pendente',
    color: 'red',
    icon: 'schedule',
    gradient: 'bg-gradient-to-br from-red-600 to-red-800 shadow-red-500/30',
    description: 'Aguardando triagem inicial da equipe.',
  },
  2: {
    value: 2,
    label: 'Em Análise',
    color: 'orange',
    icon: 'engineering',
    gradient: 'bg-gradient-to-br from-orange-400 to-orange-600 shadow-orange-500/30',
    description: 'Técnicos avaliando a solução.',
  },
  3: {
    value: 3,
    label: 'Resolvido',
    color: 'green',
    icon: 'check_circle',
    gradient: 'bg-gradient-to-br from-green-500 to-green-700 shadow-green-500/30',
    description: 'O problema foi solucionado com sucesso.',
  },
};

//vai ver se mudou o status
const hasChanges = computed(() => report.value && tempStatus.value !== report.value.status);

//nome da categoria
const getReportTypeName = (id: string | number | undefined) => {
  if (!id) return 'Ocorrência';
  return t(`dashboard.types.${id}`) || 'Ocorrência';
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
    mobileSheetOpen.value = false;
    $q.notify({ type: 'positive', message: 'Status atualizado!', position: 'top' });
  } catch {
    console.error('Erro');
    $q.notify({ type: 'negative', message: 'Erro ao salvar.' });
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
    title: t('report.titleCancel') || 'Cancelar',
    message: t('report.message') || 'Deseja realmente sair?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    router.back();
  });
};

onMounted(fetchDetails);
</script>
