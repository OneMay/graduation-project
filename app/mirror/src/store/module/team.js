const state = {
  teamEn: '',
  buildTime: ''
}

const getters = {
  getTeam: state => {
    return {
      teamEn: state.teamEn,
      buildTime: state.buildTime
    }
  }
}

const mutations = {
  // 更改用户的状态信息
  teamEnStatus(state, team) {
    if (team) {
      state.teamEn = team.teamEn;
      state.buildTime = team.buildTime
    } else {
      state.teamEn = '';
      state.buildTime = '';
    }
  }
}

const actions = {
  // 应用mutations
  setTeam({ commit }, team) {
    commit("teamEnStatus", team)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}