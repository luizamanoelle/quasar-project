<template>
  <q-layout view="hhh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-white text-grey-8 q-py-md">
      <q-toolbar>
        <q-tabs
          no-caps
          shrink
          active-color="primary"
          indicator-color="transparent"
          class="full-width"
        >
          <q-route-tab to="/dashboard" exact>
            <template v-slot:default>
              <q-icon name="home" size="44px" />
              <div class="q-tab__label">Inicio</div>
            </template>
          </q-route-tab>
          <q-route-tab to="/" exact>
            <template v-slot:default>
              <q-icon name="notifications" size="44px" />
              <div class="q-tab__label">Avisos</div>
            </template>
          </q-route-tab>
          <div class="flex column center text-center">
            <q-btn rounded unelevated color="primary" icon="add" size="25px" to="/report" />
            <span class="text-h7 text-bold">Reportar</span>
          </div>
          <q-route-tab to="/ajustes" exact>
            <template v-slot:default>
              <q-icon name="settings" size="44px" />
              <div class="q-tab__label">Ajustes</div>
            </template>
          </q-route-tab>
          <q-tab @click="handleLogout">
            <template v-slot:default>
              <q-icon name="logout" size="44px" />
              <div class="q-tab__label">Sair</div>
            </template>
          </q-tab>
        </q-tabs>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const router = useRouter();
const $q = useQuasar();

const handleLogout = () => {
  $q.dialog({
    title: 'Sair',
    message: 'Deseja realmente sair do aplicativo?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    // 1. Remove os dados de autenticação do LocalStorage
    localStorage.removeItem('asten_token');
    localStorage.removeItem('user_data');

    // 2. Notifica o usuário
    $q.notify({
      color: 'info',
      message: 'Você saiu da conta.',
      icon: 'logout',
    });

    // 3. Redireciona para a página de login (rota '/')
    void router.push('/');
  });
};
</script>
