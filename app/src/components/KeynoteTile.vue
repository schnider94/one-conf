<script setup>
    import Card from 'primevue/card';

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
            <div class="w-full flex flex-row align-items-center justify-content-between">
                <span>
                    Attendees: 
                </span>
                <span>
                    {{ keynote.attendees.length }}
                </span>
            </div>
            <p v-if="keynote.secretDescription">{{ keynote.secretDescription }}</p>
            <p v-else>{{ keynote.description }}</p>
        </template>
    </Card>
</template>
