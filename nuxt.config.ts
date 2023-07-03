// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            apiBase: process.env.VITE_BASE_URL,
        },
    },
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
                autoImports: true,
                componentNames: {
                    Form: "vForm",
                    Field: "vField",
                },
            },
        ],
    ],
    build: {
        transpile: ["vuetify"],
    },
    app: {
        pageTransition: {
            name: "fade-pages",
            appear: true,
            mode: "out-in",
        },
        head: {
            link: [
                {
                    rel: "icon",
                    type: "image/png",
                    href: "https://www.freeiconspng.com/uploads/honda-brv-red-png-pictures-3.png",
                },
            ],
        },
    },
    css: [
        "bootstrap/dist/css/bootstrap.min.css",
        "vuetify/lib/styles/main.sass",
        "@/assets/css/main.css",
    ],
});
