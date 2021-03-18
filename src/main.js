import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'

// axios.defaults.baseURL = 'http://anatidaephobia.pythonanywhere.com/'
axios.defaults.baseURL = 'http://localhost:8000/'

const token = localStorage.getItem('token')
if (token) {
  // Set the token for auth header
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
