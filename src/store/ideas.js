const ideaModule = {
  namespaced: true,
  state: {
    todo: [
      {
        title: 'Card1',
        context: 'Description1',
        writer: {
          email: 'writer1@example.com'
        }
      },
      {
        title: 'Card2',
        context: 'Description2',
        writer: {
          email: 'writer2@example.com'
        }
      }
    ],
    inProgress: [
      {
        title: 'Card3',
        context: 'Description3',
        writer: {
          email: 'writer3@example.com'
        }
      },
      {
        title: 'Card4',
        context: 'Description4',
        writer: {
          email: 'writer4@example.com'
        }
      }
    ],
    done: []
  },
  actions: {},
  mutations: {
    ADD_CARD: function (state, payload) {
      const board = payload.board
      const card = payload.card
      state[board].push(card)
    }
  },
  getters: {}
}

export default ideaModule;