<script setup lang="ts">
import http from '@/services/http';
import {reactive, onMounted } from 'vue';
import ButtonLoader from '@/components/ButtonLoader.vue';
import { useRouter } from 'vue-router'
import { useAuth } from '@/stores/auth';

const auth = useAuth();
const router = useRouter();

const view = reactive({
  loginInProcess: false,
  loginFail: '',
  credentials: {
    email: 'felipe@teste.com',
    password: 'password'
  }
});

onMounted(async () => {
  if (auth.isAutheticated()) {
    await auth.checkToken();
  }
});

async function login() {
  view.loginInProcess = true;
  view.loginFail = ''
  try {
    const { data } = await http.post('/login', view.credentials);
    auth.setToken(data.data.token)
    router.push({ name: 'dashboard' })
  } catch (error: any) {
    view.loginInProcess = false;
    view.loginFail = error?.response?.data?.message ?? error?.message 
    setTimeout(() => {
      view.loginFail = ''
    }, 3000)
  }
  view.loginInProcess = false;
}
</script>

<template>
  <main>
    <template v-if="!auth.isAutheticated()">
      <div class="col-md-6 mx-auto justify-content-center my-5">
        <div class="card">
          <div class="card-header ">
            Faça o login
          </div>
          <div 
            v-if="view.loginFail"
            class="border border-danger text-danger fs-6 mt-3 mx-3 p-1" 
          >
            {{ view.loginFail }}
          </div>
          <form 
            class="p-3"
            @submit.prevent="login" 
          >
            <div class="mb-3">
              <label 
                for="email" 
                class="form-label"
              >
                Email
              </label>
              <input 
                id="email" 
                v-model="view.credentials.email"
                type="email" 
                class="form-control" 
                placeholder="Digite seu e-mail"
              >
            </div>
          
            <div class="mb-3">
              <label 
                for="password" 
                class="form-label"
              >
                Senha
              </label>
              <input 
                id="password" 
                v-model="view.credentials.password"
                type="password" 
                class="form-control" 
                placeholder="Digite sua senha"
              >
            </div>
  
            <div class="d-flex justify-content-end">
              <ButtonLoader
                title="Entrar"
                :loading-active="view.loginInProcess" 
              />
            </div>
          </form>
        </div>
      </div>
    </template>
    <template v-else>
      <h2 class="d-flex justify-content-center my-5">
        Você já fez login!
      </h2>
    </template>
  </main>
</template>
