// nuxt.config.ts  
export default defineNuxtConfig({
    ssr: false,
    css: [
        'vuetify/lib/styles/main.sass',
        '@mdi/font/css/materialdesignicons.min.css',
        '@/assets/css/main.css',
    ],
    build: {
        transpile: ['vuetify'],
    },
    modules: [
        '@pinia/nuxt',
    ],
    postcss: {
        plugins: {
            autoprefixer: {},
            tailwindcss: {},
        },
    },
})
