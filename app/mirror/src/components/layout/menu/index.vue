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
      <vue-scroll :ops="ops">
        <Submenu name="overview">
          <template slot="title">
            <Icon type="ios-eye-outline" />
            我的概览
          </template>
          <MenuItem name="kanban" to="/overview/kanban">数据看板</MenuItem>
        </Submenu>
        <Submenu name="behavior">
          <template slot="title">
            <Icon type="ios-filing" />
            行为分析
          </template>
          <MenuItem name="pageOverView" to="/behavior/pageOverView"
            >页面分析</MenuItem
          >
          <MenuItem name="eventOverView">事件分析</MenuItem>
        </Submenu>
        <Submenu name="user">
          <template slot="title">
            <Icon type="md-contact" />
            用户分析
          </template>
          <MenuItem name="userFeatures">用户特征</MenuItem>
        </Submenu>
      </vue-scroll>
    </Menu>
    <Header class="layout-header">
      <Menu mode="horizontal" theme="light" active-name="1">
        <div class="layout-logo">魔镜-精细化运营工具</div>
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
              <DropdownItem ><span @click="logout">退出</span></DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Menu>
    </Header>
  </div>
</template>
<script>
import commenMotheds from './../../../assets/commen'
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
      mobile: "15928221807",
      menu: {
        activeName: "kanban",
        activeopenNames: []
      }
    };
  },
  methods: {
      logout(){
          this.$http
          .post("api/user/logout")
          .then(res => {
            let data = commenMotheds.parserDataToJson(res.data);
            if (data.code === 200) {
              this.$Message.success("退出成功");
              this.$store.dispatch("setUser",null);
              this.$router.push('/registerAndLogin');
            } else {
              this.$Message.error(data.message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
  },
  created() {
      this.mobile=this.$store.getters.getUser;
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
  }
};
</script>
<style lang="less">
#mirror {
  width: 20%;
}
.DropdownMenu{
    width:130px;
}
.sidebar {
  z-index: 1020;
  width: 240px;
  height: 100%;
  background: #35404f;
  position: fixed;
  top: 0;
  left: 0;
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
  z-index:999;
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
