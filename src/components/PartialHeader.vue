<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router'
import { useAuth } from '@/stores/auth';

const auth = useAuth();
const router = useRouter();

function logout() {
  auth.clear()
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="bg-light">
    <nav class="d-flex justify-content-between p-3">
      <RouterLink to="/">
        <img 
          src="../assets/logo.svg" 
          width="45" 
          height="45"
        >
      </RouterLink>
    
      <div class="d-flex gap-3">
        <RouterLink
          v-if="auth.isAutheticated()" 
          class="nav-link link-secondary text-dark"
          :to="{name: 'produtos'}"
        >
          Produtos
        </RouterLink>
      </div>
      
      <template v-if="auth.isAutheticated()">
        <button
          type="button" 
          class="btn btn-dark"
          @click="logout"
        >
          Logout
        </button>
      </template>
      <template v-else>
        <RouterLink 
          v-if="!auth.isAutheticated()" 
          :to="{name: 'login'}"
        >
          <button 
            type="button" 
            class="btn btn-dark"
          >
            Login
          </button>
        </RouterLink>
      </template>
    </nav>
  </header>
</template>