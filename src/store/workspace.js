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
    },
    createWorkspace: function ({commit}, body) {
      return new Promise((resolve, reject) => {
        axios.post('api/team/create_team', body).then(resp => {
          commit('updateTeams');
          resolve(resp);
        }).catch(err => {
          reject(err);
        });
      });
    },
    addUserToWorkspace: function (payload, body) {
      return new Promise((resolve, reject) => {
        axios.post('api/team/invite_user', body).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        });
      })
    },
    requestConnectionTwitter(payload, body) {
      return new Promise((resolve, reject) => {
        axios.post('api/socialmedia/twitter/authorize/request/', body).then(resp => {
          resolve(resp);
        }).catch(err => {
          reject(err);
        });
      });
    },
    sendTokensTwitter(payload, body) {
      return new Promise((resolve, reject) => {
        axios.post('api/socialmedia/twitter/authorize/access/', body).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        });
      });
    },
    getWorkspaceMembers(payload, teamUrl) {
      return new Promise((resolve, reject) => {
        axios.get('api/team/get_members?team_url='+teamUrl).then(resp => {
          resolve(resp);
        }).catch(err => {
          reject(err);
        });
      });
    },
    getWorkspaceInfo(payload, teamUrl) {
      return new Promise((resolve, reject) => {
        axios.get('api/team/get_team_info?team_url='+teamUrl).then(resp => {
          resolve(resp);
        }).catch(err => {
          reject(err);
        });
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