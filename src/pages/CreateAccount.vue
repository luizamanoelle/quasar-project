<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-col q-pa-md items-center justify-center bg-gray-50">
        <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div class="text-center q-mb-xl">
            <h1 class="text-2xl font-bold text-gray-900">Criar Conta</h1>
            <p class="text-gray-500">Cadastre-se para começar a usar o Asten City</p>
          </div>

          <q-form @submit="handleRegister" class="flex flex-col gap-4">
            <q-input
              v-model="userForm.nome"
              label="Nome Completo"
              outlined
              rounded
              dense
              :rules="[(val) => !!val || 'Nome é obrigatório']"
            />

            <q-input
              v-model="userForm.email"
              label="E-mail"
              type="email"
              outlined
              rounded
              dense
              :rules="[(val) => !!val || 'E-mail é obrigatório']"
            />

            <q-input
              v-model="userForm.senha"
              label="Senha"
              type="password"
              outlined
              rounded
              dense
              :rules="[(val) => !!val || 'Senha é obrigatória']"
            />

            <div class="q-mt-md">
              <q-btn
                label="Cadastrar"
                type="submit"
                color="primary"
                rounded
                class="full-width py-3 font-bold"
                :loading="loading"
              />
            </div>
          </q-form>

          <div class="text-center q-mt-lg">
            <q-btn flat no-caps label="Já tenho uma conta" to="/" color="grey-7" />
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
import { api } from 'src/boot/axios'; //

const $q = useQuasar();
const router = useRouter();
const loading = ref(false);

const userForm = ref({
  nome: '',
  email: '',
  senha: '', // Nota: Em um app real, a senha nunca deve ficar clara no db.json
});

const handleRegister = async () => {
  try {
    loading.value = true;

    // Envia o novo usuário para a coleção "usuarios" do db.json
    await api.post('/usuarios', userForm.value);

    $q.notify({
      color: 'positive',
      message: 'Usuário criado com sucesso!',
      icon: 'check',
    });

    // Redireciona para o Dashboard ou Login
    void router.push('/dashboard');
  } catch (error) {
    console.error('Erro ao cadastrar:', error);
    $q.notify({
      color: 'negative',
      message: 'Erro ao criar usuário.',
      icon: 'error',
    });
  } finally {
    loading.value = false;
  }
};
</script>
