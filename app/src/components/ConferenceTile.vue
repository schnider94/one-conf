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
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
            quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
        </template>
        <template #footer>
            <Button icon="pi pi-check" label="Going"></Button>
        </template>
    </Card>
</template>
