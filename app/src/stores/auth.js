import { defineStore } from 'pinia'
import axios from 'axios'

import { login, register } from '@/API/auth'
import { me } from '@/API/user'
import { useCurrentConference } from './current-conference'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    isInitialized: false,
    returnTo: null,
    user: null,
    userPromise: null
  }),
  actions: {
    init() {
      const token = localStorage.getItem('token');

      if (token) this.loginSucceeded(token);
      else this.logoutSucceeded();
    },
    ensureUser() {
      if (!this.userPromise) {
        this.userPromise = new Promise((resolve, reject) => {
          me()
            .then(user => {
              this.user = user
              resolve(user);
            })
            .catch(() => {
              this.logoutSucceeded();
              reject();
            });
        }); 
      }

      return this.userPromise;
    },
    loginSucceeded(token) {
      const currentConference = useCurrentConference()

      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      this.isInitialized = true
      this.isLoggedIn = true

      this.ensureUser()
      currentConference.update()
    },
    logoutSucceeded() {
      const currentConference = useCurrentConference()

      this.isInitialized = true;
      this.isLoggedIn = false;
      this.user = null;
      delete axios.defaults.headers.common['Authorization'];
      currentConference.update()
    },
    login(email, password) {
      return login(email, password).then(data => this.loginSucceeded(data.token));
    },
    register(props) {
      return register(props);
    },
    logout() {
      this.logoutSucceeded();
    }
  },
})
