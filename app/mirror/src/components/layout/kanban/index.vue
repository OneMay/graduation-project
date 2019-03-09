<template>
  <div class="content-width-right content-flex" >
      
    <Card
      style="width:24.5%;text-align: left; margin-left: 5px;height:222px;"
      v-for="item in dataList"
      :key="item._id"
    >
    <Loading v-if="false"></Loading>
      <div class="widget-content-container" v-else>
        <div class="widget-topbar">
          <div class="widget-title">
            <div class="title nav">
              <router-link :to="'/overview/kanban/' + item._id">
                {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="widget-chart-container container">
          <div class="col-md-12 only" data-container="main">
            <div class="dashboard-number-container number-type1">
              <div class="inner">
                <div class="main-number-content">
                  <div class="">
                    <div>合计</div>
                    <div class="number-content clearfix">
                      <span class="number" :title="item.number">{{
                        item.numbertoDecimal
                      }}</span>
                      <span class="measuresUnit">{{ item.unit }}</span>
                    </div>
                  </div>
                </div>
                <div class="second-number-content">
                  <div>
                    <div class="mom-yoy-content">
                      <Tooltip :content="'对比昨天'" placement="top-start">
                        <span class="measuresUnit">环比</span>
                        <span class="kpi-rise">
                          <Icon
                            type="md-arrow-dropup"
                            v-if="item.ratio.trend > 0"
                          />
                          <Icon
                            type="md-arrow-dropdown"
                            v-else-if="item.ratio.trend < 0"
                          />
                          <Icon type="ios-remove" v-else />
                          <span>{{ item.ratio.number }}</span>
                        </span>
                      </Tooltip>
                      <Tooltip :content="'对比上周'" placement="top-start">
                        <span class="measuresUnit">同比</span>
                        <span class="kpi-rise">
                          <Icon
                            type="md-arrow-dropup"
                            v-if="item.basis.trend > 0"
                          />
                          <Icon
                            type="md-arrow-dropdown"
                            v-else-if="item.basis.trend < 0"
                          />
                          <Icon type="ios-remove" v-else />
                          <span>{{ item.basis.number }}</span>
                        </span>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
    <Card class="ivu-card-body-flex">
      <div class="widget-content-container  " style="width:20%;position:relative">
         <Loading v-if="false"></Loading>
        <div  v-else>
            <div class="widget-topbar" >
            
          <div class="widget-title">
            <div class="title nav">
              <router-link :to="'/overview/kanban/'">
                {{ "每日访问趋势" }}
              </router-link>
            </div>
            <div class="range">
              2019-02-07<span>~</span>2019-03-08 | 过去 30 天
            </div>
          </div>
        </div>
        <div class="second-number-content">
          <div>
            <span>合计</span>
            <span class="number" title="51267" data-origindata="51267"
              >51,267</span
            >
            <span class="measuresUnit">人</span>
          </div>
          <div>
            <span>均值</span>
            <span class="number" title="4151.50" data-origindata="4151.50"
              >4,151</span
            >
            <span class="measuresUnit">人</span>
          </div>
        </div>
        </div>
      </div>
      
      <VueEchartsComponent :ops="option"></VueEchartsComponent>
      
    </Card>
  </div>
</template>
<script>
import commenMotheds from "./../../../assets/commen";
import VueEchartsComponent from "./../../commen/echarts";
import Loading from './../../commen/loading'
export default {
  name: "Kanban",
  data() {
    return {
      dataList: [
        {
          name: "累计用户量",
          _id: 256,
          number: 233.2565,
          numbertoDecimal: commenMotheds.toDecimal(233.2565, 2),
          unit: "人",
          ratio: {
            trend: 1,
            number: "1.2%"
          },
          basis: {
            trend: 1,
            number: "1.2%"
          }
        },
        {
          name: "新增用户数",
          _id: 2562,
          number: 233.2565,
          numbertoDecimal: commenMotheds.toDecimal(233.2565, 2),
          unit: "人",
          ratio: {
            trend: 1,
            number: "1.2%"
          },
          basis: {
            trend: 1,
            number: "1.2%"
          }
        },
        {
          name: "日活",
          _id: 2563,
          number: 233.2565,
          numbertoDecimal: commenMotheds.toDecimal(233.2565, 2),
          unit: "人",
          ratio: {
            trend: 1,
            number: "1.2%"
          },
          basis: {
            trend: 1,
            number: "1.2%"
          }
        },
        {
          name: "PV",
          _id: 2564,
          number: 233.2565,
          numbertoDecimal: commenMotheds.toDecimal(233.2565, 2),
          unit: "人",
          ratio: {
            trend: 1,
            number: "1.2%"
          },
          basis: {
            trend: 1,
            number: "1.2%"
          }
        }
      ],
      option : {
        color: ['#f44'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {
            type : 'shadow'
          }
        },
        xAxis : [
          {
            type : 'category',
            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月','12月','12月','12月','12月','12月','12月','12月','12月','12月','12月','12月','12月','12月','12月','12月','12月','12月','12月',],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
          {
            name:'每月花费',
            type:'line',
            barWidth: '60%',
            data:[995,666,444,858,654,236,645,546,846,225,547,356,547,547,547,547,547,547,547,547,547,547,547,547,547,547,547,547,547,547,]
          }
        ]
      }
    };
  },
  components: {
    VueEchartsComponent,
    Loading
  }
};
</script>
<style lang="less" scope>
.ivu-card-body{
    height: 100%;
}
.ivu-card:hover {
  box-shadow: 0 1px 6px #2dca93;
  border-color: #2dca93;
}
.ivu-card-body-flex {
  width: 98.8%;
  text-align: left;
  margin-left: 5px;
  margin-top: 15px;
 
  .ivu-card-body {
  display: flex;
   height:400px;
}
}

.widget-content-container {
  background: #fff;
  padding: 14px 20px;
  height: 100%;
  .widget-topbar {
    cursor: move;
    width: 100%;
  }
  .widget-topbar > div {
    display: inline-block;
  }
  .widget-title {
    max-width: calc(100% - 20px);
    .title {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .nav {
      cursor: pointer;
      a {
        display: inline-block;
        font-size: 16px;
        color: #000;
      }
    }
    .range {
      font-size: 12px;
      color: #8492a6;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .container {
    padding-left: 0;
    padding-right: 0;
    .only {
      float: left;
      width: 100%;
      .dashboard-number-container {
        font-family: Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-weight: 400;
        margin-top: 8px;
        position: relative;
        color: #8492a6;
        font-size: 13px;
        .inner {
          max-width: 100%;
          .main-number-content {
            width: 100%;
            .number-content {
              width: 100%;
              margin-top: -3px;
              .number {
                max-width: 80%;
                max-width: calc(100% - 30px);
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 40px;
                float: left;
                color: #000;
              }
              .number + .measuresUnit {
                float: left;
                margin-top: 30px;
              }
            }
          }
        }
        .kpi-rise {
          color: #2dca93;
        }
      }
    }
  }
  .second-number-content {
    float: left;
    border: 0;
    border-top: 1px solid #e9f0f7;
    padding: 28px 0 0;
    margin-top: 28px;
    div span:nth-of-type(1) {
      font-size: 12px;
    }
    .number {
      color: #475669;
      font-size: 18px;
    }
    .measuresUnit {
      font-weight: 300;
    }
  }
}
</style>
