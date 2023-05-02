<script setup>
  import { watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useToast } from "primevue/usetoast"

  import LoginForm from '@/components/forms/LoginForm.vue'
  import { useAuthStore } from '@/stores/auth';

  const auth = useAuthStore()
  const toast = useToast()
  const router = useRouter()
  const route = useRoute()

  if (route.query?.returnTo) {
    toast.add({
      severity:'error',
      summary: 'Not logged in',
      detail:'You need to be logged in to access this url, log in first.',
      life: 3000
    })
  }

  watch(auth.isLoggedIn, (isLoggedIn) => {
    if (isLoggedIn) router.push('/dashboard')
  })
</script>

<template>
  <main class="flex flex-row w-screen h-screen justify-content-center align-items-center p-5">
    <LoginForm />
  </main>
</template>
