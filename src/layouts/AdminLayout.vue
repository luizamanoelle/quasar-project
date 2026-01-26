<template>
  <q-layout view="hHh lpR fFf" class="bg-gray-50">
    <q-header bordered class="bg-white text-gray-800 border-gray-200 h-16 flex items-center">
      <q-toolbar>
        <div class="flex items-center gap-4 justify-between w-full">
          <div class="flex items-center gap-2">
            <q-btn-dropdown
              flat
              no-caps
              dense
              class="text-gray-700 hover:text-primary transition-colors"
            >
              <template v-slot:label>
                <div class="flex items-center gap-2">
                  <q-avatar size="32px" class="bg-blue-100 text-blue-600 font-bold shadow-sm">
                    {{ userInitial }}
                  </q-avatar>
                  <div class="hidden md:block text-sm font-medium">
                    {{ authStore.user?.name || 'Administrador' }}
                  </div>
                </div>
              </template>

              <q-list
                class="min-w-[150px] border border-gray-100 shadow-lg rounded-md overflow-hidden"
              >
                <q-item
                  clickable
                  v-close-popup
                  @click="handleLogout"
                  class="hover:bg-red-50 text-red-600"
                >
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
          <div
            class="flex items-center gap-2 text-gray-500 bg-gray-100 px-4 py-1 rounded-full text-sm font-medium"
          >
            <q-icon name="event" size="xs" />
            <span class="capitalize">{{ currentDate }}</span>
          </div>

          <q-btn
            flat
            round
            dense
            color="grey-7"
            icon="refresh"
            class="hover:bg-gray-100 transition-colors"
            @click="handleRefresh"
          >
            <q-tooltip class="bg-gray-800 text-xs">Atualizar Página</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
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

// Data formatada para o centro
const currentDate = computed(() => {
  const date = new Date();
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
  });
});

const userInitial = computed(() => {
  const name = authStore.user?.name || 'A';
  return name.charAt(0).toUpperCase();
});

const handleRefresh = () => {
  window.location.reload();
};

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
