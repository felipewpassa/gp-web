import { defineStore } from 'pinia'
import http from '@/services/http'
import { useAuth } from '@/stores/auth'

export const useProducts = defineStore('products', () => {

  const auth = useAuth();

  async function get() {
    try {
      const tokenAuth = "Bearer " + auth.token
      const { data } = await http.get('/products', {
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

  return {
    get,
    remove
  }

})
