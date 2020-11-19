import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/index.vue'
import register from '../views/register/register.vue'

import layout from '../layout'
// import personalSettings from '../layout/personalSettings'
import personalSettings2 from '../layout/personalSettings/index2'
import dashboard from '../layout/dashboard'
import siteScan from '../layout/siteInformation/siteScan/siteScan.vue'
import siteInformation from '../layout/siteInformation/siteInformation.vue'
import vulnerabilityDetails from '../layout/siteInformation/siteScan/vulnerabilityDetails/vulnerabilityDetails2.vue'
// import domainNameDetails from '../layout/siteInformation/siteScan/portInformation/domainNameDetails/domainNameDetails.vue'
import gitHub from '../layout/gitHub/gitHub.vue'
import Agreement from '../views/agreement/agreement.vue'
import Forget from '../views/forget/forget.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    // component: Login
    component: login
    // component:()=> import('@views/login/index')
  },
  {
    path: '/Agreement',
    name: 'Agreement',
    // component: Login
    component: Agreement
    // component:()=> import('@views/login/index')
  },
  {
    path: '/Register',
    name: 'Register',
    // component: Login
    component: register
    // component:()=> import('@views/login/index')
  },
  {
    path: '/Forget',
    name: 'Forget',
    // component: Login
    component: Forget
  },
  {
    path: '/layout',
    name: 'layout',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: layout,
    redirect: '/layout/personalSettings',
    children: [
      {
        path: 'personalSettings',
        component: personalSettings2,
        name: 'personalSettings'
      },
      {
        path: 'dashboard',
        component: dashboard,
        name: 'dashboard'
      },
      {
        path:'siteInformation',
        component: siteInformation,
        name: 'siteInformation'
      },
      {
        path: 'siteInformation/siteScan',
        component: siteScan,
        name: 'siteInformation/siteScan'
      },
      {
        path: 'siteInformation/siteScan/vulnerabilityDetails',
        component: vulnerabilityDetails,
        name: 'siteInformation/siteScan/vulnerabilityDetails'
      },
      // {
      //   path: 'siteInformation/siteScan/domainNameDetails',
      //   component: domainNameDetails,
      //   name: 'siteInformation/siteScan/domainNameDetails'
      // },
      {
        path: 'gitHub',
        component: gitHub,
        name: 'gitHub'
      },
    ]
  },
]
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes
})

export default router
