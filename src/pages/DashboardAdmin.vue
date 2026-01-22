<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <div class="m-6 md:pt-10">
          <div class="text-center">
            <span class="text-2xl md:text-4xl"
              >{{ $t('dashboard.greeting') }}, {{ authStore.user?.name || 'User' }}</span
            >
            <p class="text-grey-7">{{ $t('dashboard.today') }} {{ day }} {{ month }}</p>
          </div>

          <q-separator color="black" inset class="full-width q-my-md" />

          <div>
            <q-table
              flat
              bordered
              title="Ocorrências"
              dense
              :rows="occurrence"
              :columns="columns"
              row-key="id"
              :loading="loading"
            >
              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <q-badge :color="getStatusColor(props.value)">
                    {{ getStatusLabel(props.value) }}
                  </q-badge>
                </q-td>
              </template>

              <template v-slot:body-cell-action="props">
                <q-td :props="props">
                  <q-btn
                    flat
                    round
                    color="primary"
                    icon="visibility"
                    @click="goToDetails(props.row.id)"
                  />
                </q-td>
              </template>
            </q-table>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth';
import { onMounted, ref } from 'vue';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';

interface Coluna {
  name: string;
  label: string;
  field: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}

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

const router = useRouter();
const authStore = useAuthStore();

const today = new Date();
const day = today.getDate();
const month = today.toLocaleDateString(undefined, { month: 'short' });

const loading = ref(false);
const occurrence = ref<Ocorrência[]>([]);

const goToDetails = (id: number) => {
  void router.push(`/admin/report/${id}`);
};

const columns: Coluna[] = [
  { name: 'id', align: 'left', label: 'id', field: 'id' },
  { name: 'type', label: 'Categoria', field: 'tipo_id', align: 'left' },
  { name: 'status', label: 'Status', field: 'status', align: 'center' },
  { name: 'data', label: 'Data', field: 'data_criacao', align: 'center' },
  { name: 'action', label: 'Ações', field: 'id', align: 'right' },
];

const fetchReport = async () => {
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

const getStatusColor = (status: number) =>
  ({ 1: 'negative', 2: 'warning', 3: 'positive' })[status] || 'grey';

const getStatusLabel = (status: number) => {
  const labels: Record<number, string> = { 1: 'Pendente', 2: 'Em análise', 3: 'Resolvido' };
  return labels[status] || 'Desconhecido';
};

onMounted(() => {
  void fetchReport();
});
</script>
