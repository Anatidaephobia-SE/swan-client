import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './authentication'
import snackbarModule from "@/store/snackbar"
import workspaceModule from '@/store/workspace'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: authModule,
    snackbar: snackbarModule,
    workspace: workspaceModule
  }
})
