<script setup lang="ts">
import SpinnerLoader from '@/components/SpinnerLoader.vue'

  const props = defineProps<{
    loadingActive?: boolean
  }>()

</script>

<template>
  <button 
    type="submit" 
    class="btn btn-dark"
    :disabled="props.loadingActive"
  >
    <SpinnerLoader :active="props.loadingActive" />
    Entrar
  </button>
</template>