import { createRouter,createWebHistory } from 'vue-router'
import LoginPage from '../Pages/LoginPage.vue'
import AboutPage from '../Pages/AboutPage.vue'
import ProfilePage from '../Pages/ProfilePage.vue'
import DonorHomePage from '../Pages/DonorHomePage.vue'
import BeneficiaryHomePage from '../Pages/BeneficiaryHomePage.vue'
import BeneficiaryFormPage from '../Pages/BeneficiaryFormPage.vue'
import DonorFormPage from '../Pages/DonorFormPage.vue'
import UpdateDonorProfilePage from '../Pages/UpdateDonorProfilePage.vue'
import UpdateBeneficiaryProfilePage from '../Pages/UpdateBeneficiaryProfilePage.vue'
import AdminHomePage from '../Pages/AdminHomePage.vue'
import AdminFormPage from '../Pages/AdminFormPage.vue'
import Details from '@/components/Details.vue'
import AdminNewFormPage from '../Pages/AdminNewFormPage.vue'
import AdminShowDonationsPage from '../Pages/AdminShowDonationsPage.vue'
import AdminDeletePage from '../Pages/AdminDeletePage.vue'

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
        path: '/profile',
        name: 'ProfilePage',
        component: ProfilePage
    },
    {
        path: '/donorhome',
        name: 'DonorHomePage',
        component: DonorHomePage
    },
    {
        path: '/beneficiaryhome',
        name: 'BeneficiaryHomePage',
        component: BeneficiaryHomePage
    },
    {
        path: '/beneficiaryform',
        name: 'BeneficiaryFormPage',
        component: BeneficiaryFormPage
    },
    {
        path: '/donorform',
        name: 'DonorFormPage',
        component: DonorFormPage
    },
    {
        path: '/updatedonorprofile',
        name: 'UpdateDonorProfilePage',
        component: UpdateDonorProfilePage
    },
    {
        path: '/updatebeneficiaryprofile',
        name: 'UpdateBeneficiaryProfilePage',
        component: UpdateBeneficiaryProfilePage
    },
    {
        path: '/adminhome',
        name: 'AdminHomePage',
        component: AdminHomePage
    },
    {
        path: '/adminform',
        name: 'AdminFormPage',
        component: AdminFormPage
    },
    {
        path: '/adminnewform',
        name: 'AdminNewFormPage',
        component: AdminNewFormPage
    },
    {
        path: '/adminshowdonations',
        name: 'AdminShowDonationsPage',
        component: AdminShowDonationsPage
    },
    {
        path: '/admindelete',
        name: 'AdminDeletePage',
        component: AdminDeletePage
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router