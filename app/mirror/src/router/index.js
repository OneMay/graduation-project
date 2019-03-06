import Vue from 'vue'
import Router from 'vue-router'
import RegisterLogin from '@/components/register-login'
import NotFound from '@/components/notFound'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/registerAndLogin',
      name: 'RegisterLogin',
      component: RegisterLogin
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    },
  ]
})
