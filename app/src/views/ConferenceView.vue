<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import Button from 'primevue/button';

    import PageWrapper from '@/components/PageWrapper.vue';
    import { getById, attend, unattend } from '@/API/conferences';
    import { byConferenceId as getKeynotesByConfId } from '@/API/keynotes';
    import ConferenceTile from '@/components/ConferenceTile.vue';
    import KeynoteTile from '@/components/KeynoteTile.vue';
    import { useAuthStore } from '@/stores/auth';

    const conf = ref(null);
    const keys = ref(null);
    const isLoading = ref(false)
    const isAttending = ref(false)
    const isOwner = ref(false)

    const authStore = useAuthStore()
    const router = useRouter()

    const props = defineProps({
        id: {
            type: String,
            require: true
        }
    });

    const setValues = () => {
        isOwner.value = conf.value.owner === authStore.user._id;
        isAttending.value = conf.value.attendees.includes(authStore.user._id);
    }

    onMounted(async () => {
        const conference = await getById(props.id);

        const keynotes = await getKeynotesByConfId(conference._id);

        conf.value = conference;
        keys.value = keynotes;

        setValues();
    });

    const onOpenKeynote = id => {
        router.push(`/keynote/${id}`);
    }

    const onAddKeynote = () => {
        router.push(`/conference/${conf.value._id}/add`);
    }

    const onAttend = () => {
        isLoading.value = true;

        attend(props.id)
            .then(conference => {
                conf.value = conference;

                setValues();
            })
            .finally(() => isLoading.value = false);
    }

    const onDontAttend = () => {
        isLoading.value = true;

        unattend(props.id)
            .then(conference => {
                conf.value = conference;

                setValues();
            })
            .finally(() => isLoading.value = false);
    }

    const onEdit = () => {
        console.log('Edit Conference');
    }
</script>

<template>
    <PageWrapper
        title="Conference"
        :isLoading="conf === null"
    >
        <ConferenceTile :conference="conf" />
        <div
            class="w-full flex flex-row mt-3 justify-content-center gap-2"
        >
            <Button
                v-if="!isAttending"
                :loading="isLoading"
                label="I will attend"
                class="p-button-success"
                @click="onAttend"
            ></Button>
            <Button
                v-if="isAttending"
                :loading="isLoading"
                label="I cannot attend"
                class="p-button-danger"
                @click="onDontAttend"
            ></Button>
            <Button
                v-if="isOwner"
                label="Edit"
                class="p-button-info"
                @click="onEdit"
            ></Button>
        </div>
        <div class="flex flex-row justify-content-between align-items-center">
            <h2>
                Keynotes
            </h2>
            <div>
                <Button
                    label="Add"
                    icon="pi pi-plus"
                    @click="onAddKeynote"
                ></Button>
            </div>
        </div>
        <div class="flex flex-row flex-wrap gap-2">
            <KeynoteTile
                v-for="key in keys"
                :key="key._id"
                :keynote="key"
                @click="onOpenKeynote(key._id)"
            />
        </div>
    </PageWrapper>
</template>
