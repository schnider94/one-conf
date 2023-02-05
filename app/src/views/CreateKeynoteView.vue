<script setup>
    import PageWrapper from '@/components/PageWrapper.vue';
    import KeynoteForm from '@/components/forms/KeynoteForm.vue';

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
        <KeynoteForm :conferenceId="id" />
    </PageWrapper>
</template>
