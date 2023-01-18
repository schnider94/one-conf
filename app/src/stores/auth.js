import { defineStore } from 'pinia'
import axios from 'axios'

import { login } from '@/API/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    isInitialized: false,
    returnTo: null
  }),
  actions: {
    init() {
      const token = localStorage.getItem('token')

      if (!!token) this.loginSucceeded(token)
      else this.logoutSucceeded()

      this.isInitialized = true
    },
    loginSucceeded(token) {
      this.isLoggedIn = true
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    logoutSucceeded() {
      this.isLoggedIn = false
      delete axios.defaults.headers.common['Authorization']
    },
    login(email, password) {
      return login(email, password).then(data => this.loginSucceeded(data.token))
    },
    logout() {
      this.logoutSucceeded()
    }
  },
})
