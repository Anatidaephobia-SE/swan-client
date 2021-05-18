import axios from "axios";

const ideaModule = {
  namespaced: true,
  state: {
    todo: [],
    inProgress: [],
    done: []
  },
  actions: {
    createCard: async function ({commit}, payload) {
      const response = await axios.post("api/v1/postideas/create_card/", payload)
      const data = response.data
      console.log(data)
      commit('ADD_CARD', data)
    },
    getCards: async function ({commit}, team_id) {
      const response = await axios.get(`api/v1/postideas/all_card/${team_id}`)
      const data = response.data
      commit('INIT_BOARD', data)
    },
    deleteCard: async function({commit}, cardId) {
      const response = await axios.delete(`api/v1/postideas/Delete_Card/${cardId}/`)
      return response.data
    }
  },
  mutations: {
    ADD_CARD: function (state, payload) {
      const board = payload.status
      console.log(payload.assignee)
      state[board].push(payload)
    },
    INIT_BOARD: function (state, payload) {
      state.todo = payload.todo
      state.inProgress = payload.inProgress
      state.done = payload.done
    }
  },
  getters: {}
}
export default ideaModule;