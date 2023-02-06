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

                </span>
                <span>
                    Attendees: {{ keynote.attendees.length }}
                </span>
            </div>
            <p>{{ keynote.description }}</p>
        </template>
    </Card>
</template>
