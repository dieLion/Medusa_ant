import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/index.vue'
import register from '../views/register/register.vue'

import layout from '../layout'
// import personalSettings from '../layout/personalSettings'
import personalSettings2 from '../layout/personalSettings/index2'
import dashboard from '../layout/dashboard'
import siteScan from '../layout/siteScan'
import vulnerabilityDetails from '../layout/siteScan/vulnerability/vulnerabilityDetails/vulnerabilityDetails.vue'
import domainNameDetails from '../layout/siteScan/portInformation/domainNameDetails/domainNameDetails.vue'
import gitHub from '../layout/gitHub/gitHub.vue'


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
    path: '/Register',
    name: 'Register',
    // component: Login
    component: register
    // component:()=> import('@views/login/index')
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
        path: 'siteScan',
        component: siteScan,
        name: 'siteScan'
      },
      {
        path: 'siteScan/vulnerabilityDetails',
        component: vulnerabilityDetails,
        name: 'siteScan/vulnerabilityDetails'
      },
      {
        path: 'siteScan/domainNameDetails',
        component: domainNameDetails,
        name: 'siteScan/domainNameDetails'
      },
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
