import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import ConferenceSearchView from '../views/ConferenceSearchView.vue'
import ConferenceView from '../views/ConferenceView.vue'
import CreateConferenceView from '../views/CreateConferenceView.vue'
import CreateKeynoteView from '../views/CreateKeynoteView.vue'
import KeynoteView from '../views/KeynoteView.vue'

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
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/conference/search',
      name: 'conference-search',
      component: ConferenceSearchView,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/conference/add',
      name: 'conference-add',
      component: CreateConferenceView,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/conference/:id',
      name: 'conference-detail',
      component: ConferenceView,
      props: true,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/conference/:id/add',
      name: 'keynote-add',
      component: CreateKeynoteView,
      props: true,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/keynote/:id',
      name: 'keynote-detail',
      component: KeynoteView,
      props: true,
      meta: {
        requireAuth: true,
      }
    },
  ]
})

router.beforeEach(async to => {
  const authStore = useAuthStore()

  await authStore.userPromise;

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
