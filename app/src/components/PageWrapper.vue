<script setup>
    import ProgressSpinner from 'primevue/progressspinner';
    
    import NavigationBar from './NavigationBar.vue';

    defineProps({
        title: {
            type: String,
            required: true,
        },
        isLoading: {
            type: Boolean,
            default: false
        }
    })
</script>

<template>
    <main class="flex flex-column w-screen h-screen">
    <NavigationBar :title="title" />
        <div class="w-full h-full p-3 flex flex-column">
            <div
                v-if="isLoading"
                class="flex flex-row justify-items-center mt-2"
            >
                <ProgressSpinner />
            </div>
            <slot v-else></slot>
        </div>
    </main>
</template>