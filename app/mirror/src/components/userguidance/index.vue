<template>
<!-- 制作一个框架包裹slider -->
 <div style="width:100%;height:100%">
      <!-- 配置slider组件 -->
      <slider ref="slider" :options="options">
          <!-- 直接使用slideritem slot -->
           <slideritem v-for="(item,index) in someList" :key="index" :style="item.style" v-html="item.html"></slideritem>
          <!-- 设置loading,可自定义 -->
          <!-- <div slot="loading">loading...</div> -->
      </slider>
      
 </div>
</template>
<script>
import { slider, slideritem } from 'vue-concise-slider'// import slider components
export default {
   el: '#app',
   data () {
      return {
        //Image list
        someList:[{
            html: '<div><p class="step">第一步：在您的网站主页中引入SDK文件，一定要保证这个文件在您的网站的所有页面都可以获取到(设置方式如图中红色区域所示)<p><img src="/static/images/start1.png"></div>',
            style: {
              'background': '#1bbc9b'
            }
          },
          {
            html: '<div><p class="step">第二步：在您的网站中都会引入的js文件中设置您的团队名称（团队名称是您在本网站建立的团队名）与用户名（请一定要考虑用户登录和退出与刷新网页时，user的变化与获取，假如您的网站没有用户属性，把下图所示的user设置为：mirror-anonymous）<p><img src="/static/images/start2.png"></div>',
            style: {
              'background': '#4bbfc3'
            }
          },
          {
            html: '<div><p class="step">第三步：如果需要知道用户点击了哪些事件与功能，可以在您的触发事件函数中加入（action与category）（如下图所示的）<p><img src="/static/images/start3.png"></div>',
            style: {
              'background': '#7baabe'
            }
          }],
        //Sliding configuration [obj]
        options: {
            direction:'horizontal',
          currentPage: 0,
          thresholdDistance:300,
          thresholdTime:500,
          autoplay:0,
          loop:true,
          itemAnimation:true,
          loopedSlides:1,
          slidesToScroll:1,
          timingFunction: 'ease',
          speed: 300
        }
      }
    },
    components: {
      slider,
      slideritem
    },
    mounted () {
    },
    methods: {
      // Listener event
      slide (data) {
        console.log(data)
      },
      onTap (data) {
        console.log(data)
      },
      onInit (data) {
        console.log(data)
      }
    }
}
</script>
<style lang="less" >
.step{
    width: 60%;
    white-space: pre-wrap;
    margin: 0 auto;
    font-size: 20px;
    text-indent: 2em;
    text-align: left;
    font-family: cursive;
}
</style>
