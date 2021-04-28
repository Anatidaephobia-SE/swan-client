import axios from "axios";

const postModule = {
  namespaced: true,
  state: {
    author: {
      email: '',
      first_name: '',
      last_name: '',
      profile_picture: ''
    },
    post: {
      name: '',
      caption: '',
      tag: '',
      team: 15,
      multimedia: [],
      status: '',
      created_at: ''
    },
    update: false,
    canEdit: true
  },
  actions: {
    createNewPost: function ({commit, state}) {
      return new Promise((resolve, reject) => {
        const post = state.post
        const body = new FormData()
        body.append('name', post.name)
        body.append('caption', post.caption)
        body.append('tag', post.tag)
        body.append('team', post.team)
        for (const img of post.multimedia) {
          body.append('multimedia[]', img)
        }
        // body.append('multimedia[]', post.multimedia)
        body.append('status', post.status)
        axios.post('api/v1.0.0/post/create_post/', body).then(resp => {
          commit('RESET')
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
      state.post.multimedia = payload.multimedia
    },
    SET_STATUS: function (state, status) {
      state.post.status = status
    },
    SET_POST_ALL: function (state, payload) {
      state.post = {
        id: payload.id,
        name: payload.name,
        caption: payload.caption,
        tag: payload.tag,
        team: payload.team,
        multimedia: payload.multimedia || '',
        status: payload.status || '',
        created_at: payload.created_at
      }
      const author = payload.owner
      state.author = {
        email: author.email,
        first_name: author.first_name,
        last_name: author.last_name,
        profile_picture: author.profile_picture
      }
      state.update = true
      if (state.post.status === 'Published') {
        state.canEdit = false
      }
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