import axios from "axios";

const workspaceModule = {
  state: {
    updated: false,
    invitesUpdated: false,
    teamID: ''
  },
  actions: {
    getWorkspaces: function ({commit}) {
      return new Promise((resolve, reject) => {
        axios.get('/api/v1.0.0/team/get_user_teams')
          .then(res => {
            commit('updateTeams', true);
            resolve(res)
          })
          .catch(err => reject(err));
      });
    },
    leaveWorkspace: function ({commit}, team) {
      return new Promise((resolve, reject) => {
        axios.delete(`/api/v1.0.0/team/leave_team/${team}`)
          .then(res => {
            commit('updateTeams', false);
            resolve(res)
          })
          .catch(err => reject(err));
      });
    },
    getInvites: function ({commit}) {
      return new Promise((resolve, reject) => {
        axios.get('/api/v1.0.0/team/get_invites')
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
        axios.post('/api/v1.0.0/team/accept_invite', body)
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
        axios.delete(`/api/v1.0.0/team/reject_invite/${url}`)
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
        axios.post('api/v1.0.0/team/create_team', body).then(resp => {
          commit('updateTeams');
          resolve(resp);
        }).catch(err => {
          reject(err);
        });
      });
    },
    addUserToWorkspace: function (payload, body) {
      return new Promise((resolve, reject) => {
        axios.post('api/v1.0.0/team/invite_user', body).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        });
      })
    },
    requestConnectionTwitter(payload, body) {
      return new Promise((resolve, reject) => {
        axios.post('api/v1.0.0/socialmedia/twitter/authorize/request', body).then(resp => {
          resolve(resp);
        }).catch(err => {
          reject(err);
        });
      });
    },
    sendTokensTwitter(payload, body) {
      return new Promise((resolve, reject) => {
        axios.post('api/v1.0.0/socialmedia/twitter/authorize/access', body).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        });
      });
    },
    getWorkspaceMembers(payload, teamUrl) {
      return new Promise((resolve, reject) => {
        axios.get('api/v1.0.0/team/get_members?team_url='+teamUrl).then(resp => {
          resolve(resp);
        }).catch(err => {
          reject(err);
        });
      });
    },
    getWorkspaceInfo({commit}, teamUrl) {
      return new Promise((resolve, reject) => {
        axios.get('api/v1.0.0/team/get_team_info?team_url='+teamUrl).then(resp => {
          resolve(resp);
          commit('set_workspace_id', resp.data.team.id)
        }).catch(err => {
          reject(err);
        });
      });
    },
    editWorkspaceInfo(payload, body) {
      return new Promise((resolve, reject) => {
        axios.put('api/v1.0.0/team/update_team_info', body).then(resp => {
          resolve(resp);
        }).catch(error => {
          reject(error)
        });
      })
    },
    removeUser: function (payload, body) {
      console.log(body)
      return new Promise((resolve, reject) => {
        axios.delete(`api/v1.0.0/team/remove_user/${body.team_url}?username=${body.email}`).then(resp => {
          resolve(resp);
        }).catch(error => {
          reject(error);
        });
      })
    },
    getTwitterAccount: function (payload, team_url) {
      return new Promise((resolve, reject) => {
        axios.get('api/v1.0.0/socialmedia/twitter/accounts?team_url='+team_url)
          .then(resp => resolve(resp)).catch(err => reject(err));
      });
    }
  },
  mutations: {
    updateTeams: function (state, value) {
      state.updated = value
    },
    updateInvites: function (state, value) {
      state.invitesUpdated = value
    },
    set_workspace_id: function (state, value) {
      state.teamID = value
    }
  },
  getters: {
    isTeamsUpdated: (state) => state.updated,
    isInvitesUpdated: (state) => state.invitesUpdated,
    getTeamId: (state) => state.teamID
  }
};

export default workspaceModule;