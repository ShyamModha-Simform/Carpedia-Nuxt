<template>
    <NuxtLayout>
        <NuxtLoadingIndicator>
            <RectangularLoader />
        </NuxtLoadingIndicator>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup>
    import { useStorage } from "@vueuse/core";
    import useAuthStore from "./stores/authStore";

    useAuthStore().isAuthenticated = useStorage("token", null).value
        ? true
        : false;
    useAuthStore().username = useStorage("username", null).value;
</script>

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
