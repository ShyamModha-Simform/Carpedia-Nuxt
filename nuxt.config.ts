// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    imports: {
        dirs: ["stores"],
    },
    modules: [
        "@pinia/nuxt",
        "@vueuse/nuxt",
        [
            "@vee-validate/nuxt",
            {
                // disable or enable auto imports
                autoImports: true,
                // Use different names for components
                componentNames: {
                    Form: "vForm",
                    Field: "vField",
                },
            },
        ],
    ],

    css: ["bootstrap/dist/css/bootstrap.min.css", "@/assets/css/main.css"],
});
