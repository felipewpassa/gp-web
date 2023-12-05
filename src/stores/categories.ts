import { defineStore } from 'pinia'
import http from '@/services/http'
import { useAuth } from '@/stores/auth'

export const useCategories = defineStore('categories', () => {

  const auth = useAuth();

  async function get() {
    try {
      const tokenAuth = "Bearer " + auth.token
      const { data } = await http.get('/categories', {
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
    get
  }

})
