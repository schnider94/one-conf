<script setup>
    import Card from 'primevue/card';
    import Button from 'primevue/button';

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
        <template #content>
            <p>Conference</p>
        </template>
        <template #footer>
            <Button icon="pi pi-check" label="Going"></Button>
        </template>
    </Card>
</template>
