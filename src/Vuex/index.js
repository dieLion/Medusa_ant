import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    storeToken: localStorage.getItem('storeToken')?localStorage.getItem('storeToken'):'',
    userinfo:{},
    avatar:'',
    active_scan_id:'null',//主动扫描目标单个漏洞详细内容查询key
    scan_info_id:'null'//主动扫描目标单个漏洞详细内容查询接口
  },
  mutations: {
    tokenLogin(state,usertoken){
      state.storeToken=usertoken
      localStorage.setItem('storeToken',state.storeToken)
      console.log(state.storeToken)
    },
    userinfo(state,userinfo){
      state.userinfo=userinfo
      console.log(state.userinfo)
    },
    avatar(state,avatar){
      state.avatar = avatar
      console.log(state.avatar)
    },
    active_scan_id(state,active_scan_id){
      state.active_scan_id = active_scan_id
    },
    scan_info_id(state,scan_info_id){
      state.scan_info_id=scan_info_id
    }
  },
  actions: {
  },
  modules: {
  }
})
