<template>
  <q-layout view="hHh lpR fFf" class="bg-gray-50">
    <q-header bordered class="bg-white text-gray-800 border-gray-200 h-16 flex items-center">
      <q-toolbar>
        <div class="flex items-center justify-between w-full">
          <!--usuario-->
          <div class="flex items-center">
            <q-btn flat round no-caps aria-label="$t('layout.open')" @click="drawer = !drawer">
              <div class="flex items-center">
                <q-avatar size="34px" class="bg-purple-100 text-primary font-bold">
                  {{ userInitial }}
                </q-avatar>
              </div>
            </q-btn>
          </div>

          <!--data-->
          <div class="text-gray-700 text-sm font-medium">
            <span class="capitalize">{{ currentDate }}</span>
          </div>

          <!--refresh-->
          <q-btn
            flat
            :aria-label="$t('layout.refresh')"
            round
            color="grey-7"
            icon="refresh"
            @click="handleRefresh"
          />
        </div>
      </q-toolbar>
    </q-header>

    <!--drawer sair-->
    <q-drawer
      v-model="drawer"
      overlay
      :width="150"
      :breakpoint="200"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-white'"
    >
      <div class="p-4">
        <div class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Opções</div>

        <q-item clickable @click="handleLogout">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            <span class="font-medium">{{ $t('layout.logout') }}</span>
          </q-item-section>
        </q-item>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/auth';
import { useI18n } from 'vue-i18n';

const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const { t } = useI18n();
const drawer = ref(false);

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
    cancel: true,
    persistent: true,
  }).onOk(() => {
    //chama o logout
    authStore.logout();
    void router.push('/');

    $q.notify({
      color: 'info',
      message: t('layout.success'),
      icon: 'logout',
    });
  });
};
</script>
