<template>
  <q-dialog v-model="model" persistent>
    <q-card style="width: 350px; max-width: 80vw">
      <q-bar class="bg-primary text-black q-pa-lg">
        <div>{{ $t('categoryHelp.title') }}</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup />
      </q-bar>

      <q-card-section class="q-pa-lg my-font3">
        <div v-for="item in instructions" :key="item.title" class="q-mb-md">
          <strong class="text-bold">{{ item.id }}. {{ item.title }}</strong
          ><br />
          <span class="text-caption text-grey-8">{{ item.subtitle }}</span
          ><br />
          <strong>{{ $t('categoryHelp.cover') }}</strong> {{ item.description }}
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
// defineModel facilita a sincronização do v-model entre pai e filho no Vue 3.4+
const model = defineModel<boolean | null>({ default: false });
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const instructions = [
  {
    id: 1,
    title: `${t('categoryHelp.items.infrastructure.title')}`,
    subtitle: `${t('categoryHelp.items.infrastructure.subtitle')}`,
    description: `${t('categoryHelp.items.infrastructure.description')}`,
  },
  {
    id: 2,
    title: `${t('categoryHelp.items.cleaning.title')}`,
    subtitle: `${t('categoryHelp.items.cleaning.subtitle')}`,
    description: `${t('categoryHelp.items.cleaning.description')}`,
  },
  {
    id: 3,
    title: `${t('categoryHelp.items.lighting.title')}`,
    subtitle: `${t('categoryHelp.items.lighting.subtitle')}`,
    description: `${t('categoryHelp.items.lighting.description')}`,
  },
  {
    id: 4,
    title: `${t('categoryHelp.items.sanitation.title')}`,
    subtitle: `${t('categoryHelp.items.sanitation.subtitle')}`,
    description: `${t('categoryHelp.items.sanitation.description')}`,
  },
  {
    id: 5,
    title: `${t('categoryHelp.items.traffic.title')}`,
    subtitle: `${t('categoryHelp.items.traffic.subtitle')}`,
    description: `${t('categoryHelp.items.traffic.description')}`,
  },
];
</script>
