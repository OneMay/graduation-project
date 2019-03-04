import Vue from 'vue'
import Router from 'vue-router'
import RegisterLogin from '@/components/register-login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'RegisterLogin',
      component: RegisterLogin
    }
  ]
})
