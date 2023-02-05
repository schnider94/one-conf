<script setup>
    import { useRouter } from 'vue-router';
    import Button from 'primevue/button';

    const router = useRouter()

    defineProps({
        title: {
            type: String,
            required: true,
        }
    })

    const onHome = () => {
        router.push('/dashboard')
    }
</script>

<template>
    <div class="w-full flex flex-row align-items-center bg-blue-400 sticky" :style="{ height: '60px' }">
        <div class="w-3">
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
        <div class="w-3">
            
        </div>
    </div>
</template>