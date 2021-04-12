import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import SignUp from '../views/SignUp'
import Workspaces from "@/views/Workspaces";
import Invites from "@/views/Invites";
import Calendar from "@/views/Calendar";
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
    beforeEnter: (to, from, next) => {
      if (store.getters.isLoggedIn) {
        next()
      } else {
        next('/login')
      }
    },
    children: [
      {path: 'workspaces', name: 'workspaces', component: Workspaces},
      {path: 'invites', name: 'invites', component: Invites},
      {path: 'calendar', name: 'calendar', component: Calendar},
      {path: 'profile', name: 'Profile', component: Profile}
    ]
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
