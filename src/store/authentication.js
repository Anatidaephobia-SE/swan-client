import axios from "axios";
import router from "@/router";

const authModule = {
  state: {
    token: localStorage.getItem('token') || '',
    user: {}
  },
  mutations: {
    authenticated(state, payload) {
      state.token = payload.token
      state.user = payload.user
    },
    updateUser(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = {};
      state.token = '';
    },
  },
  actions: {
    login({commit}, user) {
      return new Promise((resolve, reject) => {
        axios.post('/api/users/login/', user)
          .then(resp => {
            const payload = resp.data;
            localStorage.setItem('token', payload.token);
            commit('authenticated', payload);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + payload.token;
            resolve(resp);
          })
          .catch(err => {
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    register(_, user) {
      return new Promise((resolve, reject) => {
        axios({url: '/api/users/signup/', data: user, method: 'POST'})
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    updateUserInfo({commit}, user) {
      const body = new FormData();
      body.append('first_name', user.firstname);
      body.append('last_name', user.lastname);
      if (user.hasOwnProperty('profileImg')) {
        body.append('profile_picture', user.profileImg)
      }
      return new Promise((resolve, reject) => {
        axios.put('/api/users/profile/update/', body)
          .then(resp => {
            const user = resp.data.user
            commit('updateUser', user)
            resolve(resp)
          }).catch(err => {
            console.log(err)
            reject(err)
          });
      })
    },
    getUserInfo({commit}) {
      return new Promise((resolve, reject) => {
        axios.get('/api/users/profile')
          .then(resp => {
            commit('updateUser', resp.data);
            resolve(resp);
          })
          .catch(err => {
            localStorage.removeItem('token');
            reject(err);
          })
      })
    },
    logout({commit}) {
      localStorage.removeItem('token');
      router.push('/login').then()
      commit('logout');
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    userInfo: (state) => state.user
  }
}

export default authModule;