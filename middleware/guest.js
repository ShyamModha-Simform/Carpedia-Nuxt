import { useStorage } from "@vueuse/core";

export default defineNuxtRouteMiddleware((to, from) => {
    const isAuthenticated = useStorage("isAuthenticated", false).value;

    if (process.server) return;
    if (isAuthenticated) {
        return navigateTo(`/`);
    } else {
        return;
    }
});
