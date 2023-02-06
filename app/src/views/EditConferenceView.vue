<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { useToast } from "primevue/usetoast";

    import { getById } from '@/API/conferences';
    import ConferenceForm from '@/components/forms/ConferenceForm.vue';
    import PageWrapper from '@/components/PageWrapper.vue';
    import { useAuthStore } from '@/stores/auth';

    const conf = ref(null);

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
        const conference = await getById(props.id);

        if (authStore.user._id !== conference.owner) {
            router.push('/dashboard');

            toast.add({
                severity:'error',
                summary: 'No permissions',
                detail:'No permissions to edit this conference!',
                life: 2000
            });

            return;
        }

        conf.value = conference;
    });
</script>

<template>
    <PageWrapper
        title="Edit Conference"
        :isLoading="!conf"
    >
        <ConferenceForm
            :id="conf._id"
            :name="conf.name"
            :location="conf.location"
            :description="conf.description"
            :startDate="new Date(conf.startDate)"
            :endDate="new Date(conf.endDate)"
            isEditing
        />
    </PageWrapper>
</template>
