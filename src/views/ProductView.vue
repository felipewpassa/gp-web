<script setup lang="ts">
import { useProducts } from '@/stores/products'
import { ref, onMounted } from 'vue';
import PageSelector from '@/components/PageSelector.vue';
import FormProductModal from '@/components/FormProductModal.vue';
import { format, parseISO } from 'date-fns';

interface ApiProduct {
  id: number,
  name: string,
  description: string,
  expiry_date: string,
  image: string,
  price: number,
  category_id: number
}

interface ProductView {
  id: number,
  name: string,
  description: string,
  expiry_date: string,
  image: string,
  price: number|string,
  category_id: number
}

const products = ref<ApiProduct[]>([]);

const numPages = ref<number>(0);
const currentPage = ref<number>(1);
const loaderPaginationDeactive = ref<boolean>(true);

const productsStore = useProducts();

const fetchProducts = async (page: number) => {
  const response = await productsStore.get(page)
  formatData(response.data) 
  updateList(response.data)
  numPages.value = response.totalPages ?? 1
  loaderPaginationDeactive.value = true
  return response.data
}

const formatData = (apiProducts: ProductView[]) => {
  apiProducts.forEach((apiProduct) => {
    const priceBRL = apiProduct.price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    apiProduct.price = priceBRL;
    apiProduct.expiry_date = format(parseISO(apiProduct.expiry_date), 'dd/MM/yyyy');
  })
}

const updateList = (productsApi: ApiProduct[]) => {
  products.value = productsApi;
}

onMounted(async () => {
  await fetchProducts(currentPage.value);
});

const deleteProduct = async (productId: number) => {
  await productsStore.remove(productId)

  const deletedIndex = products.value.findIndex(product => product.id === productId);
  if (deletedIndex >= 0) {
    products.value.splice(deletedIndex, 1);
  }
};

const onPageChange = (page: any) => {
  loaderPaginationDeactive.value = false
  currentPage.value = page;
  fetchProducts(currentPage.value);
};

</script>

<template>
  <div class="mx-3 my-3">
    <div class="d-flex justify-content-between mt-5 mb-4">
      <h2>Produtos</h2>
      <FormProductModal /> 
    </div>
    <div class="table-responsive">
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
                disabled
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
    <PageSelector 
      link="http://localhost:8000/api/v1/produtos"
      :num-pages="numPages"
      :current-page="currentPage"
      :loader-deactive="loaderPaginationDeactive"
      @page-change="onPageChange"
    />
  </div>
</template>
