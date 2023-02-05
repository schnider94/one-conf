<script setup>
    import InputText from 'primevue/inputtext'

    import { useSearchConferenceStore } from '@/stores/search-conference';
    import PageWrapper from '@/components/PageWrapper.vue';

    const searchStore = useSearchConferenceStore()
</script>

<template>
    <PageWrapper title="Dashboard">
        <span class="w-full p-input-icon-left">
            <i class="pi pi-search"></i>
            <InputText
                type="text"
                class="w-full"
                v-model="searchStore.search"
                placeholder="Search"
            />
        </span>
    </PageWrapper>
</template>
