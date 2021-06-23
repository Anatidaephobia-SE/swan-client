import axios from "axios";

function isValidDate(date) {
  var timestamp = Date.parse(date);
  return !isNaN(timestamp)
}

function generateJson(notification) {
    var timeSche = notification.schedule_time
    if (!isValidDate(timeSche)) {
      timeSche = new Date()
    }

    return {
        name: notification.name,
        body_text: notification.body_text,
        subject: notification.subject,
        reciviers: notification.reciviers,
        sender: notification.sender,
        template_team: notification.template_team,
        status: notification.status,
        schedule_time: notification.schedule_time
    }
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

const notificationModule = {
  namespaced: true,
  state: {
    owner: {
      id: '',
      email: '',
      first_name: '',
      last_name: '',
      profile_picture: ''
    },
    notification: {
      id: -1,
      name: '',
      body_text: '',
      subject: '',
      reciviers: '',
      sender: '',
      template_team: -1,
      status: '',
      created_at: '',
      schedule_time: ''
    },
    update: false,
    canEdit: true,
  },
  actions: {
    createNewNotification: function ({commit, state}) {
      return new Promise((resolve, reject) => {
        const body = generateJson(state.notification)
        axios.post('api/v1/notification/create_template/', body).then(resp => {
          commit('RESET')
          resolve(resp)
        }).catch(err => reject(err))
      });
    },
    getnotificationById: function ({commit}, id) {
      return new Promise((resolve, reject) => {
        axios.get(`api/v1/notification/single_template/${id}/`).then(resp => {
          const data = resp.data;
          commit('SET_NOTIFICATION_ALL', data)
          resolve(resp)
        }).catch(err => reject(err));
      })
    },
    updateNotification: function ({commit, state}) {
      const body = generateJson(state.notification)
      console.log(body)
      return new Promise((resolve, reject) => {
        axios.put(`api/v1/notification/update_template/${state.notification.id}/`, body).then(resp => {
          const data = resp.data;
          data.owner = state.author
          commit('SET_NOTIFICATION_ALL', data);
          resolve(resp)
        }).catch(err => reject(err));
      })
    },
    getAllNotifications: function ({state}, reciviers_id) {
      return new Promise((resolve, reject) => {
        axios.get(`api/v1/notification/all_template/${reciviers_id}/`)
          .then(resp => resolve(resp)).catch(err => reject(err))
      })
    },
    deleteNotification: function ({commit, state}) {
      return new Promise((resolve, reject) => {
        axios.delete(`api/v1/notification/update_template/${state.notification.id}`).then(resp => {
          commit('RESET')
          resolve(resp)
        }).catch(err => reject(err))
      })
    }
  },
  mutations: {
    SET_NOTIFICATION_DATA: function (state, payload) {
      state.notification.name = payload.name
      state.notification.body_text = payload.body_text
      state.notification.subject = payload.subject
      state.notification.template_team = payload.template_team
      state.notification.reciviers = payload.reciviers
    },
    SET_STATUS: function (state, status) {
      state.notification.status = status
    },
    SET_NOTIFICATION_ALL: async function (state, payload) {
      state.notification = {
        id: payload.id,
        name: payload.name,
        body_text: payload.body_text,
        subject: payload.subject,
        reciviers: payload.reciviers,
        sender: payload.sender,
        template_team: payload.template_team,
        status: payload.status || '',
        created_at: payload.created_at || state.notification.created_at,
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
      console.log(state.notification.status)
      if (state.notification.status === 'Send') {
        state.canEdit = false
      }
    },
    RESET: function (state) {
      state.author = {}
      state.notification = {
        id: -1,
        name: '',
        body_text: '',
        reciviers: '',
        sender: '',
        template_team: -1,
        status: '',
        created_at: '',
        schedule_time: ''
      }
      state.update = false
      state.canEdit = true
    },
    ADD_HASHsubject: function (state, hashsubject) {
      state.notification.body_text += ` ${hashsubject}`
    }
  },
  getters: {
    getNewnotification: state => state.notification,
    getnotificationAuthor: state => state.author
  }
}
export default notificationModule;