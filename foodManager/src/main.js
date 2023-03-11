import { createApp } from 'vue'
import App from './App.vue'
import router from './components/Router/index.js'
import './assets/main.css'
import store from './store.js'

createApp(App).use(router).use(store).mount('#app')
