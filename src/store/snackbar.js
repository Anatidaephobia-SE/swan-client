const snackbarModule = {
  state: {
    message: '',
    color: '',
  },
  actions: {
    showMessage({commit}, {message, color}) {
      commit('newMessage', {message, color});
    }
  },
  mutations: {
    newMessage(state, payload) {
      state.message = payload.message
      state.color = payload.color
    }
  }
}

export default snackbarModule;