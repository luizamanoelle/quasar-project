<template>
  <q-layout view="hHh lpR fFf" class="bg-gray-50">
    <q-header bordered class="bg-white text-gray-800 border-gray-200 h-16 flex items-center">
      <q-toolbar>
        <div class="flex items-center justify-between w-full">
          <!--usuario-->
          <div class="flex items-center">
            <q-btn-dropdown flat no-caps aria-label="Abrir opção de sair">
              <template v-slot:label>
                <div class="flex items-center">
                  <q-avatar size="34px" class="bg-purple-100 text-primary font-bold">
                    {{ userInitial }}
                  </q-avatar>
                </div>
              </template>

              <!--sair-->
              <q-list class="border border-gray-100 shadow-lg rounded">
                <q-item clickable v-close-popup @click="handleLogout">
                  <q-item-section avatar>
                    <q-icon name="logout" size="xs" />
                  </q-item-section>
                  <q-item-section>
                    <span class="text-sm font-medium">{{ $t('layout.logout') }}</span>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>

          <!--data-->
          <div class="text-gray-700 text-sm font-medium">
            <span class="capitalize">{{ currentDate }}</span>
          </div>

          <!--refresh-->
          <q-btn
            flat
            aria-label="Atualizar a página"
            round
            color="grey-7"
            icon="refresh"
            @click="handleRefresh"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/auth';
import { useI18n } from 'vue-i18n';

const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const { t } = useI18n();

//data formatada
const currentDate = computed(() => {
  const date = new Date();
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
  });
});

//pega só a inicial do usuario
const userInitial = computed(() => {
  const name = authStore.user?.name || 'A';
  //uso do charAt pra pegar só a inicial
  return name.charAt(0).toUpperCase();
});

//reload na page
const handleRefresh = () => {
  window.location.reload();
};

//logout
const handleLogout = () => {
  $q.dialog({
    title: t('layout.logout'),
    message: t('layout.confirm'),
    ok: { label: t('common.confirm'), flat: true, color: 'primary' },
    cancel: { label: t('common.cancel'), flat: true, color: 'grey-8' },
    persistent: true,
  }).onOk(() => {
    authStore.logout();
    void router.push('/login');

    $q.notify({
      type: 'positive',
      message: t('layout.success'),
      position: 'top',
      timeout: 2000,
    });
  });
};
</script>
