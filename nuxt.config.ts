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
        "@nuxtjs/mdc",
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
    aos: {
        // // Global settings:
        // disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        // startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
        // initClassName: "aos-init", // class applied after initialization
        // animatedClassName: "aos-animate", // class applied on animation
        // useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        // disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        // debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        // throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

        // // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 100, // offset (in px) from the original trigger point
        // delay: 0, // values from 0 to 3000, with step 50ms
        duration: 700, // values from 0 to 3000, with step 50ms
        // easing: "ease", // default easing for AOS animations
        // once: false, // whether animation should happen only once - while scrolling down
        // mirror: false, // whether elements should animate out while scrolling past them
        // anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
    },
})