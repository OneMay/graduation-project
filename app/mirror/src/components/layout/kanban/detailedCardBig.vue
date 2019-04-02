<template>
    <Card class="ivu-card-body-flex" style="min-height:400px">
        <Loading v-if="detail.loading"  :text="detail.text"></Loading>
        <div class="ivu-card-bodys" v-else>
      <div
        class="widget-content-container"
        style="width:20%;position:relative"
      >
        
        <div >
          <div class="widget-topbar">
            <div class="widget-title">
              <div class="title nav">
                <router-link :to="'/behavior/pageOverView/?&day=30'" v-if="detail._id==='visit'">
                  {{ detail.name }}
                </router-link>
                <router-link :to="'/behavior/eventOverView/detail?id=' + detail._id+'&name='+detail.name+'&day=30'" v-else>
                {{ detail.name }}
              </router-link>
              </div>
              <div class="range">
                {{ detail.range[0] }}<span>~</span>{{ detail.range[1] }} | 过去 30
                天
              </div>
            </div>
            
          </div>
          <div class="second-number-content">
            <div>
              <span>合计</span>
              <span class="number">{{ detail.all.number }}</span>
              <span class="measuresUnit">{{ detail.all.measuresUnit }}</span>
            </div>
            <div>
              <span>均值</span>
              <span class="number">{{ detail.average.number }}</span>
              <span class="measuresUnit">{{ detail.average.measuresUnit }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <VueEchartsComponent :ops="detail.option"></VueEchartsComponent>
        </div>
    </Card>
</template>
<script>
import VueEchartsComponent from "./../../commen/echarts";
import Loading from "./../../commen/loading";
export default {
    name:'DetailedCardBig',
    props:['detail'],
    components:{
        VueEchartsComponent,
        Loading
    }
}
</script>
<style lang="less" scoped>
.ivu-card-body {
  height: 100%;
  display: flex;
    height: 400px;
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
  .ivu-card-bodys {
    display: flex;
    height: 400px;
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
        &:hover {
          color: #2dca93;
        }
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
