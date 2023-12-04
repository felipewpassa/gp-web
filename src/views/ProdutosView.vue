<script setup lang="ts">
import { useProducts } from '@/stores/products'
import { ref, onMounted } from 'vue';

interface ApiProduct {
  id: number,
  name: string,
  description: string,
  expiry_date: string,
  image: string,
  price: number,
  category_id: number
}

const products = ref<ApiProduct[]>([]);

const productsStore = useProducts();

const fetchProducts = async () => {
  const response = await productsStore.get()
  return response.data
}

onMounted(async () => {
  products.value = await fetchProducts();
  console.log(await fetchProducts())
});

const addProduct = () => {
  
};

const editProduct = (productId: number) => {

};

const deleteProduct = async (productId: number) => {
  await productsStore.remove(productId)

  const deletedIndex = products.value.findIndex(product => product.id === productId);
  if (deletedIndex >= 0) {
    products.value.splice(deletedIndex, 1);
  }
};

</script>

<template>
  <div class="mx-3 my-3">
    <div class="d-flex justify-content-between">
      <h2>Produtos</h2>
      <button
        class="btn btn-primary" 
        @click="addProduct"
      >
        Novo
      </button>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Preço</th>
          <th>Data de Validade</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.expiry_date }}</td>
          <td>
            <button 
              class="btn btn-warning btn-sm mx-1"
              @click="editProduct(product.id)" 
            >
              Editar
            </button>
            <button 
              class="btn btn-danger btn-sm mx-1"
              @click="deleteProduct(product.id)" 
            >
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
@import 'datatables.net-dt';
</style>