<script setup>
    import { reactive, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { required } from "@vuelidate/validators"
    import { useVuelidate } from "@vuelidate/core"
    import { useToast } from "primevue/usetoast"
    import PrimeButton from 'primevue/button'
    import InputText from 'primevue/inputtext'
    import Calendar from 'primevue/calendar'
    import Textarea from 'primevue/textarea';
    import AutoComplete from 'primevue/autocomplete';

    import { create, remove, update } from '@/API/keynotes'
    import { search } from '@/API/user'
    import { useCurrentConference } from '@/stores/current-conference'

    const props = defineProps({
        conferenceId: {
            type: String,
            require: true,
        },
        id: {
            type: String,
            default: null
        },
        location: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        secretDescription: {
            type: String,
            default: null
        },
        startDate: {
            type: Date,
            default: null,
        },
        endDate: {
            type: Date,
            default: null,
        },
        speakers: {
            type: Array,
            default: () => [],
        },
        isEditing: {
            type: Boolean,
            default: false,
        },
    });

    const currentConferenceStore = useCurrentConference()

    const state = reactive({
        location: props.location,
        name: props.name,
        description: props.description,
        secretDescription: props.secretDescription,
        date: props.isEditing ? [props.startDate, props.endDate] : [],
        speakers: props.speakers,
    });

    const rules = {
        location: { required },
        name: { required },
        description: { required },
        secretDescription: {},
        date: { required },
        speakers: { required }
    };

    const router = useRouter()
    const submitted = ref(false)
    const toast = useToast()

    const filteredUsers = ref()

    const v$ = useVuelidate(rules, state)

    const sendCreate = () => {
        const speakerIds = state.speakers.map(speaker => speaker._id);

        return create({
            location: state.location,
            name: state.name,
            description: state.description,
            secretDescription: state.secretDescription,
            startDate: state.date[0].toISOString(),
            endDate: state.date[1].toISOString(),
            conference: props.conferenceId,
            speakers: speakerIds
        });
    }

    const sendUpdate = () => {
        return update({
            id: props.id,
            location: state.location,
            name: state.name,
            description: state.description,
            secretDescription: state.secretDescription,
            startDate: state.date[0].toISOString(),
            endDate: state.date[1].toISOString(),
            conference: props.conferenceId
        });
    }

    const handleSubmit = (isFormValid) => {
        submitted.value = true

        if (!isFormValid) return

        (props.isEditing ? sendUpdate() : sendCreate())
            .then(keynote => {
                router.replace(`/keynote/${keynote._id}`);

                toast.add({
                    severity:'success',
                    summary: 'Keynote saved',
                    detail:'Successful saved keynote!',
                    life: 2000
                });
            })
    }

    const onDelete = () => {
        remove(props.id)
            .then(() => {
                toast.add({
                    severity:'success',
                    summary: 'Keynote deleted',
                    detail:'Successfully deleted keynote!',
                    life: 2000
                });

                router.replace(`/conference/${props.conferenceId}`);
            })
    }

    const searchUsers = (event) => {
        if (!event.query.trim().length) {
            filteredUsers.value = []

            return;
        }

        search(event.query.trim())
            .then(users => {
                filteredUsers.value = users.map(user => ({
                    ...user,
                    label: `${user.name} <${user.email}>`
                }));
            });
    }
</script>

<template>
    <form
        class="flex flex-column p-fluid pt-3 gap-3"
        @submit.prevent="handleSubmit(!v$.$invalid)"
    >
        <div class="field">
            <div class="p-float-label">
                <InputText
                    id="name"
                    v-model="v$.name.$model"
                    :class="{'p-invalid':v$.name.$invalid && submitted}"
                    aria-describedby="name-error"
                />
                <label for="name" :class="{'p-error': v$.name.$invalid && submitted}">Name</label>
            </div>
            <span v-if="v$.name.$error && submitted">
                <span id="name-error" v-for="(error, index) of v$.name.$errors" :key="index">
                    <small class="p-error">{{error.$message}}</small>
                </span>
            </span>
            <small v-else-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response" class="p-error">
                {{ v$.name.required.$message.replace('Value', 'Name') }}
            </small>
        </div>
        <div class="field">
            <div class="p-float-label">
                <Textarea
                    id="description"
                    v-model="v$.description.$model"
                    autoResize
                    rows="3"
                    :class="{'p-invalid':v$.description.$invalid && submitted}"
                    aria-describedby="description-error"
                ></Textarea>
                <label for="description" :class="{'p-error': v$.description.$invalid && submitted}">Description</label>
            </div>
            <span v-if="v$.description.$error && submitted">
                <span id="description-error" v-for="(error, index) of v$.description.$errors" :key="index">
                    <small class="p-error">{{error.$message}}</small>
                </span>
            </span>
            <small v-else-if="(v$.description.$invalid && submitted) || v$.description.$pending.$response" class="p-error">
                {{ v$.description.required.$message.replace('Value', 'Description') }}
            </small>
        </div>
        <div
            v-if="currentConferenceStore.id === conferenceId"
            class="field"
        >
            <div class="p-float-label">
                <Textarea
                    id="secretDescription"
                    v-model="v$.secretDescription.$model"
                    autoResize
                    rows="3"
                    :class="{'p-invalid':v$.secretDescription.$invalid && submitted}"
                    aria-describedby="secretDescription-error"
                ></Textarea>
                <label for="secretDescription" :class="{'p-error': v$.secretDescription.$invalid && submitted}">Secret Description</label>
            </div>
            <span v-if="v$.secretDescription.$error && submitted">
                <span id="secretDescription-error" v-for="(error, index) of v$.secretDescription.$errors" :key="index">
                    <small class="p-error">{{error.$message}}</small>
                </span>
            </span>
            <small v-else-if="(v$.secretDescription.$invalid && submitted) || v$.secretDescription.$pending.$response" class="p-error">
                {{ v$.secretDescription.required.$message.replace('Value', 'Secret Description') }}
            </small>
        </div>
        <div class="field">
            <div class="p-float-label">
                <InputText
                    id="location"
                    v-model="v$.location.$model"
                    :class="{'p-invalid':v$.location.$invalid && submitted}"
                    aria-describedby="location-error"
                />
                <label for="location" :class="{'p-error': v$.location.$invalid && submitted}">Location</label>
            </div>
            <span v-if="v$.location.$error && submitted">
                <span id="location-error" v-for="(error, index) of v$.location.$errors" :key="index">
                    <small class="p-error">{{error.$message}}</small>
                </span>
            </span>
            <small v-else-if="(v$.location.$invalid && submitted) || v$.location.$pending.$response" class="p-error">
                {{ v$.location.required.$message.replace('Value', 'Location') }}
            </small>
        </div>
        <div class="field">
            <div class="p-float-label">
                <Calendar
                    inputId="date"
                    v-model="v$.date.$model"
                    selectionMode="range"
                    :manualInput="false"
                    :minDate="new Date()"
                    showTime
                />
                <label for="date" :class="{'p-error': v$.date.$invalid && submitted}">Date</label>
            </div>
            <span v-if="v$.date.$error && submitted">
                <span id="date-error" v-for="(error, index) of v$.date.$errors" :key="index">
                    <small class="p-error">{{error.$message}}</small>
                </span>
            </span>
            <small v-else-if="(v$.date.$invalid && submitted) || v$.date.$pending.$response" class="p-error">
                {{ v$.date.required.$message.replace('Value', 'Date') }}
            </small>
        </div>
        <div class="field">
            <div class="p-float-label">
                <AutoComplete
                    :multiple="true"
                    v-model="v$.speakers.$model"
                    :suggestions="filteredUsers"
                    @complete="searchUsers($event)"
                    optionLabel="label"
                />
                <label for="speakers" :class="{'p-error': v$.speakers.$invalid && submitted}">Speakers</label>
            </div>
            <span v-if="v$.date.$error && submitted">
                <span id="speakers-error" v-for="(error, index) of v$.speakers.$errors" :key="index">
                    <small class="p-error">{{error.$message}}</small>
                </span>
            </span>
            <small v-else-if="(v$.speakers.$invalid && submitted) || v$.speakers.$pending.$response" class="p-error">
                {{ v$.speakers.required.$message.replace('Value', 'Speakers') }}
            </small>
        </div>
        <div class="flex flex-row justify-center gap-1">
            <PrimeButton
                v-if="isEditing"
                type="button"
                label="Delete"
                class="p-button-danger"
                icon="pi pi-times"
                iconPos="left"
                @click="onDelete"
            />
            <PrimeButton
                type="submit"
                label="Create"
                icon="pi pi-send"
                iconPos="right"
            />
        </div>
    </form>
</template>
