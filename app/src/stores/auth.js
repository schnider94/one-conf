import { defineStore } from 'pinia'
import axios from 'axios'

import { login, register } from '@/API/auth'
import { me } from '@/API/user'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    isInitialized: false,
    returnTo: null,
    user: null,
  }),
  actions: {
    init() {
      const token = localStorage.getItem('token');

      if (token) this.loginSucceeded(token);
      else this.logoutSucceeded();
    },
    loginSucceeded(token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      me()
        .then(user => {
          this.isInitialized = true;
          this.user = user
          this.isLoggedIn = true;
        })
        .catch(() => this.logoutSucceeded());
    },
    logoutSucceeded() {
      this.isInitialized = true;
      this.isLoggedIn = false;
      this.user = null;
      delete axios.defaults.headers.common['Authorization'];
    },
    login(email, password) {
      return login(email, password).then(data => this.loginSucceeded(data.token));
    },
    register(email, password) {
      return register(email, password);
    },
    logout() {
      this.logoutSucceeded();
    }
  },
})
