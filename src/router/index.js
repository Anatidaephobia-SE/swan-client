import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import SignUp from '../views/SignUp'
import Workspaces from "@/views/Workspaces";
import Invites from "@/views/Invites";
import Calendar from "@/views/Calendar";
import Profile from "@/views/Profile";
// import store from '../store/index'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // beforeEnter: (to, from, next) => {
    //   if (store.getters.isLoggedIn) {
    //     next()
    //   } else {
    //     next('/login')
    //   }
    // },
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
