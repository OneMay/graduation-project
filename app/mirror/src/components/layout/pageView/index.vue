<template>
  <div class="content-width-right content-flex">
    <Card class="ivu-card-body-flex" style="min-height:500px">
      <div class="my-card-body">
        <div>
          <DatePicker
            type="daterange"
            split-panels
            placeholder="Select date"
            style="width: 200px"
            :clearable="false"
            :editable="false"
            :options="options"
            v-model="date"
            @on-change="change"
            :confirm="true"
            @on-ok="choosed"
          ></DatePicker>
          <span class="my-span">PV</span>
        </div>
        <div style="position:relative;height:100%">
          <Loading v-if="loading"></Loading>
          <VueEchartsComponent :ops="data" v-else></VueEchartsComponent>
        </div>
      </div>
    </Card>
    <Card class="ivu-card-body-flex">
      <Table
        width="100%"
        height="auto"
        border
        :columns="columns"
        :data="pvDataList"
      ></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page
            :total="total"
            :current="current"
            @on-change="changePage"
            :page-size="pageSize"
          ></Page>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import commenMotheds from "./../../../assets/commen";
import VueEchartsComponent from "./../../commen/echarts";
import Loading from "./../../commen/loading";
export default {
  name: "EventDetail",
  data() {
    return {
      date: [],
      loading: false,
      total: 0,
      current: 1,
      options: {
        disabledDate(data) {
          if (data > new Date()) {
            return true;
          }
        }
      },
      data: {
        title: {
          show: false,
          text: "PV",
          textStyle: {
            color: "#8492A6",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "14",
            align: "center"
          }
        },
        legend: {
          type: "scroll",
          show: true,
          bottom: 10,
          // data: 'Web浏览页面用户的触发数'
          textStyle: {
            color: "#8492A6",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "14",
            align: "center"
          }
        },
        color: ["#5ea6f1"],
        tooltip: {
          //悬浮提示层设置
          trigger: "axis",
          backgroundColor: "#fff",
          borderColor: "#5ea6f1",
          borderWidth: 1,
          textStyle: {
            color: "#8492A6",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "14"
          },
          axisPointer: {
            type: "line"
          },
          formatter:
            '{b0}<br /><span style="width:10px;height:10px;background:#5ea6f1;border-radius:50%;display:inline-block"></span>{a}: {c}' +
            " 次"
        },
        xAxis: [
          {
            type: "category",
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              //坐标轴刻度
              lineStyle: {
                color: "#8492A6"
              }
            },
            axisLabel: {
              //坐标轴刻度下的字符
              color: "#8492A6",
              fontStyle: "normal",
              fontWeight: "light",
              fontSize: "14"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              //分隔线设置
              show: true,
              lineStyle: {
                color: "#8492A6",
                type: "dashed"
              }
            },
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: "#8492A6"
              }
            },
            axisLabel: {
              color: "#8492A6",
              fontStyle: "normal",
              fontWeight: "light",
              fontSize: "14"
            }
          }
        ],
        series: [
          {
            name: "PV",
            type: "line",
            barWidth: "60%",
            data: [995, 666, 444, 858, 654, 236, 645]
          }
        ]
      },
      columns: [
        {
          title: "url",
          key: "url",
          width: "auto",
          maxWidth: 700,
          render: (h, params) => {
            return h(
              "router-link",
              {
                props: {
                  to: "/behavior/pageOverView/detail?" + "url=" + params.row.url
                }
              },
              [
                h("Icon", {
                  props: {
                    type: "ios-document"
                  }
                }),
                h("span", {}, params.row.url)
              ]
            );
          }
        },
        {
          title: "PV(次)",
          key: "pv",
          width: "auto",
          align: "center"
        }
      ],
      pvData: [
        {
          url: "https://www.iviewui.com/components/table",
          pv: 363
        },
        {
          url: "https://www.iviewui.com/components/table",
          pv: 363
        },
        {
          url: "https://www.iviewui.com/components/table",
          pv: 363
        },
        {
          url: "https://www.iviewui.com/components/table",
          pv: 363
        },
        {
          url: "https://www.iviewui.com/components/table",
          pv: 363
        },
        {
          url: "https://www.iviewui.com/components/table",
          pv: 363
        },
        {
          url: "https://www.iviewui.com/components/table",
          pv: 363
        }
      ],
      pvDataList: [],
      pageSize: 5
    };
  },
  methods: {
    change(val) {
      this.date = val;
      console.log(this.date);
    },
    choosed() {},
    //分页
    changePage(num) {
      this.pvDataList = this.pvData.slice(
        this.pageSize * (num - 1),
        this.pageSize * num
      );
    }
  },
  created() {
    let dayNow = commenMotheds.Format(new Date(), "yyyy-MM-dd");
    let agoDay = commenMotheds.Format(
      new Date(commenMotheds.changeForDate(dayNow, -6)),
      "yyyy-MM-dd"
    );
    this.date = [agoDay, dayNow];
    this.current = 1;
    this.total = this.pvData.length;
    this.pvDataList = this.pvData.slice(
      this.pageSize * (1 - 1),
      this.pageSize * 1
    );
  },
  components: {
    VueEchartsComponent,
    Loading
  }
};
</script>
<style lang="less" scoped>
.ivu-card-body-flex {
  width: 98.8%;
  text-align: left;
  margin-left: 5px;
  margin-top: 15px;
  .my-card-body {
    height: 400px;
  }
  .my-span {
    text-align: center;
    display: inherit;
    top: -30px;
    font-size: 18px;
    position: relative;
  }
}
</style>
