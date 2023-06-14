import { useStorage } from "@vueuse/core";

export default defineNuxtRouteMiddleware((to, from) => {
    const isAuthenticated = useStorage("isAuthenticated", false).value;

    if (isAuthenticated) {
        return;
    } else {
        return navigateTo("/login");
    }

    // if (isAuthenticated) {
    //     if (to.path == "/login" || to.path == "/register") {
    //         return navigateTo("/");
    //     }
    // } else {
    //     if (to.path == "/login" || to.path == "/register") {
    //         return;
    //     } else {
    //         return navigateTo("/login");
    //     }
    // }
});
