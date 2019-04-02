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
          <span class="my-span">{{ this.$route.query.url?this.$route.query.url:'' }}</span>
        </div>
        <div style="position:relative;height:100%">
          <Loading v-if="loading" :text="'等一等啊o(╥﹏╥)o'"></Loading>
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
      loading: false,
      options: {
        disabledDate(data) {
          if (data > new Date()) {
            return true;
          }
        }
      },
      data: {},
    };
  },
  methods: {
    change(val) {
      this.date = val;
    },
    choosed() {
      this.getPageViewUrl()
    },
    async getPageViewUrl(){
     this.loading=true;
      const params = {
        time: [this.$moment(this.date[0]).format("YYYY-MM-DD"),this.$moment(this.date[1]).format("YYYY-MM-DD")],
        teamEn: this.$store.getters.getTeam.teamEn,
        pageUrl:this.$route.query.url?this.$route.query.url:'/'
      };
      Fetcher.postEventViewData({
          action: "页面分析",
          category: "单个页面pv"
        });
      let data = await Fetcher.getPageViewUrl(this, params);
      if (data.code === 200) {
        this.loading=false;
        this.data =
          {
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
                  " 次"
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
                  name: "Web浏览页面的触发数",
                  type: "line",
                  barWidth: "60%",
                  data: data.data.seriesData
                }
              ]
            }
          
      } else {
        this.$Message.error(data.message);
      }
    }
  },
  created() {
    let dayNow = this.$moment().subtract(0, "days").format("YYYY-MM-DD");
    let agoDay = this.$moment().subtract(0, "days").format("YYYY-MM-DD");
    this.date = [agoDay, dayNow];
    this.getPageViewUrl();
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
