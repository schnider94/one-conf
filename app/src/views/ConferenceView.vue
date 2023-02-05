<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import Button from 'primevue/button';

    import PageWrapper from '@/components/PageWrapper.vue';
    import { getById } from '@/API/conferences';
    import { byConferenceId as getKeynotesByConfId } from '@/API/keynotes';
    import ConferenceTile from '@/components/ConferenceTile.vue';
    import KeynoteTile from '@/components/KeynoteTile.vue';

    const conf = ref(null);
    const keys = ref(null);

    const router = useRouter()

    const props = defineProps({
        id: {
            type: String,
            require: true
        }
    });

    onMounted(async () => {
        const conference = await getById(props.id);

        const keynotes = await getKeynotesByConfId(conference._id);

        conf.value = conference;
        keys.value = keynotes;
    });

    const onOpenKeynote = id => {
        router.push(`/keynote/${id}`);
    }

    const onAddKeynote = () => {
        router.push(`/conference/${conf.value._id}/add`);
    }
</script>

<template>
    <PageWrapper
        title="Conference"
        :isLoading="conf === null"
    >
        <ConferenceTile :conference="conf" />
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
