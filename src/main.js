import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VCalendar from 'v-calendar'
import "tailwindcss/dist/tailwind.css";

// axios.defaults.baseURL = 'http://anatidaephobia.pythonanywhere.com/'

axios.defaults.baseURL = 'https://api.stage.swan-app.ir'
const token = localStorage.getItem('token')
if (token) {
  // Set the token for auth header
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

Vue.use(VCalendar, {
  componentPrefix: 'vc'
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
