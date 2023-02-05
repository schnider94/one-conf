<script setup>
    import { ref, onMounted } from 'vue';
    import Button from 'primevue/button';

    import PageWrapper from '@/components/PageWrapper.vue';
    import KeynoteTile from '@/components/KeynoteTile.vue';
    import { useAuthStore } from '@/stores/auth';
    import { getById, attend, unattend } from '@/API/keynotes';

    const key = ref(null);
    const authStore = useAuthStore()

    const isLoading = ref(false)
    const isAttending = ref(false)
    const isSpeaker = ref(false)

    const props = defineProps({
        id: {
            type: String,
            require: true
        }
    });

    const setValues = () => {
        const userId = authStore.user._id;
        isAttending.value = key.value.attendees.includes(userId);
        isAttending.value = key.value.speakers.includes(userId);
    }

    onMounted(async () => {
        key.value = await getById(props.id);

        setValues();
    });

    const onAttend = () => {
        isLoading.value = true;

        attend(props.id)
            .then(keynote => {
                key.value = keynote;

                setValues();
            })
            .finally(() => isLoading.value = false);
    }

    const onDontAttend = () => {
        isLoading.value = true;

        unattend(props.id)
            .then(keynote => {
                key.value = keynote;

                setValues();
            })
            .finally(() => isLoading.value = false);
    }

    const onEdit = () => {
        console.log('Edit keynote');
    }
</script>

<template>
    <PageWrapper
        title="Keynote"
        :isLoading="key === null"
    >
        <KeynoteTile :keynote="key" />
        <div
            class="w-full flex flex-row mt-3 justify-content-center gap-2"
        >
            <Button
                v-if="isSpeaker"
                label="Edit"
                class="p-button-info"
                @click="onEdit"
            ></Button>
            <Button
                v-if="!isSpeaker && !isAttending"
                :loading="isLoading"
                label="I will attend"
                class="p-button-success"
                @click="onAttend"
            ></Button>
            <Button
                v-if="!isSpeaker && isAttending"
                :loading="isLoading"
                label="I cannot attend"
                class="p-button-danger"
                @click="onDontAttend"
            ></Button>
        </div>
    </PageWrapper>
</template>
