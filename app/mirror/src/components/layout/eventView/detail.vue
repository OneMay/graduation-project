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
          <span class="my-span">{{ params.name }}</span>
        </div>
        <div style="position:relative;height:100%">
          <Loading v-if="loading" :text="text"></Loading>
          <VueEchartsComponent :ops="data" v-else></VueEchartsComponent>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import commenMotheds from "./../../../assets/commen";
import VueEchartsComponent from "./../../commen/echarts";
import Loading from "./../../commen/loading";
import Fetcher from "../../../assets/fetcher";
export default {
  name: "EventDetail",
  data() {
    return {
      date: [],
      loading: true,
      text: "等一等啊o(╥﹏╥)o",
      options: {
        disabledDate(data) {
          if (data > new Date()) {
            return true;
          }
        }
      },
      data: {},
      params: {
        id: "",
        name: "",
        day: 0
      }
    };
  },
  methods: {
    change(val) {
      this.date = val;
    },
    choosed() {
      this.getDataByQueryId();
    },
    async getDataByQueryId() {
      Fetcher.postEventViewData({
        action: "事件分析",
        category: "基本事件分析"
      });
      let funcName = "",
        funcNamePie = "";
      if (this.params.id) {
        switch (this.params.id) {
          case "newUser":
            funcName = "getNewUserByDayTotal";
            break;
          case "uv":
            funcName = "getUserViewByDayTotal";
            break;
          case "averagePv":
            funcName = "getAverageUserPageView";
            break;
          case "vv":
            funcName = "getvisitViewData";
            break;
          case "vt":
            funcName = "getvisitTimeData";
            break;
          case "vp":
            funcName = "getvisitPageData";
            break;
          default:
            break;
        }
        switch (this.params.id) {
          case "provinceDistribution":
            funcNamePie = "getProvinceData";
            break;
          case "cityDistribution":
            funcNamePie = "getCityData";
            break;
          case "OSDistribution":
            funcNamePie = "getOSData";
            break;
          case "userDistribution":
            funcNamePie = "getUserVisitTimeData";
            break;
          default:
            break;
        }
      }
      if (funcName) {
        this.loading = true;
        const params = {
          time: [
            this.$moment(this.date[0]).format("YYYY-MM-DD"),
            this.$moment(this.date[1]).format("YYYY-MM-DD")
          ],
          teamEn: this.$store.getters.getTeam.teamEn,
          buildTime: this.$store.getters.getTeam.buildTime
        };
        let data = await Fetcher[funcName](this, params);
        if (data.code === 200) {
          this.loading = false;
          this.data = {
            toolbox: {
              show: true,
              feature: {
                magicType: {
                  type: ["line", "bar"]
                },
                restore: {}
              }
            },
            legend: {
              type: "scroll",
              show: true,
              top: 0,
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
                data.data.unit
            },
            xAxis: [
              {
                type: "category",
                data: data.data.xAxisData,
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
                  fontSize: "14",
                  rotate: 45
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
                name: data.data.name,
                type: "line",
                barWidth: "60%",
                data: data.data.seriesData
              }
            ]
          };
        } else {
          this.$Message.error(data.message);
        }
      } else if (funcNamePie) {
        this.loading = true;
        const params = {
          time: [
            this.$moment(this.date[0]).format("YYYY-MM-DD"),
            this.$moment(this.date[1]).format("YYYY-MM-DD")
          ],
          teamEn: this.$store.getters.getTeam.teamEn,
          buildTime: this.$store.getters.getTeam.buildTime
        };
        let data = await Fetcher[funcNamePie](this, params);
        if (data.code === 200) {
          (this.text =
            data.data.seriesData.length > 0
              ? "等一等啊o(╥﹏╥)o"
              : "暂无数据o(╥﹏╥)o"),
            (this.loading = data.data.seriesData.length > 0 ? false : true),
            (this.data = {
              visualMap: {
                show: false,
                min: 10,
                max: 400,
                inRange: {}
              },
              tooltip: {
                //悬浮提示层设置
                trigger: "item",
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
                formatter: "{a} <br/>{b0} : {c} (占{d}%)"
              },

              series: [
                {
                  name: "访问来源",
                  type: "pie",
                  data: data.data.seriesData
                }
              ]
            });
        } else {
          this.$Message.error(data.message);
        }
      } else {
        this.loading = true;
        this.text = "暂无数据o(╥﹏╥)o";
      }
    }
  },
  created() {
    Object.assign(this.params, this.$route.query);
    let dayNow = this.$moment()
      .subtract(this.params.day > 0 ? 1 : 0, "days")
      .format("YYYY-MM-DD");
    let agoDay = this.$moment()
      .subtract(this.params.day >= 0 ? this.params.day : 0, "days")
      .format("YYYY-MM-DD");
    this.date = [agoDay, dayNow];
    this.getDataByQueryId();
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
