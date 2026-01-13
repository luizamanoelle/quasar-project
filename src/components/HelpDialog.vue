<template>
  <q-dialog v-model="model" persistent>
    <q-card style="width: 350px; max-width: 80vw">
      <q-bar class="bg-primary text-black">
        <div class="my-font2">Como saber a categoria?</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup />
      </q-bar>

      <q-card-section class="q-pa-md my-font3">
        <div v-for="item in instructions" :key="item.title" class="q-mb-md">
          <strong class="text-bold">{{ item.id }}. {{ item.title }}</strong
          ><br />
          <span class="text-caption text-grey-8">{{ item.subtitle }}</span
          ><br />
          <strong>O que abrange:</strong> {{ item.description }}
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
// defineModel facilita a sincronização do v-model entre pai e filho no Vue 3.4+
const model = defineModel<boolean | null>({ default: false });

const instructions = [
  {
    id: 1,
    title: 'Infraestrutura Urbana',
    subtitle: 'Foca na manutenção física das vias.',
    description: 'Buracos no asfalto, calçadas quebradas, bueiros e sinalização.',
  },
  {
    id: 2,
    title: 'Iluminação Pública',
    subtitle: 'Essencial para a segurança à noite.',
    description: 'Lâmpadas queimadas, postes caídos ou trechos às escuras.',
  },
  {
    id: 3,
    title: 'Limpeza e Meio Ambiente',
    subtitle: 'Saúde pública e estética da cidade.',
    description: 'Lixo irregular, entulho, poda de árvores e mato alto.',
  },
  {
    id: 4,
    title: 'Saneamento e Água',
    subtitle: 'Envolve a rede de águas e esgoto.',
    description: 'Vazamentos, refluxo de esgoto ou falta de abastecimento.',
  },
  {
    id: 5,
    title: 'Mobilidade e Trânsito',
    subtitle: 'Fluxo de veículos e pedestres.',
    description: 'Semáforos estragados, carros abandonados ou ciclovias obstruídas.',
  },
];
</script>
