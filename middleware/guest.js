import { useStorage } from "@vueuse/core";

export default defineNuxtRouteMiddleware((to, from) => {
    const isAuthenticated = useStorage("isAuthenticated", false).value;
    // console.log(to.path);
    if (process.server) return;
    if (isAuthenticated) {
        return navigateTo(`/`);
    } else {
        return;
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
