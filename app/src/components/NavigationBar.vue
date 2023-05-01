<script setup>
    import { useRouter } from 'vue-router';
    import Button from 'primevue/button';
    
    import { useAuthStore } from '@/stores/auth';
    import { useCurrentConference } from '@/stores/current-conference';

    const router = useRouter()
    const authStore = useAuthStore();
    const currentConferenceStore = useCurrentConference()

    defineProps({
        title: {
            type: String,
            required: true,
        }
    })

    const onHome = () => {
        router.push('/dashboard');
    }

    const onCurrentConference = () => {
        router.push(`/conference/${currentConferenceStore._id}`);
    }

    const onLogout = () => {
        authStore.logout();

        router.push('/');
    }
</script>

<template>
    <div class="w-full flex flex-col sticky" :style="{ height: '80px' }">
        <div
            v-if="currentConferenceStore.name"
            class="w-full bg-pink-500 flex flex-row align-items-center justify-content-center"
            :style="{ height: '20px' }"
            @click="onCurrentConference"
        >
            <h2 class="text-sm text-center">
                {{ currentConferenceStore.name }}
            </h2>
        </div>
        <div class="w-full flex flex-row align-items-center bg-blue-400">
            <div class="w-3 flex flex-row justify-content-start align-items-center">
                <Button
                    icon="pi pi-home"
                    class="p-button-text p-button-lg text-800"
                    @click="onHome"
                ></Button>
            </div>
            <div class="w-6">
                <h1 class="text-xl text-center">
                    {{ title }}
                </h1>
            </div>
            <div class="w-3 flex flex-row justify-content-end align-items-center">
                <Button
                    icon="pi pi-sign-out"
                    class="p-button-text p-button-lg text-800"
                    @click="onLogout"
                ></Button>
            </div>
        </div>
    </div>
</template>