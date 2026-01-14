<template>
  <!--onda de fundo-->
  <q-layout view="lHh Lpr lFf">
    <!--q page é usado p nao criar barra de rolagem e alinhar c os headers e footers do quasar-->
    <q-page-container>
      <q-page class="column no-wrap overflow-hidden q-pa-md">
        <div class="flex items-center justify-between full-width">
          <q-btn flat color="gray-7" icon="arrow_back" to="/dashboard" size="18px" />
          <span class="my-font tracking-normal text-h5"> Reportar Problema </span>
          <q-btn flat color="grey-7" icon="info" to="/dashboard" size="18px" />
        </div>

        <q-separator color="black" inset class="full-width q-my-md q-col-gutter-md" />

        <GeoLocation />
        <div class="text-center items-center full-width text-grey-9 my-font3">
          <p>
            {{ locationStore.address.road }}, {{ locationStore.address.houseNumber }} -
            {{ locationStore.address.neighbourhood }}
          </p>
        </div>
        <div>
          <span class="my-font2 tracking-normal text-h6 q-pa-md">Relate seu problema:</span>
          <div>
            <q-btn
              flat
              no-caps
              size="12px"
              color="grey-7"
              icon="help"
              label="Não sei em qual categoria se encaixa meu problema!"
              @click="lightDialog = true"
            />
          </div>
          <help-dialog v-model="lightDialog" />
        </div>

        <!--row de botões pra selecionar a categorias do report-->
        <div class="row q-col-gutter-md flex-center">
          <!--opção em problem-->
          <div v-for="opt in problemOptions" :key="opt.value" class="col">
            <q-btn
              :color="reportForm.type === opt.value ? 'grey-7' : opt.color"
              :text-color="reportForm.type === opt.value ? 'white' : 'grey-9'"
              class="full-width q-py-xs shadow-2"
              rounded
              unelevated
              no-caps
              @click="reportForm.type = opt.value"
            >
              <div class="column items-center q-pt-md">
                <!--separar os icons do botao pra conseguir ajustar individualmente o tamanho (fica padrao no btn)-->
                <q-icon :name="opt.icon" size="30px" class="q-mb-md" />
              </div>
            </q-btn>
            <!--separar o texto tb pra nao ficar dentro do btn-->
            <div class="my-font3 q-mt-xs text-center text-h8">{{ opt.label }}</div>
          </div>
        </div>

        <div class="q-mt-md">
          <div class="flex justify-between items-center">
            <q-btn
              color="grey-4"
              text-color="grey-8"
              icon="add_a_photo"
              no-caps
              class="my-font2 text-h6 full-width"
              to="/cam"
            >
              <span class="q-ml-sm">Tire foto da ocorrência</span>
            </q-btn>
          </div>
        </div>
        <div class="q-mt-md">
          <span class="my-font2 tracking-normal text-subtitle1"
            >Descrição do Problema (não obrigatória):</span
          >
          <q-input
            outlined
            bottom-slots
            v-model="text"
            placeholder="Ex: 'O buraco está escondido por uma poça dágua'"
            counter
            :dense="dense"
          >
            <template v-slot:append>
              <q-icon name="close" @click="text = ''" class="cursor-pointer" />
            </template>
          </q-input>
        </div>

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

        <q-btn
          no-caps
          text-color="grey-9"
          color="primary"
          class="full-width q-mt-md py-md font-bold"
          rounded
        >
          <span class="q-ml-md text-h5 my-font2">Enviar Ocorrência</span></q-btn
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

const locationStore = useLocationStore();
const lightDialog = ref(false);
const dense = ref(false);
const text = ref('');

const reportForm = ref({
  type: '', //tipo de ocorrencia
  photos: [] as string[], // Array de Base64 das fotos tiradas
  description: '', // QInput opcional
  location: {
    lat: 0,
    lng: 0,
    address: '',
  },
});

const problemOptions = [
  { label: 'Infraestrutura', value: '1', icon: 'build', color: 'warning' },
  { label: 'Limpeza', value: '2', icon: 'ecleaning_services', color: 'positive' },
  { label: 'Iluminação', value: '3', icon: 'flash_on', color: 'accent' },
  { label: 'Saneamento', value: '4', icon: 'water', color: 'info' },
  { label: 'Trânsito', value: '5', icon: 'car_crash', color: 'warning' },
];
</script>
