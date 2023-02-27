import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import pinia from '@/store/pinia'

export const app = createApp(App)
app.use(pinia)
app.use(router)




import utils from "./utils/utils"
const helperUtils = {
    install() {
        app.helpers = utils
        app.config.globalProperties.$utils = utils
    }
}
app.use(helperUtils)



app.mount('#app')