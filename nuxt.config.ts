// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  srcDir: "src",

  css: ["~/shared/assets/style/style.css"],

  dir: {
    pages: "../pages",
    public: "shared/public",
    assets: "shared/assets",
  },

  modules: ["@pinia/nuxt"],

  ssr: false,

  components: false,
});