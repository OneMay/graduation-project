import Vue from 'vue'
import Router from 'vue-router'
import  commenMotheds from "./../assets/commen";
import RegisterLogin from '@/components/register-login'
import NotFound from '@/components/notFound'
import ContenIndex from '@/components/layout'
import Kanban from '@/components/layout/kanban'
Vue.use(Router)
function beforeEnter (to, from, next){
  if(commenMotheds.getCookie('userInfo')){
    next();
  }else{
    next('/registerAndLogin');
  }
}
function beforeEnters (to, from, next){
  if(commenMotheds.getCookie('userInfo')){
    next('/overview/kanban');
  }else{
    next();
  }
}
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/registerAndLogin',
      name: 'RegisterLogin',
      component: RegisterLogin,
      beforeEnter:beforeEnters,
    },
    {
      path:"/",
      name:'ContenIndex',
      component:ContenIndex,
        beforeEnter:beforeEnter,
      children:[
        {path:'/overview/kanban',component:Kanban,beforeEnter:beforeEnter,},
        {path:'/behavior/pageOverView',component:Kanban,beforeEnter:beforeEnter,}
      ] 
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    },
  ]
})
