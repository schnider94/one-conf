<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import Button from 'primevue/button';
    import ProgressSpinner from 'primevue/progressspinner';

    import { useSearchConferenceStore } from '@/stores/search-conference';
    import PageWrapper from '@/components/PageWrapper.vue';
    import { mine } from '@/API/conferences';
    import ConferenceTile from '@/components/ConferenceTile.vue';

    const input = ref(null);
    const conferences = ref([]);
    const isLoading = ref(false);
    
    const route = useRoute();
    const router = useRouter();
    const searchStore = useSearchConferenceStore();

    onMounted(async () => {
        if (route.query?.input) input.value.focus();

        isLoading.value = true;

        await mine()
            .then(data => conferences.value = data)
            .finally(() => isLoading.value = false)
    });

    const onAddConference = () => {
        router.push('/conference/add');
    }

    const onClickConf = id => {
        router.push(`/conference/${id}`);
    }
</script>

<template>
    <PageWrapper title="Dashboard">
        <span class="w-full p-input-icon-left">
            <i class="pi pi-search"></i>
            <input
                type="text"
                class="w-full p-inputtext p-component"
                @input="event => searchStore.search = event.target.value"
                ref="input"
                placeholder="Search"
            />
        </span>
        <div class="flex flex-row justify-content-between align-items-center">
            <h2>
                Conferences
            </h2>
            <div>
                <Button
                    label="Add"
                    icon="pi pi-plus"
                    @click="onAddConference"
                ></Button>
            </div>
        </div>
        <div class="flex-row flex-wrap gap-2 py-2">
            <ConferenceTile
                v-for="conf in conferences"
                :key="conf._id"
                :conference="conf"
                @click="onClickConf(conf._id)"
            />
            <div
                v-if="isLoading"
                class="flex flex-row justify-items-center mt-2"
            >
                <ProgressSpinner />
            </div>
        </div>
    </PageWrapper>
</template>
