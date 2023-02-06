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

    import { create, update } from '@/API/conferences'

    const props = defineProps({
        location: {
            type: String,
            default: ''
        },
        id: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        startDate: {
            type: Date,
            default: null,
        },
        endDate: {
            type: Date,
            default: null,
        },
        isEditing: {
            type: Boolean,
            default: false,
        },
    });

    const state = reactive({
        location: props.location,
        name: props.name,
        description: props.description,
        date: [props.startDate, props.endDate],
    });

    const rules = {
        location: { required },
        name: { required },
        description: { required },
        date: { required },
    };

    const router = useRouter()
    const submitted = ref(false)
    const toast = useToast()

    const v$ = useVuelidate(rules, state)

    const sendCreate = () => {
        return create({
            location: state.location,
            name: state.name,
            description: state.description,
            startDate: state.date[0].toISOString(),
            endDate: state.date[1].toISOString()
        });
    }

    const sendUpdate = () => {
        return update({
            id: props.id,
            location: state.location,
            name: state.name,
            description: state.description,
            startDate: state.date[0].toISOString(),
            endDate: state.date[1].toISOString()
        });
    }

    const handleSubmit = (isFormValid) => {
        submitted.value = true

        if (!isFormValid) return

        (props.isEditing ? sendUpdate() : sendCreate())
            .then(conference => {
                router.replace(`/conference/${conference._id}`);

                toast.add({
                    severity:'success',
                    summary: 'Conference saved',
                    detail:'Successfully saved conference!',
                    life: 2000
                });
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
                {{ v$.name.required.$message.replace('Value', 'Date') }}
            </small>
        </div>
        <div class="flex flex-row justify-end gap-1">
            <PrimeButton
                type="submit"
                label="Create"
                icon="pi pi-send"
                iconPos="right"
            />
        </div>
    </form>
</template>
