import { createApp } from 'vue'
import App from './App.vue'
import router from './components/Router/index.js'
import './assets/main.css'
import store from './store.js'
// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

// const vuetify = createVuetify({
//   components,
//   directives,
// })

createApp(App).use(router).use(store).mount('#app')
