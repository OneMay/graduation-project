<template>
     <Card
      style="width:24.5%;text-align: left; margin-left: 5px;height:222px;margin-top: 15px;"
    >
    <Loading v-if="index.loading"  :text="index.text"></Loading>
      <div class="widget-content-container" v-else>
        <div class="widget-topbar">
          <div class="widget-title">
            <div class="title nav">
              <router-link :to="'/behavior/pageOverView?day=0'" v-if="index._id==='pv'">
                {{ index.name }}
              </router-link>
              <a  v-else-if="index._id==='allUser'">
                {{ index.name }}
              </a>
               <router-link :to="'/behavior/eventOverView/detail?id=' + index._id+'&name='+index.name+'&day=0'" v-else>
                {{ index.name }}
              </router-link>
              <div class="range">{{this.$store.getters.getTeam.buildTime}}<span>~</span>{{this.$moment().format('YYYY-MM-DD')}}| 上线至今</div>
            </div>
          </div>
        </div>
        <div class="widget-chart-container container">
          <div class="col-md-12 only" data-container="main">
            <div class="dashboard-number-container number-type1">
              <div class="inner">
                <div class="main-number-content">
                  <div class="">
                    <div>{{index.conf}}</div>
                    <div class="number-content clearfix">
                      <span class="number" :title="index.number">{{
                        index.numbertoDecimal
                      }}</span>
                      <span class="measuresUnit">{{ index.unit }}</span>
                    </div>
                  </div>
                </div>
                <div class="second-number-content">
                  <div v-if="index._id!=='allUser'">
                    <div class="mom-yoy-content">
                      <Tooltip :content="'对比'+yesterday" placement="top-start">
                        <span class="measuresUnit">环比</span>
                        <span class="kpi-rise">
                          <Icon
                            type="md-arrow-dropup"
                            v-if="index.ratio.trend > 0"
                            :style="'color:#2dca93'"
                          />
                          <Icon
                            type="md-arrow-dropdown"
                            v-else-if="index.ratio.trend < 0"
                            :style="'color:#ea4634'"
                          />
                          <Icon type="ios-pause" style="transform: rotate(90deg)" :style="'color:#368be4'"  v-else/>
                          <span :style="'color:'+ (index.ratio.trend > 0?'#2dca93':(index.ratio.trend < 0?'#ea4634':'#368be4'))">{{ index.ratio.number }}</span>
                        </span>
                      </Tooltip>
                      <Tooltip :content="'对比'+lastWeekDay" placement="top-start">
                        <span class="measuresUnit">同比</span>
                        <span class="kpi-rise">
                          <Icon
                            type="md-arrow-dropup"
                            v-if="index.basis.trend > 0"
                            :style="'color:#2dca93'"
                          />
                          <Icon
                            type="md-arrow-dropdown"
                            v-else-if="index.basis.trend < 0"
                            :style="'color:#ea4634'"
                          />
                          <Icon type="ios-pause" style="transform: rotate(90deg)" :style="'color:#368be4'" v-else/>
                          <span :style="'color:'+ (index.basis.trend > 0?'#2dca93':(index.basis.trend < 0?'#ea4634':'#368be4'))">{{ index.basis.number }}</span>
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
</template>
<script>
import Loading from "./../../commen/loading";
import commenMotheds from "./../../../assets/commen";

export default {
    name:'IndexCard',
    props:['index'],
    components:{
        Loading
    },
    data() {
      return {
         yesterday: commenMotheds.Format(
      new Date(commenMotheds.changeForDate(commenMotheds.Format(new Date(), "yyyy-MM-dd"),  - 1)),
      "yyyy-MM-dd"
    ),
    lastWeekDay:commenMotheds.Format(
      new Date(commenMotheds.changeForDate(commenMotheds.Format(new Date(), "yyyy-MM-dd"),  - 7)),
      "yyyy-MM-dd"
    ),
      }
    },
}
</script>
<style lang="less" scoped>
.ivu-card:hover {
  box-shadow: 0 1px 6px #2dca93;
  border-color: #2dca93;
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
        &:hover{
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
    padding: 15px 0 0;
    margin-top: 0px;
    div span:nth-of-type(1) {
      font-size: 12px;
    }
    .ivu-icon{
      vertical-align: inherit
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
