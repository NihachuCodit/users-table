import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@/assets/main.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.config.errorHandler = (err, _instance, info) => {
  console.error(`[Vue error] ${info}:`, err)
  // In production, forward to a monitoring service (e.g. Sentry, Datadog)
}

app.mount('#app')
