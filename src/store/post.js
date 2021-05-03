import axios from "axios";

const postModule = {
  state: {
    id: '',
    author: {},
    newPost: {
      name: '',
      caption: '',
      team: '',
      multimedia: '',
      status: '',
      created_at: ''
    }
  },
  actions: {
    reset: function ({commit}) {
      commit('RESET')
    },
    setPost: function ({commit}, payload) {
      commit('SET_POST', payload)
    },
    setStatus: function ({commit}, status) {
      commit('SET_STATUS', status);
    },
    setPrimaryKey: function ({commit}, id) {
      commit('SET_ID', id);
    },
    setCaption: function ({commit}, caption) {
      commit('SET_CAPTION', caption);
    },
    createNewPost: function ({commit, state}) {
      return new Promise((resolve, reject) => {
        axios.post('api/v1.0.0/post/create_post/', state.newPost).then(resp => {
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
    SET_POST: function (state, payload) {
      state.newPost = {
        name: payload.name,
        caption: payload.caption,
        team: payload.team,
        multimedia: payload.multimedia || '',
        status: payload.status || '',
        created_at: payload.created_at
      }
    },
    SET_STATUS: function (state, status) {
      state.newPost.status = status
    },
    SET_ID: function (state, id) {
      state.id = id
      state.editMode = true
    },
    SET_AUTHOR: function (state, author) {
      state.author = author
    },
    RESET: function (state) {
      state.id = ''
      state.author = {}
      state.newPost = {
        name: '',
        caption: '',
        team: '',
        multimedia: '',
        status: '',
        created_at: ''
      }
    },
    SET_CAPTION: function (state, caption) {
      state.newPost.caption = caption;
    }
  },
  getters: {
    getNewPost: state => state.newPost,
    getPostAuthor: state => state.author
  }
}
export default postModule;