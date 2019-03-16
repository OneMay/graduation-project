<template>
  <div
    class="content-width-right content-flex"
    :class="{ 'content-flex-center': teamList.length <= 0 }"
  >
    <div v-if="teamList.length > 0" class="content-flex">
      <Card class="ivu-my-card" v-for="item in teamList" :key="item._id">
        <div style="text-align:center" @click="chooseTeam(item.teamEn,item.buildTime)">
          <Icon type="md-thunderstorm" style="font-size:50px;" />
          <h3>{{ item.teamZn }}</h3>
          <h4 style="font-size: 12px;color: #e0dbdb;">
            {{ item.teamEn }}
          </h4>
        </div>
      </Card>
    </div>
    <Card class="ivu-team-card" v-else>
      <Loading v-if="loading" :text="'等一等啊o(╥﹏╥)o'"></Loading>
      <div style="text-align:center" v-else>
        <Icon type="md-thunderstorm" style="font-size:50px;" />
        <h3>还没有团员哟o(╥﹏╥)o</h3>
        <router-link to="/team/creatteam">
          <span class="ivu-team-add"
            ><Icon type="md-add" style="font-size:24px" />快去创建一个吧</span
          >
        </router-link>
      </div>
    </Card>
  </div>
</template>
<script>
import commenMotheds from "./../../../assets/commen";
import Fetcher from '../../../assets/fetcher';
import Loading from "./../../commen/loading";
export default {
  name: "Team",
  data() {
    return {
      teamList: [
      ],
      loading:false
    };
  },
  methods: {
    chooseTeam(teamName,buildTime) {
      let team = {
        teamEn:teamName,
        buildTime:buildTime
      }
      commenMotheds.setCookie("team", JSON.stringify(team));
      this.$store.dispatch("setTeam", team);
      this.$router.push('/overview/kanban');
    },
    async findAllTeamIn(){
      this.loading = true;
        let params ={
          mobile:this.$store.getters.getUser
        };
        let data = await Fetcher.findAllTeamIn(this,params);
        this.loading = false;
        if (data.code === 200) {
              this.teamList = data.data;
              this.teamList.length<=0? (this.$store.dispatch("setTeam", "")):'';
                commenMotheds.getCookie('team')?"":this.$store.dispatch("setTeam","");
            } else {
              this.$Message.error(data.message);
            }
    }
  },
  created() {
    this.findAllTeamIn.call(this);
   
  },
  components:{
    Loading
  }
};
</script>
<style lang="less">
.ivu-my-card {
  width: 332px;
  height: 280px;
  background: #59e4de;
  border-radius: 20px;
  display: flex;
  color: #fff;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  .ivu-card-body:hover {
    color: #8d9613;
  }
}
.ivu-team-card {
  width: 332px;
  height: 280px;
  border-radius: 20px;
  display: flex;
  color: #000;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
}
.ivu-team-add {
  height: 50px;
  display: inline-block;
  background: #3ad0d7;
  line-height: 50px;
  border-radius: 5px;
  color: #fff;
  padding: 0 5px;
  &:hover {
    color: #e4ecec;
  }
}
.content-flex-center {
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>
