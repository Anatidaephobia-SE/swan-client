import axios from "axios";


function generateFormData(post) {
  const body = new FormData()
  body.append('name', post.name)
  body.append('caption', post.caption)
  body.append('tag', post.tag)
  body.append('team', post.team)
  body.append('status', post.status)
  if (post.hasOwnProperty('schedule_time')) {
    body.append('schedule_time', post.schedule_time)
  }
  for (const img of post.multimedia) {
    if (!img.hasOwnProperty('media')) {
      body.append('multimedia[]', img)
    }
  }
  return body
}

async function imageToFile(images) {
  const res = []
  for (const img of images) {
    try {
      const url = img.media.replace('http://localhost:9090', '')
      const response = await fetch(url)
      const contentType = response.headers.get('content-type')
      const blob = await response.blob()
      const file = new File([blob], `${Math.random()}.png`, {contentType})
      res.push(file)
    } catch (e) {
    }
  }
  return res
}

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
      team: '',
      multimedia: [],
      status: '',
      created_at: '',
      schedule_time: ''
    },
    update: false,
    canEdit: true,
  },
  actions: {
    createNewPost: function ({commit, state}) {
      return new Promise((resolve, reject) => {
        const body = generateFormData(state.post)
        axios.post('api/v1/post/create_post/', body).then(resp => {
          commit('RESET')
          resolve(resp)
        }).catch(err => reject(err))
      });
    },
    getPostById: function ({commit}, id) {
      return new Promise((resolve, reject) => {
        axios.get(`api/v1/post/single_post/${id}/`).then(resp => {
          const data = resp.data;
          commit('SET_POST_ALL', data)
          resolve(resp)
        }).catch(err => reject(err));
      })
    },
    updatePost: function ({commit, state}) {
      const body = generateFormData(state.post)
      return new Promise((resolve, reject) => {
        axios.put(`api/v1/post/update_post/${state.post.id}/`, body).then(resp => {
          const data = resp.data;
          data.owner = state.author
          commit('SET_POST_ALL', data);
          resolve(resp)
        }).catch(err => reject(err));
      })
    },
    addComment: function ({state}, payload) {
      return new Promise((resolve, reject) => {
        axios.put(`api/v1/post/create_comment/${state.post.id}/`, payload).then(resp => resolve(resp)).catch(err => reject(err))
      });
    },
    getComments: function ({state}, id) {
      return new Promise((resolve, reject) => {
        axios.get(`api/v1/post/all_comment/${id}`)
          .then(resp => resolve(resp)).catch(err => reject(err))
      })
    },
    deleteComment: function (store, id) {
      return new Promise((resolve, reject) => {
        axios.delete(`api/v1/post/delete_comment/${id}`)
          .then(resp => resolve(resp)).catch(err => reject(err))
      })
    },
    getAllPosts: function ({state}, team_id) {
      return new Promise((resolve, reject) => {
        axios.get(`api/v1/post/all_post/${team_id}/`)
          .then(resp => resolve(resp)).catch(err => reject(err))
      })
    },
    deletePost: function ({commit, state}) {
      return new Promise((resolve, reject) => {
        axios.delete(`api/v1/post/update_post/${state.post.id}`).then(resp => {
          commit('RESET')
          resolve(resp)
        }).catch(err => reject(err))
      })
    }
  },
  mutations: {
    SET_POST_DATA: function (state, payload) {
      state.post.name = payload.name
      state.post.caption = payload.caption
      state.post.tag = payload.tag
      state.post.multimedia = payload.multimedia
      state.post.team = payload.team
    },
    SET_STATUS: function (state, status) {
      state.post.status = status
    },
    SET_POST_ALL: async function (state, payload) {
      const multimedia = await imageToFile(payload.multimedia)
      state.post = {
        id: payload.id,
        name: payload.name,
        caption: payload.caption,
        tag: payload.tag,
        team: payload.team,
        multimedia: multimedia,
        status: payload.status || '',
        created_at: payload.created_at || state.post.created_at,
        schedule_time: payload.schedule_time || '',
      }
      const preAuthor = state.author
      const author = payload.owner
      if (author) {
        state.author = {
          email: author.email || preAuthor.email,
          first_name: author.first_name || preAuthor.first_name,
          last_name: author.last_name || preAuthor.last_name,
          profile_picture: author.profile_picture || preAuthor.profile_picture
        }
      }
      state.update = true
      console.log(state.post.status)
      if (state.post.status === 'Published') {
        state.canEdit = false
      }
    },
    ADD_IMAGE: function (state, file) {
      state.post.multimedia.push(file)
    },
    RESET: function (state) {
      state.author = {}
      state.post = {
        name: '',
        caption: '',
        team: '',
        multimedia: [],
        status: '',
        created_at: '',
        schedule_time: ''
      }
      state.update = false
      state.canEdit = true
    },
    ADD_HASHTAG: function (state, hashtag) {
      state.post.caption += ` ${hashtag}`
    }
  },
  getters: {
    getNewPost: state => state.post,
    getPostAuthor: state => state.author
  }
}
export default postModule;