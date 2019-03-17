const state = {
  teamEn: '',
  buildTime: '',
  teamOwner:''
}

const getters = {
  getTeam: state => {
    return {
      teamEn: state.teamEn,
      buildTime: state.buildTime,
      teamOwner:state.teamOwner
    }
  }
}

const mutations = {
  // 更改用户的状态信息
  teamEnStatus(state, team) {
    if (team) {
      state.teamEn = team.teamEn;
      state.buildTime = team.buildTime
      state.teamOwner = team.teamOwner
    } else {
      state.teamEn = '';
      state.buildTime = '';
      state.teamOwner = '';
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