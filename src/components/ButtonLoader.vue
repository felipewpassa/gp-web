<script setup lang="ts">

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
    <div 
      v-if="props.loadingActive" 
      class="spinner-border spinner-border-sm"
    />
    Entrar
  </button>
</template>