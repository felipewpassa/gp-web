<script setup lang="ts">
import SpinnerLoader from '@/components/SpinnerLoader.vue'

  const props = defineProps<{
    title: string,
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
    {{ props.title }}
  </button>
</template>