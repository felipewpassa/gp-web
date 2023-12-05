import { ref } from 'vue'
import { defineStore } from 'pinia'
import http from '@/services/http'

export const useAuth = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'))
  
  function setToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
    token.value = tokenValue;
  }

  function isAutheticated() {
    return !!token.value;
  }

  async function checkToken() {
    try {
      const tokenAuth = "Bearer " + token.value
      const { data } = await http.get('/login/verify', {
        headers: {
          Authorization: tokenAuth
        }
      })
      return data
    } catch (error: any) {
      clear()
    }
  }

  function clear() {
    localStorage.removeItem('token')
    token.value = '';
  }

  return {
    token,
    setToken,
    isAutheticated,
    checkToken,
    clear
  }

})
