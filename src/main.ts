import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import store from './stores'
import App from './App.vue'
import router from './router'
// import './assets/main.css'
import './assets/css/index.css'
import 'normalize.css/normalize.css'

const app = createApp(App)

// 将api挂载到全局
import api from './api/index'
app.config.globalProperties.$api = api

// app.use(createPinia())
app.use(store)
app.use(router)

app.mount('#app')
