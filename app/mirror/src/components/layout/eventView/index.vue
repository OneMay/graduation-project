<template>
  <div class="content-width-right content-flex">
    <Card class="ivu-card-body-flex"
      >选择事件：
      <Select
        v-model="event"
        :filterable="true"
        @on-change="selectChange"
        style="width:20%"
        :loading="isloading"
      >
        <OptionGroup
          v-for="event in userEvent"
          :label="event.name"
          :key="event.name"
        >
          <Option
            v-for="item in event.event"
            :value="String([item.action, item.category])"
            :key="item.action + '@' + item.category"
            >{{ item.category }}</Option
          >
        </OptionGroup>
      </Select>
    </Card>
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
          <span class="my-span">{{
            event_name[1] ? event_name[1] : event_name.join("")
          }}</span>
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
      userEvent: [],
      event: "",
      event_name: [],
      date: [],
      text: "等一等啊o(╥﹏╥)o",
      loading: false,
      isloading: true,
      options: {
        disabledDate(data) {
          if (data > new Date()) {
            return true;
          }
        }
      },
      data: {}
    };
  },
  methods: {
    selectChange(val) {
      this.event = val;
      this.event_name = val.split(",");
      this.getUserEventByOne();
    },
    change(val) {
      this.date = val;
    },
    choosed() {
      if(this.userEvent.length>0){
         this.getUserEventByOne();
      }
     
    },
    async getUserEvents() {
      this.isloading = true;
      const params = {
        teamEn: this.$store.getters.getTeam.teamEn
      };
      let data = await Fetcher.getUserEvents(this, params);
      if (data.code === 200) {
        this.isloading = false;
        this.userEvent = data.data;
        this.userEvent.length === 0
          ? ((this.loading = true), (this.text = "暂无数据o(╥﹏╥)o"))
          : ((this.loading = true), (this.text = "等一等啊o(╥﹏╥)o"));
          if(this.userEvent.length>0){
             this.event = String([this.userEvent[0].event[0].action, this.userEvent[0].event[0].category]);
               this.event_name= this.event.split(",");
              this.getUserEventByOne();
          }
      } else {
        this.$Message.error(data.message);
      }
    },
    async getUserEventByOne() {
     Fetcher.postEventViewData({
          action: "事件分析",
          category: "自定义事件分析"
        });
      this.loading = true;
      const params = {
        time: [
          this.$moment(this.date[0]).format("YYYY-MM-DD"),
          this.$moment(this.date[1]).format("YYYY-MM-DD")
        ],
        teamEn: this.$store.getters.getTeam.teamEn,
        category: this.event_name[1] ? this.event_name[1] : "unknown",
        action: this.event_name[0] ? this.event_name[0] : "unknown"
      };
      let data = await Fetcher.getUserEventByOne(this, params);
      if (data.code === 200) {
        this.loading = false;
        this.data = {
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
              name: "用户使用本事件的触发数",
              type: "line",
              barWidth: "60%",
              data: data.data.seriesData
            }
          ]
        };
      } else {
        this.$Message.error(data.message);
      }
    }
  },
  created() {
    let dayNow = this.$moment().subtract(0, "days").format("YYYY-MM-DD");
    let agoDay = this.$moment().subtract(6, "days").format("YYYY-MM-DD");
    this.date = [agoDay, dayNow];
    this.getUserEvents();
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
