<script setup>
    import { reactive, ref } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { email, required } from "@vuelidate/validators"
    import { useVuelidate } from "@vuelidate/core"
    import { useToast } from "primevue/usetoast"

    import Card from 'primevue/card';
    import PrimeButton from 'primevue/button'
    import InputText from 'primevue/inputtext'
    import InputPassword from 'primevue/password'

    import { useAuthStore } from '@/stores/auth';

    const state = reactive({
        email: '',
        password: '',
        name: '',
    });

    const rules = {
        email: { required, email },
        password: { required },
        name: { required },
    };

    const authStore = useAuthStore()
    const router = useRouter()
    const route = useRoute()
    const submitted = ref(false)
    const toast = useToast()

    const v$ = useVuelidate(rules, state)

    const handleSubmit = (isFormValid) => {
        submitted.value = true

        if (!isFormValid) return

        authStore
            .register({
                email: state.email,
                password: state.password,
                name: state.name,
            })
            .then(() => {
                toast.add({
                    severity:'success',
                    summary: 'Account created',
                    detail:'Successfully registered, log in to use one-conf!',
                    life: 3000
                })

                router.push({ name: 'home', query: route.query })
            })
    }

    const onClickLogin = () => router.push({ name: 'home', query: route.query })
</script>

<template>
    <Card :style="{ width: '400px' }">
        <template #title>
            Register
        </template>
        <template #content>
            <form
                class="flex flex-column p-fluid gap-2"
                @submit.prevent="handleSubmit(!v$.$invalid)"
            >
                <div class="field">
                    <div class="p-float-label p-input-icon-right">
                        <i class="pi pi-user"></i>
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
                    <div class="p-float-label p-input-icon-right">
                        <i class="pi pi-envelope"></i>
                        <InputText
                            id="email"
                            v-model="v$.email.$model"
                            :class="{'p-invalid':v$.email.$invalid && submitted}"
                            aria-describedby="email-error"
                        />
                        <label for="email" :class="{'p-error': v$.email.$invalid && submitted}">Email</label>
                    </div>
                    <span v-if="v$.email.$error && submitted">
                        <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
                            <small class="p-error">{{error.$message}}</small>
                        </span>
                    </span>
                    <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error">
                        {{ v$.email.required.$message.replace('Value', 'Email') }}
                    </small>
                </div>
                <div class="field">
                    <div class="p-float-label">
                        <InputPassword
                            id="password"
                            v-model="v$.password.$model"
                            :class="{'p-invalid':v$.password.$invalid && submitted}"
                            aria-describedby="password-error"
                            toggleMask
                            :feedback="false"
                        />
                        <label for="password" :class="{'p-error': v$.password.$invalid && submitted}">Password</label>
                    </div>
                    <span v-if="v$.password.$error && submitted">
                        <span id="password-error" v-for="(error, index) of v$.password.$errors" :key="index">
                            <small class="p-error">{{error.$message}}</small>
                        </span>
                    </span>
                    <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error">
                        {{ v$.password.required.$message.replace('Value', 'Password') }}
                    </small>
                </div>
                <div class="flex flex-row justify-between gap-1">
                    <PrimeButton
                        type="button"
                        label="Login"
                        class="p-button-help"
                        @click="onClickLogin"
                    />
                    <PrimeButton
                        type="submit"
                        label="Submit"
                        icon="pi pi-send"
                        iconPos="right"
                    />
                </div>
            </form>
        </template>
    </Card>
</template>
