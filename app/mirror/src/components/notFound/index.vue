<template>
    <div>
        <div class="header">
        <div class="logo">
            <h1><a href="">Ohh</a></h1>
        </div>
    </div>

    <div class="content">
        <img src="../../../static/images/error-img.png" title="error" />
        <p><span><label>O</label>hh.....</span>You Requested the page that is no longer There.</p>
        <a href="/">Back To Home</a>
        <div class="copy-right">
            <p>&#169 All rights Reserved | Designed by OneMay</p>
        </div>
    </div>

    </div>
</template>
<script>
export default {
    name:'NotFound',
    mounted() {
    this.$nextTick(() => {
      let body = document.getElementsByTagName('body')[0];
      let html = document.getElementsByTagName('html')[0];
      body.style.minWidth = '100%'
      html.style.minWidth = '100%'
    });
  }
}
</script>
<style scoped>
@import "../../../static/css/page/style.css";
</style>

