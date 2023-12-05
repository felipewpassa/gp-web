<script setup lang="ts">
import {ref, reactive, onMounted } from 'vue';
import ButtonLoader from '@/components/ButtonLoader.vue';
import 'bootstrap/js/dist/modal'

import { useCategories } from '@/stores/categories'
const categoriesStore = useCategories()

import { useProducts } from '@/stores/products'
const productsStore = useProducts()

interface ApiCategoryResponse {
  id: number,
  name: string
}

interface ApiProductPayload {
  id: number,
  name: string,
  description: string,
  expiry_date: string,
  image?: null,
  price: number,
  category_id: number
}

const view = reactive({
  saveInProcess: false,
  errorMessage: '',
  productsPayload: {} as ApiProductPayload,
  categories: [] as ApiCategoryResponse[]
});

const files = ref<File[]>([])

async function sendProduct() {
  view.saveInProcess = true

  try {
    const formData = new FormData();
    formData.append('name', view.productsPayload.name);
    formData.append('description', view.productsPayload.description);
    formData.append('price', view.productsPayload.price.toString());
    formData.append('expiry_date', view.productsPayload.expiry_date);
    formData.append('image', files.value[0]);
    formData.append('category_id', view.productsPayload.category_id.toString());

    const response = await productsStore.create(formData)
    console.log('Resposta da API:', response?.data);

  } catch (error: any) {
    view.errorMessage = error?.message 
    setTimeout(() => {
      view.errorMessage = ''
    }, 3000)
  }
  view.saveInProcess = false
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const fileList = target.files as FileList;
  files.value = Array.from(fileList);
}

onMounted(async () => {
  if (view.categories.length <= 0) {
    view.categories = await fetchCategories();
  }
});


const fetchCategories = async () => {
  const { data } = await categoriesStore.get()
  return data
}

</script>

<template>
  <button 
    type="button" 
    class="btn btn-primary" 
    data-bs-toggle="modal"
    data-bs-target="#formProduct"
  >
    Novo
  </button>

  <div 
    id="formProduct" 
    class="modal fade" 
    tabindex="-1" 
  >
    <div class="modal-dialog">
      <form @submit.prevent="sendProduct">
        <div class="modal-content">
          <div class="modal-header">
            <h5 
              id="exampleModalLabel"
              class="modal-title" 
            >
              Cadastro de xxx
            </h5>
            <button 
              type="button" 
              class="btn-close" 
              data-bs-dismiss="modal" 
            />
          </div>
          <div class="modal-body">
            <div>
              <label 
                for="recipient-name" 
                class="col-form-label"
              >
                Nome
              </label>
              <input 
                id="recipient-name"
                v-model="view.productsPayload.name"
                type="text"
                class="form-control"
                maxlength="50"
                autocomplete="off"
              >
            </div>
            <div>
              <label 
                for="recipient-name"
                class="col-form-label"
                autocomplete="off"
              >
                Descrição
              </label>
              <textarea
                id="recipient-name"
                v-model="view.productsPayload.description"
                type="text"
                class="form-control"
                maxlength="200"
                autocomplete="off"
              />
            </div>
            <div>
              <label 
                for="recipient-name"
                class="col-form-label"
              >
                Preço
              </label>
              <input 
                id="recipient-name"
                v-model="view.productsPayload.price"
                type="number"
                class="form-control"
                autocomplete="off"
              >
            </div>
            <div>
              <label 
                for="recipient-name"
                class="col-form-label"
              >
                Data de Validade
              </label>
              <input 
                id="recipient-name"
                v-model="view.productsPayload.expiry_date"
                type="date"
                class="form-control"
                autocomplete="off"
              >
            </div>
            <div
              class="input-group mt-4 mb-3"
            >
              <input 
                id="inputGroupFile02"
                ref="fileInput"
                type="file"
                class="form-control"
                autocomplete="off"
                @change="onFileChange"
              >
            </div>
            <div>
              <label 
                for="recipient-name"
                class="col-form-label"
              >
                Categoria
              </label>
              <select 
                v-model="view.productsPayload.category_id"
                class="form-select"
              >
                <option 
                  v-for="category in view.categories" 
                  :key="category.id" 
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <div 
              v-if="view.errorMessage"
              class="border border-danger text-danger fs-6 mt-3 mx-3 p-1" 
            >
              {{ view.errorMessage }}
            </div>
            <ButtonLoader 
              title="Cadastrar"
              :loading-active="view.saveInProcess" 
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
</style>