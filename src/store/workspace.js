import axios from "axios";

const workspaceModule = {
  state: {
    updated: false,
    invitesUpdated: false
  },
  actions: {
    getWorkspaces: function ({commit}) {
      return new Promise((resolve, reject) => {
        axios.get('/api/team/get_user_teams')
          .then(res => {
            commit('updateTeams', true);
            resolve(res)
          })
          .catch(err => reject(err));
      });
    },
    leaveWorkspace: function ({commit}, team) {
      return new Promise((resolve, reject) => {
        axios.delete(`/api/team/leave_team/${team}`)
          .then(res => {
            commit('updateTeams', false);
            resolve(res)
          })
          .catch(err => reject(err));
      });
    },
    getInvites: function ({commit}) {
      return new Promise((resolve, reject) => {
        axios.get('/api/team/get_invites')
          .then(res => {
            commit('updateInvites', true);
            resolve(res)
          })
          .catch(err => reject(err));
      });
    },
    acceptInvite: function ({commit}, url) {
      const body = {
        team_url: url
      }
      return new Promise((resolve, reject) => {
        axios.post('/api/team/accept_invite', body)
          .then(res => {
          commit('updateInvites', false);
          commit('updateTeams', false);
          resolve(res)
        })
      .catch(err => reject(err));
      });
    },
    rejectInvite: function ({commit}, url) {
      return new Promise((resolve, reject) => {
        axios.delete(`/api/team/reject_invite/${url}`)
          .then(res => {
            commit('updateInvites', false);
            commit('updateTeams', false);
            resolve(res)
          })
          .catch(err => reject(err));
      });
    }
  },
  mutations: {
    updateTeams: function (state, value) {
      state.updated = value
    },
    updateInvites: function (state, value) {
      state.invitesUpdated = value
    }
  },
  getters: {
    isTeamsUpdated: (state) => state.updated,
    isInvitesUpdated: (state) => state.invitesUpdated
  }
};

export default workspaceModule;