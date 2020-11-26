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
import vulnerabilityDetails2 from '../layout/siteInformation/siteScan/vulnerabilityDetails/vulnerabilityDetails2.vue'
 import vulnerabilityDetails from '../layout/siteInformation/siteScan/vulnerabilityDetails/vulnerabilityDetails.vue'
import gitHub from '../layout/gitHub/gitHub.vue'
import Agreement from '../views/agreement/agreement.vue'
import Forget from '../views/forget/forget.vue'
import issueTasks from '../layout/issueTasks/issueTasks.vue'
import createProject from '../layout/scriptFish/createProject/createProject.vue'
import projectManagement from '../layout/scriptFish/projectManagement/projectManagement.vue'
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
        name: 'personalSettings',
        meta:{
          keepAlive:true,
          activeIndex:"personalSettings"
        },
      },
      {
        path: 'dashboard',
        component: dashboard,
        name: 'dashboard',
        meta:{
          keepAlive:true,
          activeIndex:"dashboard"
        },
      },
      {
        path:'siteInformation',
        component: siteInformation,
        name: 'siteInformation',
        meta:{
          keepAlive:true,
          activeIndex:"siteInformation",
          defaultOpenKeys:"sub1"
        },
      },
      {
        path: 'siteInformation/siteScan',
        component: siteScan,
        name: 'siteInformation/siteScan',
        meta:{
          keepAlive:true,
          activeIndex:"siteInformation",
          defaultOpenKeys:"sub1"
        },
      },
      {
        path: 'siteInformation/siteScan/vulnerabilityDetails',
        component: vulnerabilityDetails,
        name: 'siteInformation/siteScan/vulnerabilityDetails',
        meta:{
          keepAlive:true,
          activeIndex:"siteInformation",
          defaultOpenKeys:"sub1"
        },
      },
      {
        path: 'siteInformation/siteScan/vulnerabilityDetails2',
        component: vulnerabilityDetails2,
        name: 'siteInformation/siteScan/vulnerabilityDetails2',
        meta:{
          keepAlive:true,
          activeIndex:"siteInformation",
          defaultOpenKeys:"sub1"
        },
      },
      // {
      //   path: 'siteInformation/siteScan/domainNameDetails',
      //   component: domainNameDetails,
      //   name: 'siteInformation/siteScan/domainNameDetails'
      // },
      {
        path: 'issueTasks',
        component: issueTasks,
        name: 'issueTasks',
        meta:{
          keepAlive:true,
          activeIndex:"issueTasks",
          defaultOpenKeys:"sub1"
        },
        
      },
      {
        path: 'gitHub',
        component: gitHub,
        name: 'gitHub',
        meta:{
          keepAlive:true,
          activeIndex:"gitHub",
          defaultOpenKeys:"sub3"
        },
      },
      {
        path: 'createProject',
        component: createProject,
        name: 'createProject',
        meta:{
          keepAlive:true,
          activeIndex:"createProject",
          defaultOpenKeys:"sub4"
        },
      },
      {
        path: 'projectManagement',
        component: projectManagement,
        name: 'projectManagement',
        meta:{
          keepAlive:true,
          activeIndex:"projectManagement",
          defaultOpenKeys:"sub4"
        },
      },
      
    ]
  },
]
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes,
  // scrollBehavior(to,from,savePosition){
  //   if(savePosition){
  //     return savePosition
  //   }
  //   else{
  //     return{
  //       x:0,
  //       y:0
  //     }
  //   }
  // }
})

export default router
