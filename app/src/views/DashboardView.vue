<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'

    import { useSearchConferenceStore } from '@/stores/search-conference';
    import PageWrapper from '@/components/PageWrapper.vue';

    const input = ref(null);
    
    const route = useRoute();
    const searchStore = useSearchConferenceStore();

    onMounted(() => {
        if (route.query?.input) input.value.focus()
    })
</script>

<template>
    <PageWrapper title="Dashboard">
        <span class="w-full p-input-icon-left">
            <i class="pi pi-search"></i>
            <input
                type="text"
                class="w-full p-inputtext p-component"
                v-model="searchStore.search"
                ref="input"
                placeholder="Search"
            />
        </span>
    </PageWrapper>
</template>
