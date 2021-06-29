import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './authentication'
import snackbarModule from "@/store/snackbar";
import postModule from "@/store/post";
import workspaceModule from '@/store/workspace';
import ideaModule from "@/store/ideas";
import notificationModule from "@/store/notification";

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
    post: postModule,
    workspace: workspaceModule,
    ideas: ideaModule,
    notification: notificationModule
  }
})
