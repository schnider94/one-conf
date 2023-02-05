<script setup>
    import ConferenceTile from '@/components/ConferenceTile.vue';
    import { useSearchConferenceStore } from '@/stores/search-conference';

    const searchStore = useSearchConferenceStore()
</script>

<template>
    <div class="flex-column w-full">
        <span class="p-input-icon-left p-input-icon-right">
            <i class="pi pi-search"></i>
            <InputText
                type="text"
                v-model="searchStore.search"
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
</template>