<script setup>
    import Card from 'primevue/card';
    import Button from 'primevue/button';

    defineProps({
        name: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        }, 
    });
</script>

<template>
    <Card class="w-full md:w-6">
        <template #title>
            {{ name }}
        </template>
        <template #subtitle>
            {{ location }}
        </template>
        <template #content>
            <p>Keynote</p>
        </template>
        <template #footer>
            <Button icon="pi pi-check" label="Going"></Button>
        </template>
    </Card>
</template>
