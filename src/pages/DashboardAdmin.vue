<template>
  <q-page class="bg-gray-50 p-4 md:p-6">
    <!--infos-->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <!--novos-->
      <div class="p-3 bg-blue-100 rounded-lg">
        <div class="text-[10px] uppercase font-bold mb-1">{{ $t('admin.news') }}</div>
        <div class="flex items-end justify-between">
          <span class="text-2xl font-bold">{{ stats.todayCount }}</span>
          <q-icon name="today" size="xs" color="blue-3" />
        </div>
      </div>

      <!--críticos-->
      <div class="bg-red-100 p-3 rounded-lg">
        <div class="text-[10px] uppercase font-bold text-red-500 mb-1">
          {{ $t('admin.critical') }}
        </div>
        <div class="flex items-end justify-between">
          <span class="text-2xl font-bold">{{ stats.overdueCount }}</span>
          <q-icon name="priority_high" size="xs" color="red-3" />
        </div>
      </div>

      <!--em analise-->
      <div class="bg-orange-100 p-3 rounded-lg">
        <div class="text-[10px] uppercase font-bold text-orange-500 mb-1">
          {{ $t('admin.analysis') }}
        </div>
        <div class="flex items-end justify-between">
          <span class="text-2xl font-bold">{{ stats.inProgressCount }}</span>
          <q-icon name="hourglass_empty" size="xs" color="orange-3" />
        </div>
      </div>

      <!--total-->
      <div class="bg-gray-200 p-3 rounded-lg dark:text-red-500">
        <div class="text-[10px] uppercase font-bold text-gray-500 mb-1">
          {{ $t('admin.total') }}
        </div>
        <div class="flex items-end justify-between">
          <span class="text-2xl font-bold">{{ reports.length }}</span>
          <q-icon name="inventory" size="xs" color="gray-3" />
        </div>
      </div>
    </div>

    <!--status-->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-1 flex flex-col gap-6">
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

        <!--calendario-->
        <div class="bg-white p-4 rounded-2xl shadow-sm flex justify-cente">
          <q-date v-model="dateFilter" minimal flat today-btn color="primary" class="full-width" />
        </div>
      </div>

      <!--tabela-->
      <div class="lg:col-span-2">
        <q-table
          flat
          :rows="filteredReports"
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
                aria-label="$t('admin.view')"
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
import { useI18n } from 'vue-i18n';

const router = useRouter();
const { t } = useI18n();

const reports = ref<Report[]>([]);
const loading = ref(false);
const dateFilter = ref(null);

const filteredReports = computed(() => {
  if (!dateFilter.value) return reports.value;

  return reports.value.filter((r) => {
    const rDate = parseDate(r.date);
    const rString = date.formatDate(rDate, 'YYYY/MM/DD');
    return rString === dateFilter.value;
  });
});

const pagination = ref({
  rowsPerPage: 0,
  sortBy: 'date',
  descending: true,
});

const parseDate = (dateStr: string) => {
  //pega a data no formato padrao br se n tiver assim, coloca
  const extracted = date.extractDate(dateStr, 'DD/MM/YYYY');
  //se n conseguir pega no padrao eua
  return extracted.toString() === 'Invalid Date' ? new Date(dateStr) : extracted;
};

//cards de infos
const stats = computed(() => {
  const now = new Date();

  return {
    //hoje
    todayCount: reports.value.filter((r) => {
      //parsedate reconhece a data em varios formatos
      const rDate = parseDate(r.date);
      return date.isSameDate(rDate, now, 'days');
    }).length,

    //críticos
    overdueCount: reports.value.filter((r) => {
      if (r.status !== 1) return false; //se for pendente
      const rDate = parseDate(r.date);
      const diff = date.getDateDiff(now, rDate, 'days');
      return diff > 3; //se a diferença das datas for maior q 3 dias
    }).length,

    //em progresso
    inProgressCount: reports.value.filter((r) => r.status === 2).length,
  };
});

//tabela de infos
const statusChartData = computed(() => {
  const total = reports.value.length || 1;
  //recebe o status e retorna a quantidade
  const countByStatus = (s: number) => reports.value.filter((r) => r.status === s).length;

  return [
    {
      label: `${t('admin.status.1')}`,
      value: countByStatus(1),
      percent: countByStatus(1) / total,
      color: 'negative',
    },
    {
      label: `${t('admin.status.2')}`,
      value: countByStatus(2),
      percent: countByStatus(2) / total,
      color: 'warning',
    },
    {
      label: `${t('admin.status.3')}`,
      value: countByStatus(3),
      percent: countByStatus(3) / total,
      color: 'positive',
    },
  ];
});

//colunas da tabela
const columns = [
  {
    name: 'date',
    align: 'left' as const,
    label: `${t('admin.columns.date')}`,
    field: 'date',
    sortable: true,
  },
  {
    name: 'type',
    align: 'left' as const,
    label: `${t('admin.columns.type')}`,
    field: 'type_id',
    sortable: true,
  },
  {
    name: 'status',
    align: 'left' as const,
    label: `${t('admin.columns.status')}`,
    field: 'status',
    sortable: true,
  },
  { name: 'action', align: 'right' as const, label: '', field: 'id' },
];

//carregamento da tabela
const loadDashboard = async () => {
  loading.value = true;
  try {
    reports.value = await ReportService.getAll();
  } catch (e) {
    console.error('Error', e);
  } finally {
    loading.value = false;
  }
};

//abrir o reportview
const goToDetails = (id: number) => void router.push(`/admin/report/${id}`);

onMounted(loadDashboard);
</script>
