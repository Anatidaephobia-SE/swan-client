import axios from "axios";

const postModule = {
  namespaced: true,
  state: {
    author: {},
    post: {
      name: '',
      caption: '',
      tag: '',
      team: 1,
      multimedia: '',
      status: '',
      created_at: ''
    },
    update: false,
  },
  actions: {
    createNewPost: function ({commit, state}) {
      return new Promise((resolve, reject) => {
        axios.post('api/v1.0.0/post/create_post/', state.post).then(resp => {
          commit('SET_POST', resp.data)
          commit('SET_ID', resp.data.id)
          commit('SET_AUTHOR', resp.data.owner)
          resolve(resp)
        }).catch(err => reject(err))
      });
    },
    getPostById: function ({commit}, id) {
      return new Promise((resolve, reject) => {
        axios.get(`api/v1.0.0/post/single_post/${id}/`).then(resp => {
          const data = resp.data;
          commit('SET_ID', data.id)
          commit('SET_POST', data);
          commit('SET_AUTHOR', resp.data.owner)
          resolve(resp)
        }).catch(err => reject(err));
      })
    },
    updatePost: function({commit, state}) {
      return new Promise((resolve, reject) => {
        axios.put(`api/v1.0.0/post/update_post/${state.id}/`, state.newPost).then(resp => {
          const data = resp.data;
          commit('SET_POST', data);
          resolve(resp)
        }).catch(err => reject(err));
      })
    },
    addComment: function({state}, payload) {
      return new Promise((resolve, reject) => {
        axios.put(`api/v1.0.0/post/create_comment/${state.id}/`, payload).
        then(resp => resolve(resp)).catch(err => reject(err))
      });
    },
    getComments: function ({state}) {
      return new Promise((resolve, reject) => {
        axios.get(`api/v1.0.0/post/all_comment/${state.id}`)
          .then(resp => resolve(resp)).catch(err => reject(err))
      })
    },
    deleteComment: function (store, id) {
      return new Promise((resolve, reject) => {
        axios.delete(`api/v1.0.0/post/delete_comment/${id}`)
          .then(resp => resolve(resp)).catch(err => reject(err))
      })
    },
    getAllPosts: function ({state}, team_id) {
      return new Promise((resolve, reject) => {
        axios.get(`api/v1.0.0/post/all_post/${team_id}/`)
          .then(resp => resolve(resp)).catch(err => reject(err))
      })
    }
  },
  mutations: {
    SET_POST_DATA: function (state, payload) {
      state.post.name = payload.name
      state.post.caption = payload.caption
      state.post.tag = payload.tag
    },
    SET_STATUS: function (state, status) {
      state.post.status = status
    },
    SET_AUTHOR: function (state, author) {
      state.author = author
    },
    RESET: function (state) {
      state.author = {}
      state.post = {
        name: '',
        caption: '',
        team: '',
        multimedia: '',
        status: '',
        created_at: ''
      }
    }
  },
  getters: {
    getNewPost: state => state.post,
    getPostAuthor: state => state.author
  }
}
export default postModule;