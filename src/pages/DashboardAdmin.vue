<template>
  <q-page class="bg-gray-50 p-4 md:p-6">
    <!--infos-->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <!--novos-->
      <div class="p-3 bg-blue-100 rounded-lg">
        <div class="text-[10px] uppercase font-bold mb-1">Novos Hoje</div>
        <div class="flex items-end justify-between">
          <span class="text-2xl font-bold">{{ stats.todayCount }}</span>
          <q-icon name="today" size="xs" color="blue-3" />
        </div>
      </div>

      <!--críticos-->
      <div class="bg-red-100 p-3 rounded-lg">
        <div class="text-[10px] uppercase font-bold text-red-500 mb-1">Críticos (+3 dias)</div>
        <div class="flex items-end justify-between">
          <span class="text-2xl font-bold">{{ stats.overdueCount }}</span>
          <q-icon name="priority_high" size="xs" color="red-3" />
        </div>
      </div>

      <!--em analise-->
      <div class="bg-orange-100 p-3 rounded-lg">
        <div class="text-[10px] uppercase font-bold text-orange-500 mb-1">Em Análise</div>
        <div class="flex items-end justify-between">
          <span class="text-2xl font-bold">{{ stats.inProgressCount }}</span>
          <q-icon name="hourglass_empty" size="xs" color="orange-3" />
        </div>
      </div>

      <!--total-->
      <div class="bg-gray-200 p-3 rounded-lg">
        <div class="text-[10px] uppercase font-bold text-gray-500 mb-1">Total Geral</div>
        <div class="flex items-end justify-between">
          <span class="text-2xl font-bold">{{ reports.length }}</span>
          <q-icon name="inventory" size="xs" color="gray-3" />
        </div>
      </div>
    </div>

    <!--status-->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="bg-white p-4 rounded-lg lg:col-span-1">
        <div class="space-y-4">
          <div v-for="s in statusChartData" :key="s.label">
            <div class="flex justify-between text-xs mb-1">
              <span>{{ s.label }}</span>
              <span class="font-bold">{{ s.value }}</span>
            </div>
            <q-linear-progress :value="s.percent" :color="s.color" rounded size="8px" />
          </div>
        </div>
      </div>

      <!--tabela-->
      <div class="lg:col-span-2">
        <q-table
          flat
          :rows="reports"
          :columns="columns"
          row-key="id"
          :loading="loading"
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
          virtual-scroll
        >
          <!--reportview-->
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn
                flat
                round
                size="sm"
                color="primary"
                icon="launch"
                @click="goToDetails(props.row.id)"
              />
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ReportService } from 'src/services/ReportService';
import type { Report } from 'src/models/Report';
import { date } from 'quasar';

const router = useRouter();

const reports = ref<Report[]>([]);
const loading = ref(false);

const pagination = ref({
  rowsPerPage: 0,
  sortBy: 'date',
  descending: true,
});

// --- Correção da Lógica de Datas ---
const parseDate = (dateStr: string) => {
  // Tenta extrair DD/MM/YYYY (comum no Brasil)
  // Se o formato no banco for diferente (ex: YYYY-MM-DD), o extractDate ajusta
  const extracted = date.extractDate(dateStr, 'DD/MM/YYYY');
  // Se falhar (retornar data inválida), tenta criar new Date direto
  return extracted.toString() === 'Invalid Date' ? new Date(dateStr) : extracted;
};

const stats = computed(() => {
  const now = new Date();

  return {
    todayCount: reports.value.filter((r) => {
      const rDate = parseDate(r.date);
      return date.isSameDate(rDate, now, 'days');
    }).length,

    overdueCount: reports.value.filter((r) => {
      if (r.status !== 1) return false; // Apenas pendentes
      const rDate = parseDate(r.date);
      const diff = date.getDateDiff(now, rDate, 'days');
      return diff > 3; // Mais de 3 dias de diferença
    }).length,

    inProgressCount: reports.value.filter((r) => r.status === 2).length,
  };
});

const statusChartData = computed(() => {
  const total = reports.value.length || 1;
  const countByStatus = (s: number) => reports.value.filter((r) => r.status === s).length;

  return [
    {
      label: 'Pendentes',
      value: countByStatus(1),
      percent: countByStatus(1) / total,
      color: 'negative',
    },
    {
      label: 'Em Análise',
      value: countByStatus(2),
      percent: countByStatus(2) / total,
      color: 'warning',
    },
    {
      label: 'Resolvidos',
      value: countByStatus(3),
      percent: countByStatus(3) / total,
      color: 'positive',
    },
  ];
});

const columns = [
  { name: 'date', align: 'left' as const, label: 'Data', field: 'date', sortable: true },
  { name: 'type', align: 'left' as const, label: 'Tipo', field: 'type_id', sortable: true },
  { name: 'status', align: 'left' as const, label: 'Status', field: 'status', sortable: true },
  { name: 'action', align: 'right' as const, label: '', field: 'id' },
];

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

const goToDetails = (id: number) => void router.push(`/admin/report/${id}`);

onMounted(loadDashboard);
</script>
