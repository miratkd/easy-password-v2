// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  devServer: {host: '192.168.0.183'},
  css: ["~/assets/main.sass"],
  modules: ['@pinia/nuxt'],
  app:{
    head:{
      title: 'Easy Password'
    }
  }
})