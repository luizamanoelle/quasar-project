<template>
  <q-toggle
    v-model="darkMode"
    checked-icon="las la-moon"
    unchecked-icon="las la-sun"
    color="primary"
    size="lg"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';

defineOptions({ name: 'DarkModeToggle' });

const darkMode = ref(false);
const $q = useQuasar();

watch(darkMode, (darkMode) => {
  $q.dark.set(darkMode);
});
</script>
