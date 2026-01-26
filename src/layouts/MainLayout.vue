<template>
  <q-layout view="LHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-white text-grey-8 shadow-up-2">
      <q-toolbar>
        <div class="w-full max-w-scheen-lg pb-2 mt-1">
          <!--home-->
          <q-tabs
            no-caps
            active-color="primary"
            indicator-color="transparent"
            class="text-gray-600"
            align="justify"
            dense
          >
            <q-route-tab to="/citizen/dashboard" exact class="flex-1">
              <q-icon name="las la-home" size="30px" />
              <span class="text-[12px] font-medium">{{ $t('layout.home') }}</span>
            </q-route-tab>

            <!--report-->
            <q-route-tab to="/citizen/report" class="flex-1 overflow-visible">
              <div class="flex flex-col items-center">
                <q-btn round unelevated color="black" icon="add" size="25px" />
                <span class="font-bold">{{ $t('layout.report') }}</span>
              </div>
            </q-route-tab>

            <!--sair-->
            <q-tab @click="handleLogout">
              <q-icon name="logout" size="32px" />
              <div class="text-[15px]">{{ $t('layout.logout') }}</div>
            </q-tab>
          </q-tabs>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/auth';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const $q = useQuasar();
const authStore = useAuthStore();
const { t } = useI18n();

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
