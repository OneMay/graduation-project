<template>
<v-chart class="echarts" :option="ops" :resizable="true"  />
</template>

<style>
/**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
.echarts {
  width: 100% !important;
  height: 100% !important;
}
</style>

<script>

export default {
name:'VueEchartsComponent',
  props:['ops'],
  // mounted() {
  //   console.log(this.$refs.nn.showLoading())
  // },
}
</script>