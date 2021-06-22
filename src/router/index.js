import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import SignUp from '../views/SignUp'
import Workspaces from "@/views/Workspaces";
import Teams from "@/views/Teams"
import Settings from "@/views/teams-subpaths/Settings";
import Dispatch from "@/views/Dispatch";
import Posts from "@/views/teams-subpaths/Posts";
import Calender from "@/views/Calender";
import Notifications from "@/views/Notifications";
import CreateNotification from "@/views/CreateNotification";

import Logout from "@/views/Logout";
import store from '../store/index'
import Profile from "@/views/Profile";
import PostView from "@/views/teams-subpaths/PostView";
import Compose from "@/views/teams-subpaths/Compose";
import Ideas from "@/views/Ideas";
import Landing from "@/views/Landing"
import NotFound from "@/views/404"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (store.getters["auth/isLoggedIn"]) {
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
    redirect: {name: 'Posts'},
    component: Teams,
    children: [
      {path: 'posts', name: 'Posts', component: Posts},
      {path: 'post', name: 'PostView', component: PostView},
      {path: 'settings', name: 'Settings', component: Settings},
      {path: 'compose', name: 'Compose', component: Compose},
      {path: 'ideas', name: 'Ideas', component: Ideas},
      {path: 'calender', name: 'Calender', component: Calender},
      {path: 'notification', name: 'CreateNotification', component: CreateNotification},
      {path: 'notifications', name: 'Notification', component: Notifications},
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
  {
    path: '/about',
    name: 'About',
    component: Landing
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
