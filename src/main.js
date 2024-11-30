import { createApp } from 'vue'
import App from './App.vue'
// 导入 Vant 组件库
import Vant from 'vant'
import 'vant/lib/index.css'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia';  // 引入 Pinia
const app = createApp(App)

// 使用 Vant 插件
app.use(Vant)
app.use(router)
app.use(ElementPlus)
app.use(createPinia());  // 使用 Pinia
app.mount('#app')