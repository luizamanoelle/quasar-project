<template>
  <q-layout view="hhh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-white text-grey-8 shadow-2">
      <q-toolbar>
        <div class="w-full max-w-scheen-lg flex justify-around items-end pb-2 mt-1">
          <!--home-->
          <q-tabs no-caps active-color="primary" indicator-color="transparent" class="w-full" dense>
            <q-route-tab to="/dashboard" exact class="min-w-15 px-1">
              <template v-slot:default>
                <q-icon name="las la-home" size="35px" />
                <div class="text-[15px]">{{ $t('layout.home') }}</div>
              </template>
            </q-route-tab>

            <!--report-->
            <div class="flex column center text-center">
              <q-btn
                round
                unelevated
                color="black"
                icon="add"
                size="25px"
                to="/citizen/report"
                class="min-w-15 px-1"
              />
              <span class="text-bold">{{ $t('layout.report') }}</span>
            </div>

            <!--sair-->
            <q-tab @click="handleLogout" class="min-w-15 px-1">
              <template v-slot:default>
                <q-icon name="logout" size="32px" />
                <div class="text-[15px]">{{ $t('layout.logout') }}</div>
              </template>
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
