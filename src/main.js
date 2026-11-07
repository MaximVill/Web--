import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router/index.js'
import '../scss/main.scss'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// pinia подключается раньше роутера, чтобы guard видел восстановленный вход
createApp(App).use(pinia).use(router).mount('#app')
