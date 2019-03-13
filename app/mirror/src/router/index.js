import Vue from 'vue'
import Router from 'vue-router'
import  commenMotheds from "./../assets/commen";
import RegisterLogin from '@/components/register-login'
import NotFound from '@/components/notFound'
import ContenIndex from '@/components/layout'
import Kanban from '@/components/layout/kanban'
import Team from '@/components/layout/team'
import TeamAdd from '@/components/layout/team/add'
import EventDeatil from '@/components/layout/eventView/detail'
import EventOverView from '@/components/layout/eventView'
import PageOverView from '@/components/layout/pageView'
import PageOverViewDeatil from '@/components/layout/pageView/detail'
import UserFeatures from '@/components/layout/userFeatures'

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
      meta: {
        title: '登录与注册'
      }
    },
    {
      path:"/",
      name:'ContenIndex',
      component:ContenIndex,
        beforeEnter:beforeEnter,
        redirect: '/team/iteam',
      children:[
        {path:'/overview/kanban',component:Kanban,beforeEnter:beforeEnter,meta: {
          title: '数据概况'
        }},
        {path:'/behavior/pageOverView',component:PageOverView,beforeEnter:beforeEnter,meta: {
          title: '页面分析'
        }},
        {path:'/behavior/pageOverView/detail',component:PageOverViewDeatil,beforeEnter:beforeEnter,meta: {
          title: '页面分析'
        }},
        {path:'/team/iteam',component:Team,beforeEnter:beforeEnter,meta: {
          title: '我的团队'
        }},
        {path:'/team/creatteam',component:TeamAdd,beforeEnter:beforeEnter,meta: {
          title: '创建团队'
        }},
        {path:'/behavior/eventOverView/detail',component:EventDeatil,beforeEnter:beforeEnter,meta: {
          title: '事件分析'
        }},
        {path:'/behavior/eventOverView',component:EventOverView,beforeEnter:beforeEnter,meta: {
          title: '事件分析'
        }},
        {path:'/user/userFeatures',component:UserFeatures,beforeEnter:beforeEnter,meta: {
          title: '用户特征'
        }}
      ] 
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    },
  ]
})
