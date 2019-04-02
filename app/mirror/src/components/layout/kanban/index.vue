<template>
  <div class="content-width-right content-flex">
    <IndexCard :index="user"></IndexCard>
    <IndexCard :index="newUser"></IndexCard>
    <IndexCard :index="uv"></IndexCard>
    <IndexCard :index="pv"></IndexCard>
    <DetailedCardBig
      v-for="item in detailList"
      :key="item._id"
      :detail="item"
    ></DetailedCardBig>
    <DetailedCardSm :detail="Nikkatsu"></DetailedCardSm>
    <DetailedCardSm :detail="newUserByDay"></DetailedCardSm>
    <DetailedCardSm :detail="visitPageView"></DetailedCardSm>
    <DetailedCardSm :detail="provinceDistribution"></DetailedCardSm>
    <IndexCard :index="vv"></IndexCard>
    <IndexCard :index="vt"></IndexCard>
    <IndexCard :index="averagePv"></IndexCard>
    <IndexCard :index="averageVP"></IndexCard>
    <DetailedCardSm :detail="visitView"></DetailedCardSm>
    <DetailedCardSm :detail="visitTime"></DetailedCardSm>
    <DetailedCardBig
      v-for="item in detailList2"
      :key="item._id"
      :detail="item"
    ></DetailedCardBig>
  </div>
</template>
<script>
import commenMotheds from "./../../../assets/commen";
import IndexCard from "./indexCard";
import DetailedCardBig from "./detailedCardBig";
import DetailedCardSm from "./detailedCardSm";
import Fetcher from "../../../assets/fetcher";
export default {
  name: "Kanban",
  data() {
    return {
      user: {
        loading: true,
        text: "等一等啊o(╥﹏╥)o"
      },
      newUser: {
        loading: true,
        text: "等一等啊o(╥﹏╥)o"
      },
      uv: {
        loading: true,
        text: "等一等啊o(╥﹏╥)o"
      },
      pv: {
        loading: true,
        text: "等一等啊o(╥﹏╥)o"
      },
      vv: {
        loading: true,
        text: "等一等啊o(╥﹏╥)o"
      },
      vt: {
        loading: true,
        text: "等一等啊o(╥﹏╥)o"
      },
      averagePv:{
        loading: true,
        text: "等一等啊o(╥﹏╥)o"
      },
      averageVP:{
        loading: true,
        text: "等一等啊o(╥﹏╥)o"
      },
      detailList: [
        {
          loading: true,
          text: "等一等啊o(╥﹏╥)o"
        }
      ],
      detailList2: [
        {
          loading: true,
          text: "等一等啊o(╥﹏╥)o"
        }
      ],
      Nikkatsu: {
        loading: true,
        text: "等一等啊o(╥﹏╥)o"
      },
      newUserByDay: {
        loading: true,
        text: "等一等啊o(╥﹏╥)o"
      },
      visitPageView: {
        loading: true,
        text: "等一等啊o(╥﹏╥)o"
      },
      provinceDistribution: {
        loading: true,
        text: "等一等啊o(╥﹏╥)o"
      },
      visitView: {
        loading: true,
        text: "等一等啊o(╥﹏╥)o"
      },
      visitTime: {
        loading: true,
        text: "等一等啊o(╥﹏╥)o"
      }
    };
  },
  methods: {
    async getUserTotal() {
      const params = {
        time: [
          this.$store.getters.getTeam.buildTime,
          this.$moment().format("YYYY-MM-DD")
        ],
        teamEn: this.$store.getters.getTeam.teamEn
      };
      let data = await Fetcher.getUserTotal(this, params);
      if (data.code === 200) {
        this.user = {
          loading: false,
          text: "等一等啊o(╥﹏╥)o",
          name: "累计用户量",
          conf: "合计",
          _id: "allUser",
          number: data.data,
          numbertoDecimal: commenMotheds.toDecimal(data.data, 0),
          unit: "人"
        };
      } else {
        this.$Message.error(data.message);
      }
    },
    async getNewUserTotal() {
      const params = {
        time: [
          this.$moment().format("YYYY-MM-DD"),
          this.$moment().format("YYYY-MM-DD")
        ],
        teamEn: this.$store.getters.getTeam.teamEn,
        buildTime: this.$store.getters.getTeam.buildTime
      };
      let data = await Fetcher.getNewUserTotal(this, params);
      if (data.code === 200) {
        this.newUser = data.data;
        this.newUser.text = "等一等啊o(╥﹏╥)o";
      } else {
        this.$Message.error(data.message);
      }
    },
    async getUserViewTotal() {
      const params = {
        time: [
          this.$moment().format("YYYY-MM-DD"),
          this.$moment().format("YYYY-MM-DD")
        ],
        teamEn: this.$store.getters.getTeam.teamEn
      };
      let data = await Fetcher.getUserViewTotal(this, params);
      if (data.code === 200) {
        this.uv = data.data;
        this.uv.text = "等一等啊o(╥﹏╥)o";
      } else {
        this.$Message.error(data.message);
      }
    },
    async getPageViewTotal() {
      const params = {
        time: [
          this.$moment().format("YYYY-MM-DD"),
          this.$moment().format("YYYY-MM-DD")
        ],
        teamEn: this.$store.getters.getTeam.teamEn
      };
      let data = await Fetcher.getPageViewTotal(this, params);
      if (data.code === 200) {
        this.pv = data.data;
        this.pv.text = "等一等啊o(╥﹏╥)o";
      } else {
        this.$Message.error(data.message);
      }
    },
    async getVisitViewTotal() {
      const params = {
        time: [
          this.$moment().format("YYYY-MM-DD"),
          this.$moment().format("YYYY-MM-DD")
        ],
        teamEn: this.$store.getters.getTeam.teamEn
      };
      let data = await Fetcher.getvisitViewTotalData(this, params);
      if (data.code === 200) {
        this.vv = data.data;
        this.vv.text = "等一等啊o(╥﹏╥)o";
      } else {
        this.$Message.error(data.message);
      }
    },
    async getVisitTimeTotal() {
      const params = {
        time: [
          this.$moment().format("YYYY-MM-DD"),
          this.$moment().format("YYYY-MM-DD")
        ],
        teamEn: this.$store.getters.getTeam.teamEn
      };
      let data = await Fetcher.getvisitTimeTotalData(this, params);
      if (data.code === 200) {
        this.vt = data.data;
        this.vt.text = "等一等啊o(╥﹏╥)o";
      } else {
        this.$Message.error(data.message);
      }
    },
    async getaveragePvTotal() {
      const params = {
        time: [
          this.$moment().format("YYYY-MM-DD"),
          this.$moment().format("YYYY-MM-DD")
        ],
        teamEn: this.$store.getters.getTeam.teamEn
      };
      let data = await Fetcher.getOverViewAverageUserPageView(this, params);
      if (data.code === 200) {
        this.averagePv = data.data;
        this.averagePv.text = "等一等啊o(╥﹏╥)o";
      } else {
        this.$Message.error(data.message);
      }
    },
    async getaverageVPTotal() {
      const params = {
        time: [
          this.$moment().format("YYYY-MM-DD"),
          this.$moment().format("YYYY-MM-DD")
        ],
        teamEn: this.$store.getters.getTeam.teamEn
      };
      let data = await Fetcher.getvisitPageTotalData(this, params);
      if (data.code === 200) {
        this.averageVP = data.data;
        this.averageVP.text = "等一等啊o(╥﹏╥)o";
      } else {
        this.$Message.error(data.message);
      }
    },
    async getPageViewByDayTotal() {
      const params = {
        time: [
          this.$moment()
            .subtract(30, "days")
            .format("YYYY-MM-DD"),
          this.$moment()
            .subtract(1, "days")
            .format("YYYY-MM-DD")
        ],
        teamEn: this.$store.getters.getTeam.teamEn
      };
      let data = await Fetcher.getPageViewByDayTotal(this, params);
      if (data.code === 200) {
        this.detailList = [
          {
            loading: false,
            text: "等一等啊o(╥﹏╥)o",
            name: "过去30天页面浏览量",
            _id: "visit",
            range: [
              this.$moment()
                .subtract(30, "days")
                .format("YYYY-MM-DD"),
              this.$moment()
                .subtract(1, "days")
                .format("YYYY-MM-DD")
            ],
            all: {
              number: data.data.sum,
              measuresUnit: "次"
            },
            average: {
              number: data.data.average,
              measuresUnit: "次"
            },
            option: {
              toolbox: {
                  show: true,
                  feature: {
                      magicType: {
                          type: ['line', 'bar']
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
          }
        ];
      } else {
        this.$Message.error(data.message);
      }
    },
    async getUserViewByDay() {
      const params = {
        time: [
          this.$moment()
            .subtract(7, "days")
            .format("YYYY-MM-DD"),
          this.$moment()
            .subtract(1, "days")
            .format("YYYY-MM-DD")
        ],
        teamEn: this.$store.getters.getTeam.teamEn
      };
      let data = await Fetcher.getUserViewByDayTotal(this, params);
      if (data.code === 200) {
        this.Nikkatsu = {
          loading: false,
          text: "等一等啊o(╥﹏╥)o",
          name: "过去7天日活",
          _id: "uv",
          range: [
            this.$moment()
              .subtract(7, "days")
              .format("YYYY-MM-DD"),
            this.$moment()
              .subtract(1, "days")
              .format("YYYY-MM-DD")
          ],
          all: {
            number: data.data.sum,
            measuresUnit: "人"
          },
          average: {
            number: data.data.average,
            measuresUnit: "人"
          },
          option: {
             toolbox: {
                  show: true,
                  feature: {
                      magicType: {
                          type: ['line', 'bar']
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
                " 人"
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
                name: "过去7天日活",
                type: "line",
                barWidth: "60%",
                data: data.data.seriesData
              }
            ]
          }
        };
      } else {
        this.$Message.error(data.message);
      }
    },
    async getNewUserByDay() {
      const params = {
        time: [
          this.$moment()
            .subtract(7, "days")
            .format("YYYY-MM-DD"),
          this.$moment()
            .subtract(1, "days")
            .format("YYYY-MM-DD")
        ],
        teamEn: this.$store.getters.getTeam.teamEn,
        buildTime: this.$store.getters.getTeam.buildTime
      };
      let data = await Fetcher.getNewUserByDayTotal(this, params);
      if (data.code === 200) {
        this.newUserByDay = {
          loading: false,
          text: "等一等啊o(╥﹏╥)o",
          name: "过去7天新增用户数",
          _id: "newUser",
          range: [
            this.$moment()
              .subtract(7, "days")
              .format("YYYY-MM-DD"),
            this.$moment()
              .subtract(1, "days")
              .format("YYYY-MM-DD")
          ],
          all: {
            number: data.data.sum,
            measuresUnit: "人"
          },
          average: {
            number: data.data.average,
            measuresUnit: "人"
          },
          option: {
             toolbox: {
                  show: true,
                  feature: {
                      magicType: {
                          type: ['line', 'bar']
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
                " 人"
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
                name: "过去7天新增用户数",
                type: "line",
                barWidth: "60%",
                data: data.data.seriesData
              }
            ]
          }
        };
      } else {
        this.$Message.error(data.message);
      }
    },
    async getAverageUserPageView() {
      const params = {
        time: [
          this.$moment()
            .subtract(7, "days")
            .format("YYYY-MM-DD"),
          this.$moment()
            .subtract(1, "days")
            .format("YYYY-MM-DD")
        ],
        teamEn: this.$store.getters.getTeam.teamEn
      };
      let data = await Fetcher.getAverageUserPageView(this, params);
      if (data.code === 200) {
        this.visitPageView = {
          loading: false,
          text: "等一等啊o(╥﹏╥)o",
          name: "过去7天人均页面访问量",
          _id: "averagePv",
          range: [
            this.$moment()
              .subtract(7, "days")
              .format("YYYY-MM-DD"),
            this.$moment()
              .subtract(1, "days")
              .format("YYYY-MM-DD")
          ],
          all: {
            number: data.data.sum,
            measuresUnit: "次"
          },
          average: {
            number: data.data.average,
            measuresUnit: "次"
          },
          option: {
            toolbox: {
                show: true,
                feature: {
                    magicType: {
                        type: ['line', 'bar']
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
                name: "过去7天人均页面访问量",
                type: "line",
                barWidth: "60%",
                data: data.data.seriesData
              }
            ]
          }
        };
      } else {
        this.$Message.error(data.message);
      }
    },
    async getProvinceData() {
      const params = {
        time: [
          this.$moment()
            .subtract(7, "days")
            .format("YYYY-MM-DD"),
          this.$moment()
            .subtract(1, "days")
            .format("YYYY-MM-DD")
        ],
        teamEn: this.$store.getters.getTeam.teamEn
      };
      let data = await Fetcher.getProvinceData(this, params);
      if (data.code === 200) {
        this.provinceDistribution = {
          text:
            data.data.seriesData.length > 0
              ? "等一等啊o(╥﹏╥)o"
              : "暂无数据o(╥﹏╥)o",
          loading: data.data.seriesData.length > 0 ? false : true,
          name: "过去7天Web 访问省份分布",
          _id: "provinceDistribution",
          range: [
            this.$moment()
              .subtract(7, "days")
              .format("YYYY-MM-DD"),
            this.$moment()
              .subtract(1, "days")
              .format("YYYY-MM-DD")
          ],
          all: {
            number: data.data.sum,
            measuresUnit: "个"
          },
          average: {
            number: data.data.average,
            measuresUnit: "个"
          },
          option: {
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
          }
        };
      } else {
        this.$Message.error(data.message);
      }
    },
    async getVisitViewDayData() {
      const params = {
        time: [
          this.$moment()
            .subtract(7, "days")
            .format("YYYY-MM-DD"),
          this.$moment()
            .subtract(1, "days")
            .format("YYYY-MM-DD")
        ],
        teamEn: this.$store.getters.getTeam.teamEn
      };
      let data = await Fetcher.getvisitViewData(this, params);
      if (data.code === 200) {
        this.visitView = {
          text:
            data.data.seriesData.length > 0
              ? "等一等啊o(╥﹏╥)o"
              : "暂无数据o(╥﹏╥)o",
          loading: data.data.seriesData.length > 0 ? false : true,
          name: "过去7天访问次数",
          _id: "vv",
          range: [
            this.$moment()
              .subtract(7, "days")
              .format("YYYY-MM-DD"),
            this.$moment()
              .subtract(1, "days")
              .format("YYYY-MM-DD")
          ],
          all: {
            number: data.data.sum,
            measuresUnit: "次"
          },
          average: {
            number: data.data.average,
            measuresUnit: "次"
          },
          option: {
            toolbox: {
                show: true,
                feature: {
                    magicType: {
                        type: ['line', 'bar']
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
                name: "过去7天访问次数",
                type: "line",
                barWidth: "60%",
                data: data.data.seriesData
              }
            ]
          }
        };
      } else {
        this.$Message.error(data.message);
      }
    },
    async getVisitTimeDayData() {
      const params = {
        time: [
          this.$moment()
            .subtract(7, "days")
            .format("YYYY-MM-DD"),
          this.$moment()
            .subtract(1, "days")
            .format("YYYY-MM-DD")
        ],
        teamEn: this.$store.getters.getTeam.teamEn
      };
      let data = await Fetcher.getvisitTimeData(this, params);
      if (data.code === 200) {
        this.visitTime = {
          text:
            data.data.seriesData.length > 0
              ? "等一等啊o(╥﹏╥)o"
              : "暂无数据o(╥﹏╥)o",
          loading: data.data.seriesData.length > 0 ? false : true,
          name: "过去7天平均访问时长",
          _id: "vt",
          range: [
            this.$moment()
              .subtract(7, "days")
              .format("YYYY-MM-DD"),
            this.$moment()
              .subtract(1, "days")
              .format("YYYY-MM-DD")
          ],
          all: {
            number: data.data.sum,
            measuresUnit: "秒"
          },
          average: {
            number: data.data.average,
            measuresUnit: "秒"
          },
          option: {
            toolbox: {
                show: true,
                feature: {
                    magicType: {
                        type: ['line', 'bar']
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
                " 秒"
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
                name: "过去7天平均访问时长",
                type: "line",
                barWidth: "60%",
                data: data.data.seriesData
              }
            ]
          }
        };
      } else {
        this.$Message.error(data.message);
      }
    },
    async getVisitPageByDayTotal() {
      const params = {
        time: [
          this.$moment()
            .subtract(30, "days")
            .format("YYYY-MM-DD"),
          this.$moment()
            .subtract(1, "days")
            .format("YYYY-MM-DD")
        ],
        teamEn: this.$store.getters.getTeam.teamEn
      };
      let data = await Fetcher.getvisitPageData(this, params);
      if (data.code === 200) {
        this.detailList2 = [
          {
            loading: false,
            text: "等一等啊o(╥﹏╥)o",
            name: "过去30天平均访问页数",
            _id: "vp",
            range: [
              this.$moment()
                .subtract(30, "days")
                .format("YYYY-MM-DD"),
              this.$moment()
                .subtract(1, "days")
                .format("YYYY-MM-DD")
            ],
            all: {
              number: data.data.sum,
              measuresUnit: "页"
            },
            average: {
              number: data.data.average,
              measuresUnit: "页"
            },
            option: {
              toolbox: {
                show: true,
                feature: {
                    magicType: {
                        type: ['line', 'bar']
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
                  " 页"
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
                  name: "平均访问页数",
                  type: "line",
                  barWidth: "60%",
                  data: data.data.seriesData
                }
              ]
            }
          }
        ];
      } else {
        this.$Message.error(data.message);
      }
    }
  },
  created() {
    this.getUserTotal();
    this.getNewUserTotal();
    this.getUserViewTotal();
    this.getPageViewTotal();
    this.getPageViewByDayTotal();
    this.getUserViewByDay();
    this.getNewUserByDay();
    this.getAverageUserPageView();
    this.getProvinceData();
    this.getVisitViewTotal();
    this.getVisitViewDayData();
    this.getVisitTimeTotal();
    this.getVisitTimeDayData();
    this.getaveragePvTotal();
    this.getaverageVPTotal();
    this.getVisitPageByDayTotal();
  },
  components: {
    IndexCard,
    DetailedCardBig,
    DetailedCardSm
  }
};
</script>
<style lang="less" scope>
</style>
