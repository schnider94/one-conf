import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import { useAuthStore } from '@/stores/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        requireAuth: true,
      }
    },
  ]
})

router.beforeEach(to => {
  const authStore = useAuthStore()

  if (to.meta?.requireAuth && !authStore.isLoggedIn) {
    return {
      name: 'home',
      query: {
        returnTo: to.path,
      }
    }
  }

  return true
})

export default router
