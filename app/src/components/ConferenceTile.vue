<script setup>
    import Card from 'primevue/card';

    defineProps({
        conference: {
            type: Object,
            required: true
        },
    });
</script>

<template>
    <Card class="w-full md:w-6">
        <template #title>
            {{ conference.name }}
        </template>
        <template #subtitle>
            {{ conference.location }}
        </template>
        <template #content v-if="conference.description">
            <p>{{ conference.description }}</p>
        </template>
    </Card>
</template>
