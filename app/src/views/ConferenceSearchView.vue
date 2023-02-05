<script setup>
    import { ref, onMounted } from 'vue';

    import ConferenceTile from '@/components/ConferenceTile.vue';
    import PageWrapper from '@/components/PageWrapper.vue';
    import { useSearchConferenceStore } from '@/stores/search-conference';

    const searchStore = useSearchConferenceStore()

    const input = ref(null)

    onMounted(() => {
        input.value.focus();
    })
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
            <div class="flex-row flex-wrap">
                <ConferenceTile
                    v-for="conf in searchStore.items"
                    :key="conf._id"
                    :name="conf.name"
                    :location="conf.location"
                />
            </div>
        </div>
    </PageWrapper>
</template>