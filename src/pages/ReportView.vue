<template>
  <q-page class="bg-gray-50 pb-32">
    <header
      class="fixed top-0 left-0 right-0 z-50 px-4 py-4 flex justify-between items-center bg-gray-50/90 backdrop-blur-md transition-all"
    >
      <q-btn
        round
        flat
        dense
        icon="arrow_back"
        color="black"
        class="bg-white shadow-sm border border-gray-100"
        @click="$router.back()"
      />
      <div class="text-xs font-bold text-gray-400 uppercase tracking-widest">
        Protocolo #{{ report?.id }}
      </div>
      <div class="w-10"></div>
    </header>

    <div v-if="loading" class="flex justify-center items-center h-screen">
      <q-spinner-ios color="primary" size="3em" />
    </div>

    <div v-else-if="report" class="pt-20 px-6 animate-fade-in-up">
      <div class="mb-6">
        <h1 class="text-3xl font-black text-gray-900 leading-tight mb-2">
          {{ report.type_id || 'Ocorrência' }}
        </h1>
        <p class="text-gray-500 text-sm">Registrado em {{ report.date }}</p>
      </div>

      <div
        class="rounded-3xl p-6 mb-8 text-white shadow-lg transform transition-all active:scale-95"
        :class="getStatusGradient(report.status)"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="bg-white/20 p-2 rounded-full backdrop-blur-sm">
            <q-icon :name="getStatusIcon(report.status)" size="sm" />
          </div>
          <span class="text-xs font-bold uppercase tracking-wider opacity-80">Status Atual</span>
        </div>
        <div class="text-2xl font-bold">
          {{ getStatusLabel(report.status) }}
        </div>
        <div class="text-sm opacity-90 mt-1">
          {{ getStatusDescription(report.status) }}
        </div>
        <div class="mt-4 h-1.5 bg-black/10 rounded-full overflow-hidden">
          <div class="h-full bg-white/40" :style="`width: ${(report.status / 3) * 100}%`"></div>
        </div>
      </div>

      <div class="mb-8">
        <div class="flex items-center justify-between mb-3 px-1">
          <h3 class="font-bold text-gray-800 text-lg">Evidências</h3>
          <span class="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded-full">{{
            report.photos?.length || 0
          }}</span>
        </div>

        <div
          v-if="report.photos?.length"
          class="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar"
        >
          <div
            v-for="(photo, idx) in report.photos"
            :key="idx"
            class="snap-center shrink-0 w-64 h-64 rounded-2xl overflow-hidden shadow-md relative group"
            @click="openImage(photo)"
          >
            <q-img :src="photo" class="w-full h-full object-cover" />
            <div
              class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"
            ></div>
          </div>
        </div>

        <div
          v-else
          class="h-32 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 bg-white"
        >
          <q-icon name="image_not_supported" size="md" />
          <span class="text-sm mt-2">Sem fotos</span>
        </div>
      </div>

      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <q-list separator>
          <q-item class="py-4">
            <q-item-section avatar>
              <div class="bg-blue-50 text-blue-600 p-3 rounded-xl">
                <q-icon name="place" />
              </div>
            </q-item-section>
            <q-item-section>
              <q-item-label caption class="mb-1 font-bold text-gray-400 uppercase text-[10px]"
                >Localização</q-item-label
              >
              <q-item-label class="font-semibold text-gray-800 leading-snug">
                {{ report.location?.address || 'Sem endereço' }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-if="report.description" class="py-4">
            <q-item-section avatar>
              <div class="bg-purple-50 text-purple-600 p-3 rounded-xl">
                <q-icon name="description" />
              </div>
            </q-item-section>
            <q-item-section>
              <q-item-label caption class="mb-1 font-bold text-gray-400 uppercase text-[10px]"
                >Descrição</q-item-label
              >
              <q-item-label class="text-gray-600 text-sm">
                "{{ report.description }}"
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <div class="fixed bottom-6 left-6 right-6 z-40">
      <q-btn
        class="w-full rounded-2xl py-4 shadow-xl shadow-blue-500/30 text-lg font-bold"
        color="primary"
        label="Gerenciar Status"
        no-caps
        push
        @click="mobileSheetOpen = true"
      />
    </div>

    <q-bottom-sheet v-model="mobileSheetOpen" class="rounded-t-3xl backdrop-blur-xl bg-white/90">
      <div class="p-6 pb-10">
        <div class="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>

        <h3 class="text-xl font-bold text-gray-900 mb-6 text-center">Atualizar Ocorrência</h3>

        <div class="space-y-3">
          <button
            v-for="opt in statusOptions"
            :key="opt.value"
            class="w-full p-4 rounded-2xl flex items-center gap-4 transition-all border-2"
            :class="
              tempStatus === opt.value
                ? `bg-${opt.color}-50 border-${opt.color}-500`
                : 'bg-white border-transparent hover:bg-gray-50'
            "
            @click="tempStatus = opt.value"
          >
            <div :class="`bg-${opt.color}-100 text-${opt.color}-600 p-3 rounded-full`">
              <q-icon :name="opt.icon" size="sm" />
            </div>
            <div class="flex-1 text-left">
              <div class="font-bold text-gray-900">{{ opt.label }}</div>
            </div>
            <div
              v-if="tempStatus === opt.value"
              :class="`w-4 h-4 rounded-full bg-${opt.color}-500`"
            ></div>
          </button>
        </div>

        <q-btn
          v-if="hasChanges"
          label="Confirmar"
          color="black"
          class="w-full mt-6 py-4 rounded-xl font-bold text-lg shadow-lg"
          :loading="updating"
          @click="confirmStatusChange"
        />
      </div>
    </q-bottom-sheet>

    <q-dialog v-model="imageDialog" maximized transition-show="fade" transition-hide="fade">
      <div class="bg-black/95 flex flex-col h-full relative backdrop-blur-md">
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
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import { ReportService } from 'src/services/ReportService';
import type { Report } from 'src/models/Report';

const route = useRoute();
const $q = useQuasar();

// Dados
const report = ref<Report | null>(null);
const loading = ref(true);
const updating = ref(false);
const tempStatus = ref<number | null>(null);
const mobileSheetOpen = ref(false);
const imageDialog = ref(false);
const selectedImage = ref('');

const statusOptions = [
  { label: 'Pendente', value: 1, color: 'red', icon: 'schedule' },
  { label: 'Em Análise', value: 2, color: 'orange', icon: 'engineering' },
  { label: 'Resolvido', value: 3, color: 'green', icon: 'check_circle' },
];

const hasChanges = computed(() => report.value && tempStatus.value !== report.value.status);

// Visual Helpers
const getStatusGradient = (s: number) =>
  ({
    1: 'bg-gradient-to-br from-red-500 to-red-600 shadow-red-500/40',
    2: 'bg-gradient-to-br from-orange-400 to-orange-500 shadow-orange-500/40',
    3: 'bg-gradient-to-br from-green-500 to-green-600 shadow-green-500/40',
  })[s] || 'bg-gray-500';

const getStatusIcon = (s: number) => statusOptions.find((o) => o.value === s)?.icon || 'help';
const getStatusLabel = (s: number) =>
  statusOptions.find((o) => o.value === s)?.label || 'Desconhecido';
const getStatusDescription = (s: number) =>
  ({
    1: 'Aguardando triagem inicial da equipe.',
    2: 'Técnicos avaliando a solução.',
    3: 'O problema foi solucionado com sucesso.',
  })[s] || '';

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

onMounted(fetchDetails);
</script>

<style>
/* Esconde barra de rolagem no carrossel, mas permite scroll */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Animação suave de entrada */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
