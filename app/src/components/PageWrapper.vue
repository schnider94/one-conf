<script setup>
    import NavigationBar from './NavigationBar.vue';

    defineProps({
        title: {
            type: String,
            required: true,
        }
    })
</script>

<template>
    <main class="flex flex-column w-screen h-screen">
    <NavigationBar :title="title" />
        <div class="w-full h-full p-3 flex flex-column">
            <slot></slot>
        </div>
    </main>
</template>