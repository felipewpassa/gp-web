<script setup lang="ts">
  import { defineProps } from 'vue';

  const props = defineProps<{
    active?: boolean
  }>()

</script>

<template>
  <div 
    v-if="props.active" 
    class="spinner-border spinner-border-sm"
  />
</template>