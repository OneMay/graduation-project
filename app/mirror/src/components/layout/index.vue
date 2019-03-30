
<template>
  <div id="content">
    <Menu> </Menu>
    <router-view />
  </div>
</template>

<script>
import Menu from "./menu";
let title='';
export default {
  name: "ContenIndex",
  components: {
    Menu
  },
  mounted() {
    this.$nextTick(() => {
      let body = document.getElementsByTagName('body')[0];
      let html = document.getElementsByTagName('html')[0];
      body.style.minWidth = '1270px'
      html.style.minWidth = '1270px'
    });
  },
  
};
</script>

<style>
#content {
  height: 100%;
}
</style>
