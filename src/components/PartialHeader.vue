<script setup lang="ts">
import { RouterLink } from 'vue-router'

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
      <RouterLink to="/login">
        <button 
          type="button" 
          class="btn btn-dark"
        >
          Login
        </button>
      </RouterLink>
    </nav>
  </header>
</template>