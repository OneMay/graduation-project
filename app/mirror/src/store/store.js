import Vue from 'vue'
import Vuex from 'vuex'

import users from './module/users';
import team from './module/team';

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules:{
    users,
    team
  }
})