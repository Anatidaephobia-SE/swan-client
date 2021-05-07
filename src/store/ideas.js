const ideaModule = {
  namespaced: true,
  state: {
    todo: [
      {
        title: 'Up-coming event',
        context: 'We should create a post for an up-coming event. It is very important and boss is looking forward to it',
        tag: 'High Priority',
        assignee: {
          email: 'amiresm17@gmail.com',
          profile_picture: '/media/userprofile/1/download_GkybDRE.png',
          first_name: 'Amir',
          last_name: 'Esmaeili'
        }
      },
      {
        title: 'Change the header of twitter',
        context: 'Tell the design dept. to create a new header image',
        tag: 'Low Priority',
        assignee: {
          email: 'amiresm17@gmail.com',
          profile_picture: '',
          first_name: 'Ali',
          last_name: 'Esmaeili'
        }
      }
    ],
    inProgress: [
      {
        title: 'Create a post for off season',
        context: 'Twit an announcement for off',
        tag: 'Medium Priority',
        assignee: {
          email: 'amiresm17@gmail.com',
          profile_picture: '',
          first_name: 'Bob',
          last_name: 'Esmaeili'
        }
      },
    ],
    done: []
  },
  actions: {
    createCard: function ({commit}, payload) {
      // return new Promise((resolve, reject) => {
      //
      // })
      commit('ADD_CARD', payload)
    }
  },
  mutations: {
    ADD_CARD: function (state, payload) {
      console.log(payload)
      const board = payload.board
      state[board].push(payload)
    }
  },
  getters: {}
}

export default ideaModule;