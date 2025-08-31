// import './assets/main.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import AlertBox from './components/AlertBox.vue'
import FormatPlugin from './plugins/format' // 載入插件
import router from './router'
import { formatSecondsToHHMMSS } from './utils/format'
import { getAndCacheOptions } from './utils/optionService'
const app = createApp(App)
const pinia = createPinia()

const start = async () => {
  const options = await getAndCacheOptions()
  app.provide('options', options)
  app.config.globalProperties.$formatSecondsToHHMMSS = formatSecondsToHHMMSS
  app.use(FormatPlugin) // 註冊插件
  app.use(pinia)
  app.use(router)
  app.use(ElementPlus)
  app.component('AlertBox', AlertBox).mount('#app')
}
start()

document.title = import.meta.env.VITE_APP_TITLE
