<template>
  <div class="content-width-right content-flex">
    <Loading v-if="loading" :text="text"></Loading>
    <Card
      class="ivu-card-body-flex"
      style="min-height:400px"
      v-for="item in pageList"
      :key="item._id"
      v-else
    >
      <p>
        <span class="label">ip:</span><span>{{ item.ip }}</span>
      </p>
      <p>
        <span class="label">地址:</span><span>{{ item.address }}</span>
      </p>
      <p>
        <span class="label">时间:</span><span>{{ item.timeFormat }}</span>
      </p>
      <p>
        <span class="label">用户:</span><span>{{ item.user }}</span>
      </p>
      <p>
        <span class="label">功能名称:</span><span>{{ item.action }}</span>
      </p>
      <p>
        <span class="label">事件名称:</span><span>{{ item.category }}</span>
      </p>
      <p>
        <span class="label">页面URL:</span><span>{{ item.pageUrl }}</span>
      </p>
      <p>
        <span class="label">操作系统:</span
        ><span>{{ item.operatingSystem }}</span>
      </p>
      <p>
        <span class="label">页面标题:</span><span>{{ item.pageTitle }}</span>
      </p>
      <p>
        <span class="label">浏览器名称:</span
        ><span>{{ item.browserName }}</span>
      </p>
      <p>
        <span class="label">浏览器版本:</span
        ><span>{{ item.browserVersion }}</span>
      </p>
      <p>
        <span class="label">上一个页面URL:</span
        ><span>{{ item.previousPageUrl }}</span>
      </p>
    </Card>
    <div style="margin: 10px;overflow: hidden">
      <p class="tooltip">最多显示1000条数据</p>
      <div style="float: right;">
        <Page
          :total="total"
          :current="current"
          @on-change="changePage"
          :page-size="pageSize"
        ></Page>
      </div>
    </div>
  </div>
</template>
<script>
import Fetcher from "../../../assets/fetcher";
import Loading from "./../../commen/loading";
export default {
  name: "pageData",
  data() {
    return {
      pageData: [],
      pageList: [],
      total: 0,
      current: 1,
      pageSize: 10,
      loading: true,
      text: "等一等啊o(╥﹏╥)o"
    };
  },
  methods: {
    changePage(num) {
      this.pageList = this.pageData.slice(
        this.pageSize * (num - 1),
        this.pageSize * num
      );
    },
    async getEventData() {
      const params = {
        teamEn: this.$store.getters.getTeam.teamEn
      };
      let data = await Fetcher.getEventData(this, params);
      if (data.code === 200) {
        data.data.length > 0
          ? (this.loading = false)
          : ((this.loading = true), (this.text = "暂无数据o(╥﹏╥)o"));
        this.pageData = data.data;
        this.current = 1;
        this.total = this.pageData.length;
        this.pageList = this.pageData.slice(
          this.pageSize * (1 - 1),
          this.pageSize * 1
        );
      } else {
        this.$Message.error(data.message);
      }
    }
  },
  created() {
    this.getEventData();
    Fetcher.postEventViewData({
      action: "实时数据",
      category: "事件数据查看"
    });
  },
  components: {
    Loading
  }
};
</script>
<style lang="less" scoped>
.content-flex {
  flex-direction: column;
  position: relative;
  min-height: calc(100% - 130px) !important;
  background: #fbf9f9;
}
.tooltip {
  display: inline-block;
  float: right;
  line-height: 32px;
}
.ivu-card:hover {
  box-shadow: 0 1px 6px #2dca93;
  border-color: #2dca93;
}
.ivu-card-body-flex {
  width: 49.3%;
  text-align: left;
  margin: 0 auto;
  margin-top: 15px;
  .ivu-card-bodys {
    display: flex;
    flex-direction: column;
    height: 400px;
  }
  p {
    font-size: 25px;
    color: #6b6565;
    font-family: cursive;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
