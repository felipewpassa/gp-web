<script setup lang="ts">
import { RouterView } from 'vue-router'
import PartialHeader from './components/PartialHeader.vue'
import PartialFooter from './components/PartialFooter.vue'
</script>

<template>
  <PartialHeader />

  <RouterView />

  <PartialFooter />
</template>

<style scoped>

</style>
