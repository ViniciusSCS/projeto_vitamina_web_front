import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import * as Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.prototype.$http = axios
Vue.prototype.$urlApi = 'http://localhost:8000/api/'

const app = createApp(App)

app.use(VueAxios, axios)

app.use(createPinia())
app.use(router)

app.mount('#app')
