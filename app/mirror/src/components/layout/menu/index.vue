<template>
  <div class="clearfix">
    <Menu
      :active-name="menu.activeName"
      ref="activeName"
      :open-names="[menu.activeopenNames]"
      theme="dark"
      class="sidebar"
    >
      <img id="mirror" src="../../../../static/images/icon.png" title="魔镜" />
      <Submenu name="team">
        <template slot="title">
          <Icon type="ios-hammer" />
          团队管理
        </template>
        <MenuItem name="iteam" to="/team/iteam">我的团队</MenuItem>
        <MenuItem name="creatteam" to="/team/creatteam">创建团队</MenuItem>
      </Submenu>
      <vue-scroll :ops="ops" v-if="this.$store.getters.getTeam.teamEn">
        <Submenu name="overview">
          <template slot="title">
            <Icon type="ios-eye-outline" />
            我的概览
          </template>
          <MenuItem name="kanban" to="/overview/kanban">数据概况</MenuItem>
        </Submenu>
        <Submenu name="behavior">
          <template slot="title">
            <Icon type="ios-filing" />
            行为分析
          </template>
          <MenuItem name="pageOverView" to="/behavior/pageOverView"
            >页面分析</MenuItem
          >
          <MenuItem name="eventOverView"to="/behavior/eventOverView">事件分析</MenuItem>
        </Submenu>
        <Submenu name="user">
          <template slot="title">
            <Icon type="md-contact" />
            用户分析
          </template>
          <MenuItem name="userFeatures" to="/user/userFeatures">用户特征</MenuItem>
        </Submenu>
        <Submenu name="data">
          <template slot="title">
            <Icon type="md-desktop" />
            实时数据
          </template>
          <MenuItem name="pageview" to="/data/pageview">页面数据</MenuItem>
          <MenuItem name="eventview" to="/data/eventview">事件数据</MenuItem>
        </Submenu>
        <MenuItem name="member" to="/my-team/member" v-if="this.$store.getters.getTeam.teamOwner===this.$store.getters.getUser"> <Icon type="md-person" />成员管理</MenuItem>
      </vue-scroll>
    </Menu>
    <Header class="layout-header">
      <Menu mode="horizontal" theme="light" active-name="1">
        <div class="layout-logo">魔镜-精细化运营工具</div>
         <router-link to="/userguidance" target="_blank">
            <span class="ivu-team">SDK使用指南</span>
          </router-link >
        <div class="layout-logo layout-team">
          当前团队：{{ this.$store.getters.getTeam.teamEn }}
          <router-link to="/team/iteam">
            <span class="ivu-team">切换团队</span>
          </router-link >
        </div>
        <div class="layout-nav">
          <Dropdown
            trigger="click"
            style="margin-left: 20px;margin-right: 20px;"
          >
            <a href="javascript:void(0)">
              <Icon type="md-contact" class="icon-color" />
              <span id="userName">{{ mobile }}</span>
            </a>
            <DropdownMenu slot="list" class="DropdownMenu">
              <DropdownItem><span @click="logout">退出</span></DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Menu>
    </Header>
    <div class="meta-title content-width-right">
      {{this.$route.meta.title}}
    </div>
  </div>
</template>
<script>
import Fetcher from "./../../../assets/fetcher";
export default {
  data() {
    return {
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          keepShow: true
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
          background: "#80869280"
        }
      },
      mobile: "",
      menu: {
        activeName: "",
        activeopenNames: []
      }
    };
  },
  methods: {
    async logout() {
      let data = await Fetcher.logout(this);
       Fetcher.postEventViewData({
          action: "用户退出",
          category: "退出"
        });
      if (data.code === 200) {
        this.$Message.success("退出成功");
        this.$store.dispatch("setUser", null);
        window.mirrorCommandQueue = {
            system: "mirror",
            user: ""
          };
        this.$store.dispatch("setTeam", "");
        this.$router.push("/registerAndLogin");
      } else {
        this.$Message.error(data.message);
      }
    }
  },
  created() {
    this.mobile = this.$store.getters.getUser;
  },
  mounted() {
    this.menu = {
      activeName: this.$route.path.slice(1).split("/")[1],
      activeopenNames: this.$route.path.slice(1).split("/")[0]
    };
    this.$nextTick(() => {
      this.$refs.activeName.updateOpened();
      this.$refs.activeName.updateActiveName();
    });
  },
  
watch: {
  $route: {
    handler: function(val, oldVal){
      this.menu = {
      activeName: val.path.slice(1).split("/")[1],
      activeopenNames: val.path.slice(1).split("/")[0]
    };
    setTimeout(()=>{
      this.$refs.activeName.updateOpened();
      this.$refs.activeName.updateActiveName();
    },0)
    },
    // 深度观察监听
    deep: true
  }
}
};
</script>
<style lang="less">
#mirror {
  width: 20%;
  height:80px;
  align-self: center; 

}
.meta-title {
  font-size: 24px;
  color: #000;
  text-align: left;
  padding: 10px;
  margin-top: 60px;
}
.ivu-team {
  height: 30px;
  display: inline-block;
  background: #3ad0d7;
  line-height: 30px;
  border-radius: 5px;
  color: #fff;
}
.layout-team {
  position: absolute;
  right: 220px;
}
.DropdownMenu {
  width: 130px;
}
.sidebar {
  z-index: 1020;
  width: 240px;
  height: 100%;
  background: #35404f;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 0 0 50px;
  transition: width 0.2s, left 0.2s;
  box-shadow: 2px 0 10px 0 rgba(166, 166, 166, 0.5);
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
  margin-right: 10px;
}
.layout-header {
  width: calc(100% - 240px);
  position: fixed;
  top: 0;
  right: 0;
  padding: 0;
  height: auto;
  z-index: 999;
  background: #fff;
  box-shadow: 0 1px 1px 0 rgba(166, 166, 166, 0.2);
  transition: margin-left 0.2s ease;
  .layout-logo {
    display: inline-block;
    color: #3ad0d7;
  }
  .layout-nav {
    display: inline-block;
    margin-right: 40px;
    float: right;
    &:hover {
      background: #eaf2f3;
    }
  }
}
.icon-color {
  color: #3ad0d7;
  font-size: 40px;
}
#userName {
  color: #3ad0d7;
}
</style>
