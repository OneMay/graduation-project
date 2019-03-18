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
import PageData from '@/components/layout/constantlyData/pageData'
import EventData from '@/components/layout/constantlyData/eventData'
import Member from '@/components/layout/team/member'
import Userguidance from '@/components/userguidance'

Vue.use(Router)
function beforeEnter (to, from, next){
  let user,team;
  if(user =commenMotheds.getCookie('userInfo')){
    if(to.path==='/team/iteam'||to.path==='/team/creatteam'){
      next();
    }
    else{
      if(team =commenMotheds.getCookie('team')){
        user = commenMotheds.parserDataToJson(user);
        team = commenMotheds.parserDataToJson(team);
        if(to.path==='/my-team/member'){
          user.mobile===team.teamOwner?next():next("/team/iteam")
        }else{
          next()
        }
      }else{
        window.location.href="/team/iteam"
      }
    }
  }else {
    next('/registerAndLogin');
  }
}
function beforeEnters (to, from, next){
  if(commenMotheds.getCookie('userInfo')){
    next('/team/iteam');
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
      path: '/userguidance',
      name: 'userguidance',
      component: Userguidance,
      meta: {
        title: 'SDK使用指南'
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
        }},
        {path:'/data/pageview',component:PageData,beforeEnter:beforeEnter,meta: {
          title: '页面数据'
        }},
        {path:'/data/eventview',component:EventData,beforeEnter:beforeEnter,meta: {
          title: '事件数据'
        }},
        {path:'/my-team/member',component:Member,beforeEnter:beforeEnter,meta: {
          title: '成员管理'
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
