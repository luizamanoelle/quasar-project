<template>
  <q-page class="bg-slate-50 p-4 md:p-10">
    <q-btn
      flat
      icon="arrow_back"
      label="Voltar"
      class="text-blue-600 mb-6 lowercase first-letter:uppercase"
      @click="$router.back()"
    />

    <div v-if="report" class="max-w-4xl mx-auto flex flex-col gap-6">
      <q-card flat class="rounded-2xl border border-slate-200 overflow-hidden">
        <div class="p-4 border-b border-slate-100 font-bold text-slate-700">
          Evidências do Local
        </div>

        <div class="flex flex-wrap gap-4 p-4">
          <div
            v-for="(img, index) in report.photos"
            :key="index"
            class="w-full md:w-64 h-48 rounded-lg overflow-hidden border border-slate-200"
          >
            <q-img :src="img" class="w-full h-full object-cover" />
          </div>
          <div v-if="!report.photos?.length" class="text-slate-400 italic">
            Nenhuma imagem disponível.
          </div>
        </div>
      </q-card>

      <q-card flat class="rounded-2xl border border-slate-200 p-6">
        <div class="flex justify-between items-start">
          <div class="space-y-1">
            <h1 class="text-2xl font-black text-slate-900">{{ report.type }}</h1>
            <p class="text-slate-500 text-sm">Protocolo: #{{ report.id }}</p>
          </div>
          <q-badge :color="getStatusColor(report.status)" class="px-3 py-1 font-bold">
            {{ getStatusLabel(report.status) }}
          </q-badge>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div class="flex items-center gap-3">
            <q-icon name="event" size="sm" class="text-slate-400" />
            <div>
              <p class="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                Data de Registro
              </p>
              <p class="text-slate-700 font-medium">{{ report.date }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <q-icon name="pin_drop" size="sm" class="text-slate-400" />
            <div>
              <p class="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Endereço</p>
              <p class="text-slate-700 font-medium">
                {{ report.location?.address || 'Não informado' }}
              </p>
            </div>
          </div>
        </div>
      </q-card>

      <q-card flat class="rounded-2xl border border-slate-200 p-6">
        <h3 class="text-slate-800 font-bold mb-4">Gerenciar Progresso</h3>

        <div class="flex flex-col gap-4">
          <div class="grid grid-cols-3 gap-2">
            <q-btn
              v-for="opt in statusOptions"
              :key="opt.value"
              flat
              :label="opt.label"
              :class="[
                'rounded-lg border-2 transition-all',
                tempStatus === opt.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-100 bg-slate-50',
              ]"
              @click="tempStatus = opt.value"
            />
          </div>

          <q-btn
            v-if="tempStatus !== report.status"
            label="Confirmar Alteração"
            color="primary"
            unelevated
            class="py-3 rounded-xl font-bold"
            :loading="updating"
            @click="confirmStatusChange"
          />
        </div>
      </q-card>
    </div>

    <q-inner-loading :showing="loading">
      <q-spinner-tail color="primary" size="3em" />
    </q-inner-loading>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';

interface Ocorrencia {
  id: number;
  type: string;
  status: number;
  photos?: string[];
  date: string;
  location?: { address: string };
}

const route = useRoute();
const $q = useQuasar();

const report = ref<Ocorrencia | null>(null);
const loading = ref(true);
const updating = ref(false);

// Estado temporário para o status antes de confirmar
const tempStatus = ref<number | null>(null);

const statusOptions = [
  { label: 'Pendente', value: 1 },
  { label: 'Em Análise', value: 2 },
  { label: 'Resolvido', value: 3 },
];

const fetchDetails = async () => {
  try {
    const res = await api.get(`/reports/${String(route.params.id)}`);
    report.value = res.data;
    tempStatus.value = res.data.status;
  } catch (e) {
    console.error('Erro ao carregar detalhes', e);
  } finally {
    loading.value = false;
  }
};

const confirmStatusChange = async () => {
  if (!tempStatus.value || !report.value) return;

  updating.value = true;
  try {
    await api.patch(`/reports/${report.value.id}`, {
      status: tempStatus.value,
    });

    // Atualiza o objeto real após o sucesso
    report.value.status = tempStatus.value;

    $q.notify({
      type: 'positive',
      message: 'Status atualizado com sucesso!',
      position: 'bottom',
    });
  } catch (e) {
    console.error('Erro ao buscar ocorrências', e);
    $q.notify({ type: 'negative', message: 'Erro ao salvar alteração.' });
  } finally {
    updating.value = false;
  }
};

const getStatusColor = (s: number) => ({ 1: 'negative', 2: 'warning', 3: 'positive' })[s] || 'grey';
const getStatusLabel = (s: number) =>
  statusOptions.find((o) => o.value === s)?.label || 'Desconhecido';

onMounted(fetchDetails);
</script>
