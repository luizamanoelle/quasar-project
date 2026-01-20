<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <div class="flex flex-col full-width min-h-screen md:flex-row md:p-25 mb-8">
          <!--image-->
          <div class="w-full max-w-sm md:max-w-lg">
            <q-img :src="registerImage" class="md:scale-130" fit="contain" />
          </div>

          <!--titulo-->
          <div class="mx-8 mb-4">
            <span class="text-2xl md:text-3xl font-bold">{{ $t('register.create') }}</span>
            <p class="text-grey-7">
              {{ $t('register.already') }}
              <router-link to="/login" class="text-purple font-bold"
                >{{ $t('register.enter') }}
              </router-link>
            </p>
          </div>

          <div class="mx-8">
            <q-form @submit="handleRegister" class="flex flex-col gap-2 items-center">
              <q-input
                v-model="userForm.nome"
                class="w-full max-w-sm"
                :label="$t('register.name')"
                outlined
                rounded
                dense
                :rules="[(val) => !!val || 'Nome é obrigatório']"
              />

              <q-input
                v-model="userForm.email"
                class="w-full max-w-sm"
                label="E-mail"
                type="email"
                outlined
                rounded
                dense
                :rules="[(val) => !!val || 'E-mail é obrigatório']"
              />

              <q-input
                v-model="userForm.senha"
                class="w-full max-w-sm"
                :label="$t('register.password')"
                type="password"
                outlined
                rounded
                dense
                :rules="[(val) => !!val || 'Senha é obrigatória']"
              />

              <!--botão-->
              <div class="w-full max-w-xs md:max-w-sm">
                <q-btn
                  icon="login"
                  :label="$t('register.register')"
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
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import registerImage from 'assets/register.svg';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const $q = useQuasar();
const router = useRouter();
const loading = ref(false);

const userForm = ref({
  nome: '',
  email: '',
  senha: '',
});

const handleRegister = async () => {
  loading.value = true;
  try {
    await api.post('/usuarios', userForm.value);

    $q.notify({
      color: 'positive',
      message: t('register.success'),
      icon: 'check',
    });

    void router.push('/dashboard');
  } catch (e) {
    console.error('Erro ao cadastrar:', e);
    $q.notify({
      color: 'negative',
      message: t('register.error'),
      icon: 'error',
    });
  } finally {
    loading.value = false;
  }
};
</script>
