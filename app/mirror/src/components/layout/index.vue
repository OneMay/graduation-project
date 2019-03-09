
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
  }
  
};
</script>

<style>
#content {
  height: 100%;
}
</style>
