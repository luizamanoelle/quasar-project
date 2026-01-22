<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <div class="flex flex-col full-width min-h-screen md:flex-row md:p-25 md:items-center">
          <!--image-->
          <div class="w-full max-w-sm md:max-w-lg">
            <q-img :src="catImage" class="md:scale-130" fit="contain" />
          </div>

          <!--titulo e criar conta-->
          <div class="mx-8 mb-4">
            <span class="text-2xl md:text-3xl font-bold">{{ $t('login.title') }}</span>
            <p class="text-grey-7">
              {{ $t('login.noAccount') }}
              <router-link to="/register" class="text-purple font-bold"
                >{{ $t('login.createAccount') }}
              </router-link>
            </p>

            <div>
              <!--form de login-->
              <q-form @submit="handleLogin" class="flex flex-col gap-2 items-center">
                <q-input
                  v-model="loginForm.email"
                  class="w-full max-w-sm"
                  label="E-mail"
                  type="email"
                  outlined
                  rounded
                  dense
                  :rules="[(val) => !!val || $t('login.requiredEmail')]"
                />
                <!--o val é o conteudo digitado, se for false, vazio, dispara-->

                <q-input
                  v-model="loginForm.password"
                  class="w-full max-w-sm"
                  :label="$t('login.password')"
                  type="password"
                  outlined
                  rounded
                  dense
                  :rules="[(val) => !!val || $t('login.requiredPassword')]"
                />

                <!--botão-->
                <div class="w-full max-w-xs md:max-w-sm">
                  <q-btn
                    label="Entrar"
                    icon="login"
                    type="submit"
                    color="black"
                    rounded
                    class="full-width font-bold text-white"
                    :loading="loading"
                  />
                </div>
              </q-form>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
//import
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import catImage from 'assets/login.svg';
import { useAuthStore } from 'src/stores/auth';
import { useI18n } from 'vue-i18n';
import type { LoginCredentials } from 'src/models/Auth';

const { t } = useI18n();

const $q = useQuasar();
const router = useRouter();
const loading = ref(false);
//inicio store
const authStore = useAuthStore();

const loginForm = ref<LoginCredentials>({
  email: '',
  password: '',
});

const handleLogin = async () => {
  loading.value = true;
  try {
    //chama a store e passa os dados
    const success = await authStore.login(loginForm.value);

    if (success) {
      $q.notify({ type: 'positive', message: `${t('login.success')}, ${authStore.user.name}!` });
      const userRole = authStore.user?.role;

      if (userRole === 'admin') {
        void router.push('admin/dashboard');
      } else {
        void router.push('citizen/dashboard');
      }
    } else {
      $q.notify({ type: 'negative', message: `${t('login.fail')}` });
    }
  } catch (error) {
    console.error('Erro no login:', error);
    $q.notify({
      color: 'negative',
      message: `${t('login.error')}`,
      icon: 'error',
    });
  } finally {
    loading.value = false;
  }
};
</script>
