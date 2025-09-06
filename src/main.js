// import './assets/main.css'

import { createApp,provide } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import AlertBox from './components/AlertBox.vue'
import FormatPlugin from './plugins/format' // 載入插件
import router from './router'
import { createPinia } from 'pinia'
import { formatSecondsToHHMMSS } from './utils/format'
import api from '@/service/api'
const pinia = createPinia()
const app = createApp(App)

const start = async()=> {
    const res = await api.getOptions()
    const value = res.result
    app.provide('allOptions', value)
    app.config.globalProperties.$formatSecondsToHHMMSS = formatSecondsToHHMMSS
    app.use(FormatPlugin) // 註冊插件
    app.use(pinia)
    app.use(router)
    app.use(ElementPlus)
    app.component('AlertBox', AlertBox).mount('#app')
}
start()


document.title = import.meta.env.VITE_APP_TITLE
