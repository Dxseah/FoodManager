import { createRouter,createWebHistory} from 'vue-router'
import LoginPage from '../Pages/LoginPage.vue'

const routes = [
    {
        path: '/',
        name: 'LoginPage',
        component: LoginPage
    },
    // {
    //     path: '/about',
    //     name: 'About',
    //     component: About
    // },
    // {
    //     path: '/profit',
    //     name: 'OnlyProfit',
    //     component: OnlyProfit
    // },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router