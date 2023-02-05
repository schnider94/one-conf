<script setup>
  import { useSearchConferenceStore } from '@/stores/search-conference';

  const searchStore = useSearchConferenceStore()
</script>

<template>
  <main class="flex flex-row w-screen h-screen justify-content-center align-items-center">
    <h1>
      Dashboard
    </h1>
    <span class="p-input-icon-left p-input-icon-right">
        <i class="pi pi-search"></i>
        <InputText
          type="text"
          v-model="searchStore.search"
          placeholder="Search"
        />
    </span>
  </main>
</template>
