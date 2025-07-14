// import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import AlertBox from './components/AlertBox.vue'
import FormatPlugin from './plugins/format' // 載入插件
import router from './router'

const app = createApp(App)
app.use(FormatPlugin) // 註冊插件
app.use(router)
app.use(ElementPlus)
app.component('AlertBox', AlertBox).mount('#app')
