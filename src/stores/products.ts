import { defineStore } from 'pinia'
import http from '@/services/http'
import { useAuth } from '@/stores/auth'

export const useProducts = defineStore('products', () => {

  const auth = useAuth();

  async function get(page = 1) {
    let url = '/products';
    if (page > 1) {
      url += '?page=' + page;
    }
    try {
      const tokenAuth = "Bearer " + auth.token
      const { data } = await http.get(url, {
        headers: {
          Authorization: tokenAuth
        }
      })
      return data
    } catch (error: any) {
      console.error(error.response.data)
    }
  }

  async function remove(productId: number) {
    try {
      const tokenAuth = "Bearer " + auth.token
      const { data } = await http.delete('/products/' + productId, {
        headers: {
          Authorization: tokenAuth
        }
      })
      return data
    } catch (error: any) {
      console.error(error.response.data)
    }
  }


  async function create(formData: FormData) {
    try {
      const tokenAuth = "Bearer " + auth.token
      const response = http.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': tokenAuth
        },
      });
      return response
    } catch (error: any) {
      console.error(error.response.data)
    }

  }

  return {
    get,
    remove,
    create
  }

})
