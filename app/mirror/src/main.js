// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview';
import moment from 'moment'
import 'iview/dist/styles/iview.css';
import axios from 'axios'
import  commenMotheds from "./assets/commen";
import {store} from './store/store.js'
import vuescroll from 'vuescroll';
import ECharts from 'vue-echarts'
import 'echarts'
import App from './App'
import router from './router'
let userInfo=commenMotheds.getCookie('userInfo')
let username = userInfo?commenMotheds.parserDataToJson(userInfo).mobile:'';
window.mirrorCommandQueue={
  system:'mirror',
  user:username
}
// 配置Vue原型 (在任何组件中都可以正常使用axios)
Vue.prototype.$http = axios;
Vue.prototype.$moment = moment;
axios.defaults.baseURL='/'
Vue.config.productionTip = false


Vue.use(iView);
Vue.use(vuescroll); // install the vuescroll first
Vue.prototype.$vuescrollConfig = {
  bar: {
    background: '#000'
  }
};
// 全局守卫
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});
Vue.component('v-chart', ECharts)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
