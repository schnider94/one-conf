<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { useToast } from "primevue/usetoast";

    import { getById } from '@/API/keynotes';
    import KeynoteForm from '@/components/forms/KeynoteForm.vue';
    import PageWrapper from '@/components/PageWrapper.vue';
    import { useAuthStore } from '@/stores/auth';

    const keynote = ref(null);

    const authStore = useAuthStore();
    const router = useRouter();
    const toast = useToast();

    const props = defineProps({
        id: {
            type: String,
            require: true
        }
    });

    onMounted(async () => {
        const key = await getById(props.id);

        if (authStore.user._id !== key.owner) {
            router.push('/dashboard');

            toast.add({
                severity:'error',
                summary: 'No permissions',
                detail:'No permissions to edit this keynote!',
                life: 2000
            });

            return;
        }

        keynote.value = key;
    });
</script>

<template>
    <PageWrapper
        title="Edit Keynote"
        :isLoading="!keynote"
    >
        <KeynoteForm
            :id="keynote._id"
            :conferenceId="keynote.conference"
            :name="keynote.name"
            :location="keynote.location"
            :description="keynote.description"
            :startDate="new Date(keynote.startDate)"
            :endDate="new Date(keynote.endDate)"
            isEditing
        />
    </PageWrapper>
</template>
