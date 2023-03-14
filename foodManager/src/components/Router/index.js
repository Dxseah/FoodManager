import { createRouter,createWebHistory } from 'vue-router'
import LoginPage from '../Pages/LoginPage.vue'
import AboutPage from '../Pages/AboutPage.vue'
import SignUpPage from '../Pages/SignUpPage.vue'
import ProfilePage from '../Pages/ProfilePage.vue'
import DonorSignUpPage from '../Pages/DonorSignUpPage.vue'
import ForgetPasswordPage from '../Pages/ForgetPasswordPage.vue'

const routes = [
    {
        path: '/',
        name: 'LoginPage',
        component: LoginPage
    },
    {
        path: '/about',
        name: 'AboutPage',
        component: AboutPage
    },

    {
        path: '/signup',
        name: 'SignUpPage',
        component: SignUpPage
    },
    {
        path: '/profile',
        name: 'ProfilePage',
        component: ProfilePage
    },
    {
        path: '/donorsignup',
        name: 'DonorSignUpPage',
        component: DonorSignUpPage
    },
    {
        path: '/forgetpassword',
        name: 'ForgetPasswordPage',
        component: ForgetPasswordPage
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router