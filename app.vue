<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup>
    import { useStorage } from "@vueuse/core";
    import useAuthStore from "./stores/authStore";
    import useCarDataStore from "./stores/carData";
    const {
        public: { apiBase },
    } = useRuntimeConfig();
    const authStore = useAuthStore();

    const showHideSpinner = ref(true);
    onMounted(() => {
        showHideSpinner.value = false;
    });

    authStore.isAuthenticated = useStorage("token", null).value ? true : false;
    authStore.username = useStorage("username", null).value;
    authStore.apiBase = apiBase;
    useCarDataStore().apiBase = apiBase;
</script>

<script setup></script>

<style>
    .fade-pages-enter-active,
    .fade-pages-leave-active {
        transition: all 0.4s;
    }

    .fade-pages-enter-from,
    .fade-pages-leave-to {
        opacity: 0;
        transform: translateY(4rem);
    }
</style>
