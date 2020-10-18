import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './Vuex'
import axios from 'axios'
import 'lib-flexible'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css' // or 'ant-design-vue/dist/antd.less'
import echarts from 'echarts'
import api from './api/rules'
Vue.prototype.$echarts = echarts
Vue.prototype.$axios=axios
Vue.prototype.$api = api

Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
