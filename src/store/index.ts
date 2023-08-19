import Vue from 'vue'
import Vuex from 'vuex'
import task from './task'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {
    initialiseStore(state) {
      const savedState = localStorage.getItem('store')
      if (savedState) {
        this.replaceState({ ...state, ...JSON.parse(savedState) })
      }
    }
  },
  actions: {},
  modules: {
    task
  }
})
