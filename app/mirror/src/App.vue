<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import commenMotheds from './assets/commen'
export default {
  name: 'App',
  data() {
    return {
      username:null
    }

  },
   created: function () {
     let userInfo="",team="";
     if(userInfo=commenMotheds.getCookie('userInfo')){
       this.username = commenMotheds.parserDataToJson(userInfo).mobile;
       this.$store.dispatch("setUser",this.username)
     }else{
       this.username=null;
       this.$store.dispatch("setUser",this.username)
     }
     if(team=commenMotheds.getCookie('team')){
       let teamCookie = commenMotheds.parserDataToJson(team);
       let teamInfo = {
         teamEn:teamCookie.teamEn,
         buildTime:teamCookie.buildTime
       }
       this.$store.dispatch("setTeam",teamInfo)
     }else{
       team="";
       this.$store.dispatch("setTeam",team)
     }
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
  width:100%;
}
html,body{
  width:100%;
  height:100%;
}
.clearfix::after{
    content: " ";
    display: table;
    height: 0;
    clear: both;
}
.clearfix{
zoom: 1;
}
.width(@px){
  width: calc(100% - @px);
}

.content-width-right{
   .width(240px);
   float:right;
   margin-top: 0px;
}
.content-flex{
  display: flex;
    flex-wrap: wrap;
}
</style>
