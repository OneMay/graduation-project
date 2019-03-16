
<!--
 *
 * loadingGif组件--"数据请求中"
 *
 * 使用方法：
 * <loading-gif :show-loading="showLoaddingGif"></loading-gif>
 *
 *  通过修改showLoaddingGif的true或者false 来控制loading的显示和隐藏!
 *
 -->
<template>
  <div class="wrapper">
    <div class="loading">
      <span
        :style="{
          width: '20px',
          animationDuration:
            duration.indexOf('s') === -1 ? duration + 's' : duration,
          animationDelay: (parseInt(duration) / text.length) * index + 's'
        }"
        v-for="(char, index) in text"
      >
        {{ char }}
      </span>
    </div>
  </div>
</template>
 
<script>
export default {
  props:['text'],
  data() {
    return {
      duration: "2s"
    };
  }
};
</script>
 
<style lang="less" scope>
.wrapper {
  display: flex !important;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  //   background: #f2f5f4;
  top: 0;
  left: 0;
  opacity: 0.9;
  z-index: 10;
  box-shadow: 0 1px 6px #2dca93;
  border-color: #2dca93;
  border-radius: 5px;
}
.loading {
  display: flex;
  text-align: center;

  height: 50px;
  width: 150px;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  align-items: center;
  color: aqua;
}
.loading span {
  margin-top: 0;
  animation: ease infinite move;
  display: block;
}
@keyframes move {
  0% {
    margin-top: -10px;
    border-bottom: 1px solid;
  }
  50% {
    margin-top: 10px;
    border-bottom: none;
  }
  100% {
    margin-top: -10px;
  }
}
</style>