<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import Button from 'primevue/button';
    import Card from 'primevue/card';

    import PageWrapper from '@/components/PageWrapper.vue';
    import KeynoteTile from '@/components/KeynoteTile.vue';
    import { useAuthStore } from '@/stores/auth';
    import { getById, attend, unattend } from '@/API/keynotes';
    import { byIds as usersByIds } from '@/API/user';

    const key = ref(null);
    const authStore = useAuthStore()
    const router = useRouter()

    const isLoading = ref(false)
    const isAttending = ref(false)
    const isSpeaker = ref(false)
    const isOwner = ref(false)
    const speakers = ref([])

    const props = defineProps({
        id: {
            type: String,
            require: true
        }
    });

    const setValues = () => {
        const userId = authStore.user._id;
        
        isAttending.value = key.value.attendees.includes(userId);
        isSpeaker.value = key.value.speakers.includes(userId);
        isOwner.value = key.value.owner === userId;
    }

    onMounted(async () => {
        key.value = await getById(props.id);
        speakers.value = await usersByIds(key.value.speakers);

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
        router.push(`/keynote/${key.value._id}/edit`);
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
            <Button
                v-if="isSpeaker || isOwner"
                label="Edit"
                class="p-button-info"
                @click="onEdit"
            ></Button>
        </div>
        <div class="w-full flex flex-column gap-2">
            <Card
                v-for="speaker in speakers"
                :key="speaker._id"
            >
                <template #content>
                    {{ speaker.name }}
                </template>
            </Card>
        </div>
    </PageWrapper>
</template>
