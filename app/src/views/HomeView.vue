<script setup>
  import { useRoute } from 'vue-router'
  import { useToast } from "primevue/usetoast"

  import LoginForm from '@/components/forms/LoginForm.vue'

  const toast = useToast()
  const route = useRoute()

  if (!!route.query?.returnTo) {
    toast.add({
      severity:'error',
      summary: 'Not logged in',
      detail:'You need to be logged in to access this url, log in first.',
      life: 3000
    })
  }
</script>

<template>
  <main class="flex flex-row w-screen h-screen justify-content-center align-items-center">
    <LoginForm />
  </main>
</template>
