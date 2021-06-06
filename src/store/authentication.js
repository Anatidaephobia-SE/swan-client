import axios from "axios";
import router from "@/router";

const authModule = {
  namespaced: true,
  state: {
    token: localStorage.getItem('token') || '',
    user: {
      first_name: '',
      last_name: '',
      email: '',
      profile_picture: ''
    }
  },
  mutations: {
    authenticated(state, payload) {
      state.token = payload.token
      state.user = payload.user
    },
    UPDATE_USER(state, user) {
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
        axios.post('/api/v1/users/login/', user)
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
        axios({url: '/api/v1/users/signup/', data: user, method: 'POST'})
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
      for (const key in user) {
        if (user.hasOwnProperty(key)) {
          body.append(key, user[key])
        }
      }

      // body.append('first_name', user.first_name);
      // body.append('last_name', user.last_name);
      // if (user.hasOwnProperty('profile_picture')) {
      //   body.append('profile_picture', user.profile_picture)
      // }
      return new Promise((resolve, reject) => {
        axios.put('/api/v1/users/profile/update/', body)
          .then(resp => {
            const user = resp.data.user
            commit('UPDATE_USER', user)
            resolve(resp)
          }).catch(err => {
            console.log(err)
            reject(err)
          });
      })
    },
    getUserInfo({commit}) {
      return new Promise((resolve, reject) => {
        axios.get('/api/v1/users/profile')
          .then(resp => {
            commit('UPDATE_USER', resp.data);
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
  }
}

export default authModule;