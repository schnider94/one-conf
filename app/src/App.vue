<script setup>
  import { RouterView } from 'vue-router'
  import ProgressSpinner from 'primevue/progressspinner'
  import Toast from 'primevue/toast'

  import { useAuthStore } from '@/stores/auth'
  import { useCurrentConference } from '@/stores/current-conference'

  const authStore = useAuthStore()
  const currentConferenceStore = useCurrentConference()

  authStore.init()
  currentConferenceStore.init()
</script>

<template>
  <Toast />
  <RouterView v-if="authStore.isInitialized" />
  <div v-else class="w-screen h-screen flex flex-row justify-content-center align-items-center">
    <ProgressSpinner stroke-width="4" />
  </div>
</template>

<style scoped>
</style>
