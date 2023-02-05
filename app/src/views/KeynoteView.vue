<script setup>
    import { ref, onMounted } from 'vue';

    import PageWrapper from '@/components/PageWrapper.vue';
    import { getById } from '@/API/keynotes';
    import KeynoteTile from '@/components/KeynoteTile.vue';

    const key = ref(null);

    const props = defineProps({
        id: {
            type: String,
            require: true
        }
    });

    onMounted(async () => {
        key.value = await getById(props.id);
    });
</script>

<template>
    <PageWrapper
        title="Keynote"
        :isLoading="key === null"
    >
        <KeynoteTile :keynote="key" />
    </PageWrapper>
</template>
