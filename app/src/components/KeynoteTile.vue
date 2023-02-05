<script setup>
    import Card from 'primevue/card';
    import Button from 'primevue/button';

    defineProps({
        keynote: {
            type: Object,
            required: true,
        }
    });
</script>

<template>
    <Card class="w-full md:w-6">
        <template #title>
            {{ keynote.name }}
        </template>
        <template #subtitle>
            {{ keynote.location }}
        </template>
        <template #content>
            <p>Keynote</p>
        </template>
        <template #footer>
            <Button icon="pi pi-check" label="Going"></Button>
        </template>
    </Card>
</template>
