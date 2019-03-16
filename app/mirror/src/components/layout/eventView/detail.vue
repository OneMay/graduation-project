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
export default {
  name: "EventDetail",
  data() {
    return {
      date: [],
      loading: true,
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
          text: "过去7天日活",
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
            " 人"
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
            name: "访问全站的用户数",
            type: "line",
            barWidth: "60%",
            data: [995, 666, 444, 858, 654, 236, 645]
          }
        ]
      },
      params: {
        _id: "",
        name: "",
        day: 1
      }
    };
  },
  methods: {
    change(val) {
      this.date = val;
    },
    choosed() {
      this.loading = false;
      console.log(this.loading)
      //console.log(this.date)
    }
  },
  created() {
    Object.assign(this.params, this.$route.query);
    let dayNow = commenMotheds.Format(new Date(), "yyyy-MM-dd");
    let agoDay = commenMotheds.Format(
      new Date(commenMotheds.changeForDate(dayNow, -(this.params.day - 1))),
      "yyyy-MM-dd"
    );
    this.date = [agoDay, dayNow];
    console.log(this.date);
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
