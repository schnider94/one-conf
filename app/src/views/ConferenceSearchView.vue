<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import ProgressSpinner from 'primevue/progressspinner';

    import ConferenceTile from '@/components/ConferenceTile.vue';
    import PageWrapper from '@/components/PageWrapper.vue';
    import { useSearchConferenceStore } from '@/stores/search-conference';

    const searchStore = useSearchConferenceStore();
    const router = useRouter();

    const input = ref(null);

    onMounted(() => {
        input.value.focus();
    });

    const onClickConf = id => {
        router.push(`/conference/${id}`);
    }
</script>

<template>
    <PageWrapper title="Conference Search">
        <div class="w-full h-full flex-column">
            <span class="w-full p-input-icon-left p-input-icon-right">
                <i class="pi pi-search"></i>
                <input
                    type="text"
                    class="w-full p-inputtext p-component"
                    v-model="searchStore.search"
                    ref="input"
                    placeholder="Search"
                />
                <i
                    class="pi pi-times"
                    @click="searchStore.search = ''"
                ></i>
            </span>
            <div class="flex-row flex-wrap gap-2 py-2">
                <ConferenceTile
                    v-for="conf in searchStore.items"
                    :key="conf._id"
                    :conference="conf"
                    @click="onClickConf(conf._id)"
                />
                <div
                    v-if="searchStore.isLoading"
                    class="flex flex-row justify-items-center mt-2"
                >
                    <ProgressSpinner />
                </div>
            </div>
        </div>
    </PageWrapper>
</template>