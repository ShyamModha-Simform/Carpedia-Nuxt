<template>
    <NuxtLayout>
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
    console.log(useAuthStore().username);
</script>
