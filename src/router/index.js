import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import SignUp from '../views/SignUp'
import Workspaces from "@/views/Workspaces";
import Teams from "@/views/Teams"
import Settings from "@/views/Settings";
import Dispatch from "@/views/Dispatch";
import Posts from "@/views/teams-subpaths/Posts"

import Logout from "@/views/Logout";
import store from '../store/index'
import Profile from "@/views/Profile";
import PostView from "@/views/PostView";
import Compose from "@/views/Compose";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (store.getters.isLoggedIn) {
        next()
      } else {
        next('/login')
      }
    },
    children: [
      {path: '', name: 'Workspaces', component: Workspaces},
      {path: 'profile', name: 'Profile', component: Profile}
    ]
  },
  {
    path: '/workspace/:workspace/',
    name: 'Workspace',
    component: Teams,
    children: [
      {path: 'posts', name: 'Posts', component: Posts},
      {path: 'post', name: 'PostView', component: PostView},
      {path: 'settings', name: 'Settings', component: Settings},
      {path: 'compose', name: 'Compose', component: Compose},
    ]
  },
  {
    path: '/dispatch', component: Dispatch, name: 'Dispatcher'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {dontUpdate: false}
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
    meta: {dontUpdate: false}
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
