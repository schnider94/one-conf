<script setup>
    import { ref, onMounted } from 'vue';

    import PageWrapper from '@/components/PageWrapper.vue';
    import { getById } from '@/API/conferences';
    import { byConferenceId as getKeynotesByConfId } from '@/API/keynotes';
    import ConferenceTile from '@/components/ConferenceTile.vue';
    import KeynoteTile from '@/components/KeynoteTile.vue';

    const conf = ref(null);
    const keys = ref(null);

    const props = defineProps({
        id: {
            type: String,
            require: true
        }
    });

    onMounted(async () => {
        const conference = await getById(props.id);

        const keynotes = await getKeynotesByConfId(conference._id);

        conf.value = conference
        keys.value = keynotes
    })
</script>

<template>
    <PageWrapper
        title="Conference"
        :isLoading="conf === null"
    >
        <ConferenceTile
            :name="conf.name"
            :location="conf.location"
        />
        <h3>
            Keynotes
        </h3>
        <div class="flex flex-row flex-wrap gap-2">
            <KeynoteTile
                v-for="key in keys"
                :key="key._id"
                :name="key.name"
                :location="key.location"
            />
        </div>
    </PageWrapper>
</template>
