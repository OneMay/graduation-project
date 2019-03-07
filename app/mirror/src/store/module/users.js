const state = {
  mobile: null,
  isLogin : false
}

const getters = {
  getUser: state => state.mobile
}

const mutations = {
  // 更改用户的状态信息
  userStatus(state,mobile){
    if(mobile){
      state.mobile = mobile
      state.isLogin = true
    }else{
      state.mobile = null
      state.isLogin = false
    }
  }
}

const actions = {
  // 应用mutations
  setUser({commit},mobile){
    commit("userStatus",mobile)
  }
}

export default{
  state,
  getters,
  mutations,
  actions
}