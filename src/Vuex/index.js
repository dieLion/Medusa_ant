import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    storeToken: localStorage.getItem('storeToken')?localStorage.getItem('storeToken'):'',
    userinfo:{}
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
    }
  },
  actions: {
  },
  modules: {
  }
})
