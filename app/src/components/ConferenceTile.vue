<script setup>
    import Card from 'primevue/card';
    
    import { useCurrentConference } from '@/stores/current-conference';

    defineProps({
        conference: {
            type: Object,
            required: true
        },
    });

    const currentConference = useCurrentConference()
</script>

<template>
    <Card class="w-full md:w-6 relative">
        <template #title>
            {{ conference.name }}
        </template>
        <template #subtitle>
            {{ conference.location }}
        </template>
        <template #content>
            <p v-if="conference.description">{{ conference.description }}</p>

            <div
                v-if="currentConference.id === conference._id"
                class="absolute top-0 right-0 bg-blue-300 flex flex-row align-items-center justify-content-center"
                :style="{ borderBottomLeftRadius: '10px' }"
            >
                <span class="text-sm px-2 py-2">At location</span>
            </div>
        </template>
    </Card>
</template>
