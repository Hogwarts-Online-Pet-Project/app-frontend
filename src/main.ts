import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


import 'vue3-toastify/dist/index.css';

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import api_instance from './utils/axios'

import Vue3Toasity, { ToastContainerOptions } from 'vue3-toastify';

const vuetify = createVuetify({
  components,
  directives,
})

const apiUrl = "http://localhost:8547/api/v1/crud";
import prismaAutoCrudGui from "@moreillon/prisma-auto-crud-vuetify";

const app = createApp(App)

app.use(createPinia())
app.use(vuetify)
app.config.globalProperties.$axios = api_instance

app.use(prismaAutoCrudGui, { router, apiUrl, api_instance });
app.use(router)

app.use(
  Vue3Toasity,
  {
    style: {
      opacity: '1',
      userSelect: 'initial',
    },
    autoClose: 2000,
    multiple: true
  } as ToastContainerOptions,
);

app.mount('#app')
