<template>
  <!--onda de fundo-->
  <q-layout view="lHh Lpr lFf">
    <!--q page é usado p nao criar barra de rolagem e alinhar c os headers e footers do quasar-->
    <q-page-container>
      <q-page class="column no-wrap overflow-hidden q-pa-md">
        <!--header-->
        <div class="text-center q-pt-lg">
          <span class="my-font tracking-normal text-h5">Olá, Luiza</span>
          <p class="text-grey-7">Hoje {{ dia }} {{ month }}</p>
        </div>

        <q-separator color="black" inset class="full-width q-my-md" />

        <!--mapa-->
        <GeoLocation />
        <!--localização---->
        <div class="text-center items-center full-width text-weight-bold q-my-md text-h5">
          <p>Você está em {{ locationStore.address.city }}</p>
        </div>

        <!--loading-->

        <!--cards-->
        <div class="row q-col-gutter-sm q-mt-xs">
          <div v-if="loading" class="flex flex-center q-pa-lg">
            <q-spinner-dots color="primary" size="40px" />
          </div>

          <template v-else-if="ocorrencias.length > 0">
            <div v-for="item in ocorrencias" :key="item.id" class="col-6">
              <q-card
                v-for="item in ocorrencias"
                :key="item.id"
                flat
                bordered
                class="rounded-2xl overflow-hidden border-gray-100 bg-white"
              >
                <q-img
                  v-if="item.imagens && item.imagens.length > 0"
                  :src="item.imagens[0]"
                  height="160px"
                >
                </q-img>
                <div class="absolute right-2 bottom-25 bg-transparent p-0">
                  <q-badge
                    :color="getStatusColor(item.status)"
                    class="font-bold rounded text-black"
                  >
                    {{ item.status === 1 ? 'ABERTO' : 'RESOLVIDO' }}
                  </q-badge>
                </div>

                <q-card-section class="p-1">
                  <div class="flex flex-col">
                    <span class="text-caption uppercase tracking-wider text-h7">
                      {{ getTipoNome(item.tipo_id) }}
                    </span>

                    <div class="flex items-center text-weight-light">
                      <span class="text-xs">
                        {{ item.localizacao?.endereco || 'Endereço não disponível' }}
                      </span>
                    </div>
                  </div>
                </q-card-section>

                <q-card-actions class="q-ml-sm px-4 py-5 flex justify-between items-center">
                  <span class="text-xs text-caption">
                    {{ item.data_criacao }}
                  </span>
                  <q-btn
                    flat
                    color="primary"
                    label="Ver mais"
                    no-caps
                    icon-right="chevron_right"
                    class="text-sm font-bold"
                  />
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

interface Ocorrência {
  id: string | number;
  tipo_id: string | number;
  localizacao?: {
    endereco: string;
    bairro?: string;
    lat?: number;
    lng?: number;
  };
  imagens?: string[];
  data_criacao: string;
  status: number;
}

const locationStore = useLocationStore();

const dataAtual = new Date();
const dia = dataAtual.getDate();
const month = dataAtual.toLocaleDateString('pt-BR', { month: 'short' });
const ocorrencias = ref<Ocorrência[]>([]);
const loading = ref(true);

const fetchOcorrencias = async () => {
  try {
    loading.value = true;
    const res = await api.get('/ocorrencias');
    ocorrencias.value = res.data;
  } catch (error) {
    console.error('Erro ao buscar ocorrências', error);
  } finally {
    loading.value = false;
  }
};

const getStatusColor = (status: number) => {
  switch (status) {
    case 1:
      return 'negative'; //aberto
    case 2:
      return 'primary'; //analise
    case 3:
      return 'positive'; //concluido
  }
};

const getTipoNome = (tipoID: number | string) => {
  const tipos: Record<string, string> = {
    '1': 'Infraestrutura',
    '2': 'Limpeza',
    '3': 'Iluminação',
    '4': 'Saneamento',
    '5': 'Trânsito',
  };
  return tipos[String(tipoID)] || 'Nome';
};

onMounted(() => {
  void fetchOcorrencias();
});
</script>
