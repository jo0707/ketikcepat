import { separator } from "#tailwind-config"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        "@nuxt/ui",
        "@pinia/nuxt",
        "nuxt-aos",
        "@vueuse/nuxt",
        "@nuxtjs/seo",
        "@nuxt/fonts",
        "@nuxt/image",
        "@nuxtjs/mdc"
    ],
    app: {
        head: {
            titleTemplate: "%s %separator %siteName",
            templateParams: {
                separator: "-",
            },
        },
    },
    colorMode: {
        preference: "light",
    },
    site: {
        url: "https://ketikcepat.com",
        name: "Ketik Cepat!",
        description:
            "Ketik Cepat! adalah sebuah website untuk latihan mengetik dalam bahasa Inggris dan Indonesia yang bertujuan melatih anak bangsa dalam menggunakan komputer sembari belajar bahasa Inggris.",
        defaultLocale: "id", // not needed if you have @nuxtjs/i18n installed
    },
})