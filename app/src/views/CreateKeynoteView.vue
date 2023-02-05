<script setup>
    import PageWrapper from '@/components/PageWrapper.vue';

    defineProps({
        id: {
            type: String,
            require: true
        }
    });
</script>

<template>
    <PageWrapper
        title="Create Keynote"
    >
        Conference: {{ id }}
    </PageWrapper>
</template>
