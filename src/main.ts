import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vuetify/styles/main.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import { router } from './router'
import { createPinia } from 'pinia'
import withUUID from 'vue-uuid'

import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)

const pinia = createPinia()

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(withUUID)

app.use(Vue3Toastify, {
  limit: 3,
} as ToastContainerOptions)

app.mount('#app')
