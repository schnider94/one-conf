import { defineStore } from 'pinia'
import axios from 'axios'

import { login } from '@/API/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    loginSucceeded(token) {
      this.isLoggedIn = true
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    logoutSucceeded() {
      this.isLoggedIn = false
      delete axios.defaults.headers.common['Authorization']
    },
    login(email, password) {
      return login(email, password).then(data => this.loginSucceeded(data.token))
    },
  },
})
