<template>
  <!--onda de fundo-->
  <q-layout view="lHh Lpr lFf">
    <!--q page é usado p nao criar barra de rolagem e alinhar c os headers e footers do quasar-->
    <q-page-container>
      <q-page class="column no-wrap overflow-hidden q-pa-md q-mt-md">
        <!--header da pagina-->
        <div class="flex items-center justify-between full-width">
          <q-btn flat color="grey-9" icon="arrow_back" to="/dashboard" size="15px" />
          <span class="text-weight-regular tracking-normal text-h6"> Reportar Problema </span>
          <q-btn flat color="grey-9" icon="info" to="/dashboard" size="15px" />
        </div>

        <!--separador-->
        <q-separator color="grey-7" inset class="full-width q-my-md q-col-gutter-md" size="2px" />

        <!--mapa-->
        <GeoLocation />
        <div class="text-center items-center full-width text-grey-9 my-font3">
          <p>
            {{ locationStore.address.road }}, {{ locationStore.address.houseNumber }} -
            {{ locationStore.address.neighbourhood }}
          </p>
        </div>
        <!--titulo-->
        <div>
          <span class="text-weight-medium tracking-normal text-h6">Relate seu problema:</span>
        </div>

        <!--help-->
        <div>
          <q-btn
            class="text-weight-light"
            flat
            style="margin-left: -15px"
            no-caps
            size="11px"
            color="grey-8"
            icon="help"
            label="Não sei em qual categoria se encaixa meu problema!"
            @click="lightDialog = true"
          />
        </div>
        <help-dialog v-model="lightDialog" />

        <!--row de botões pra selecionar a categorias do report-->
        <div class="row q-col-gutter-md flex-center">
          <!--opção em problem-->
          <div v-for="opt in problemOptions" :key="opt.value" class="col">
            <q-btn
              :color="opt.color"
              text-color="grey-9"
              class="full-width shadow-3 transition-opacity duration-300"
              rounded
              :class="{
                'opacity-30': reportForm.type !== null && reportForm.type !== opt.value,
              }"
              @click="reportForm.type = opt.value"
            >
              <div class="column items-center q-pt-md">
                <!--separar os icons do botao pra conseguir ajustar individualmente o tamanho (fica padrao no btn)-->
                <q-icon :name="opt.icon" size="24px" class="q-mb-md" />
              </div>
            </q-btn>
            <!--separar o texto tb pra nao ficar dentro do btn-->
            <div
              class="text-weight-regular q-mt-xs text-center text-[11.4px] transition-opacity duration-300"
              :class="{ 'opacity-30': reportForm.type !== null && reportForm.type !== opt.value }"
            >
              {{ opt.label }}
            </div>
          </div>
        </div>

        <!--botao da foto-->
        <div class="q-mt-md">
          <q-btn
            style="border-radius: 15px"
            color="grey-3"
            text-color="grey-7"
            icon="add_a_photo"
            no-caps
            class="text-weight-medium text-h6 full-width"
            to="/cam"
          >
            <span class="q-ml-sm">Tire foto da ocorrência</span>
          </q-btn>
        </div>

        <!--descrição-->
        <div class="q-mt-md">
          <span class="text-weight-regular tracking-normal">Descreva o problema</span>
          <div class="q-mt-sm">
            <q-input
              outlined
              bottom-slots
              v-model="text"
              type="textarea"
              rows="3"
              rounded
              placeholder="Ex: 'O buraco está escondido por uma poça dágua'"
              counter
              :dense="dense"
            >
              <template v-slot:append>
                <q-icon name="close" @click="text = ''" class="cursor-pointer" />
              </template>
            </q-input>
          </div>
        </div>

        <!--localização-->
        <q-card flat bordered class="q-mt-md">
          <q-item>
            <q-item-section avatar>
              <q-icon name="place" color="red" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Localização aproximada</q-item-label>
              <q-item-label caption
                >{{ locationStore.address.road }}, {{ locationStore.address.houseNumber }} -
                {{ locationStore.address.neighbourhood }}</q-item-label
              >
            </q-item-section>
            <q-item-section side>
              <q-btn flat round icon="edit" />
            </q-item-section>
          </q-item>
        </q-card>

        <!--enviar-->
        <q-btn
          @click="submitReport"
          no-caps
          text-color="black"
          color="primary"
          class="full-width q-mt-md py-md"
          rounded
        >
          <span class="q-ml-md text-h6 text-weight-bold">Enviar Ocorrência</span></q-btn
        >

        <!--ordem de hierarquia das page-->
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GeoLocation from 'src/components/GeoLocation.vue';
import { useLocationStore } from 'src/stores/location';
import HelpDialog from 'src/components/HelpDialog.vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const locationStore = useLocationStore();
const lightDialog = ref(false);
const dense = ref(false);
const text = ref('');

interface ReportForm {
  type: string | null;
  description?: string;
}

const reportForm = ref<ReportForm>({
  type: null, //tipo de ocorrencia
});

const problemOptions = [
  { label: 'Infraestrutura', value: '1', icon: 'build', color: 'warning' },
  { label: 'Limpeza', value: '2', icon: 'delete_outline', color: 'positive' },
  { label: 'Iluminação', value: '3', icon: 'flash_on', color: 'accent' },
  { label: 'Saneamento', value: '4', icon: 'water_drop', color: 'info' },
  { label: 'Trânsito', value: '5', icon: 'car_crash', color: 'warning' },
];

async function submitReport() {
  try {
    const payload = {
      usuario_id: 1,
      tipo_id: reportForm.value.type,
      descricao: text.value,
      localização: {
        endereco: `${locationStore.address.road}, ${locationStore.address.houseNumber}`,
        bairro: locationStore.address.neighbourhood,
        lat: locationStore.address.lat,
        lng: locationStore.address.lng,
      },
      data_criacao: new Date().toLocaleDateString('pt-BR'),
      status: 1,
    };
    //post
    await api.post('/ocorrencias', payload);

    $q.notify({
      color: 'positive',
      message: 'Ocorrência enviada com sucesso!',
      icon: 'check',
    });
  } catch {
    $q.notify({
      color: 'negative',
      message: 'Erro ao registrar!',
      icon: 'error',
    });
  }
}
</script>
