import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import App from './App.vue'
import router from './router'
import axiosPlugin from './plugins/axios'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(axiosPlugin)
app.use(ToastService);

app.mount('#app')
