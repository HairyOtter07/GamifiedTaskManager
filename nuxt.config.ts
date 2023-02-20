// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@sidebase/nuxt-session",
  ],
  css: [
    "~/assets/css/tailwind.css",
  ],
  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL,
  },
});
