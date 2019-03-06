// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios'
import * as commenMotheds from "./assets/commen";
// 配置默认根路径
axios.defaults.baseURL = ""

// 配置Vue原型 (在任何组件中都可以正常使用axios)
Vue.prototype.$http = axios

Vue.config.productionTip = false

// 全局守卫
// router.beforeEach((to, from, next) => {
//   if (to.path === '/registerAndLogin') {
//     next();
//   } else {
//     if (!commenMotheds.getCookie('userInfo')) {
//       alert("还没有登录,请先登录!");
//       next('/registerAndLogin');
//     }else{
//       next()
//     }
//   }
// })
Vue.use(iView);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
