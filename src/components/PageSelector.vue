<script setup lang="ts">
  import { defineProps, defineEmits, ref, watch } from 'vue';
  import SpinnerLoader from '@/components/SpinnerLoader.vue'

  const props = defineProps<{
    link: string,
    numPages: number,
    currentPage: number,
    loaderDeactive?: boolean
  }>()

  const emits = defineEmits(['page-change']);

  const loaderStates = ref<Array<boolean>>([]);

  for (let numPage = 0; numPage < props.numPages; numPage++) {
    loaderStates.value[numPage] = false;
  }

  const toggleLoader = (index: number) => {
    loaderStates.value[index] = !loaderStates.value[index];
  };

  watch(() => props.loaderDeactive, (value) => {
    if (value === true) {
      loaderStates.value = loaderStates.value.map(() => false);
    }
  });

  const changePage = (currentPage: number) => {
    toggleLoader(currentPage)
    emits('page-change', currentPage);
  };
</script>

<template>
  <div class="row py-2">
    <div 
      class="w-100 h-auto d-flex justify-content-center" 
    >
      <button 
        v-for="numPage in props.numPages" 
        :key="numPage"
        class="btn border mx-1"
        :class="{ 'bg-secondary': numPage === props.currentPage }"
        @click="numPage !== props.currentPage ? changePage(numPage) : ''"
      >
        <SpinnerLoader 
          v-if="loaderStates[numPage]" 
          :active="loaderStates[numPage]" 
          style="width: 16px; height: 16px;"
        />
        {{ loaderStates[numPage] ? '' : numPage }}
      </button>
    </div>
  </div>
</template>