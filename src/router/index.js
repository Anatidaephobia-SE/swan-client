import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import SignUp from '../views/SignUp'
import Workspaces from "@/views/Workspaces";
import Invites from "@/views/Invites";
import Calendar from "@/views/Calendar";
import Teams from "@/views/Teams"
import Settings from "@/views/Settings";
import Dispatch from "@/views/Dispatch";
import Posts from "@/views/teams-subpaths/Posts"

import Logout from "@/views/Logout";
import store from '../store/index'
import Profile from "@/views/Profile";
import PostView from "@/views/PostView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/workspaces',
    beforeEnter: (to, from, next) => {
      if (store.getters.isLoggedIn) {
        next()
      } else {
        next('/login')
      }
    },
    children: [
      {path: 'workspaces', name: 'Workspaces', component: Workspaces},
      {path: 'profile', name: 'Profile', component: Profile}
    ]
  },
  {
    path: '/workspace/:workspace/',
    name: 'Workspace',
    redirect: '/workspace/:workspace/posts',
    component: Teams,
    children: [
      {path: 'posts', name: 'Posts', component: Posts},
      {path: 'settings', name: 'Settings', component: Settings},
      {path: 'compose', name: 'Compose', component: Posts, meta: {compose: true}},
    ]
  },
  {
    path: '/dispatch', component: Dispatch, name: 'Dispatcher'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/post',
    name: 'Post',
    component: PostView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
