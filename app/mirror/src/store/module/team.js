const state = {
    teamEn:''
  }
  
  const getters = {
    getTeam: state => state.teamEn
  }
  
  const mutations = {
    // 更改用户的状态信息
    teamEnStatus(state,teamEn){
      if(teamEn){
        state.teamEn = teamEn
      }else{
        state.teamEn = null
      }
    }
  }
  
  const actions = {
    // 应用mutations
    setTeam({commit},teamEn){
      commit("teamEnStatus",teamEn)
    }
  }
  
  export default{
    state,
    getters,
    mutations,
    actions
  }