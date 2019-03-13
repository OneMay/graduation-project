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
    <DetailedCardSm
      :detail="Nikkatsu"
    ></DetailedCardSm>
     <DetailedCardSm
      :detail="newuser"
    ></DetailedCardSm>
    <DetailedCardSm
      :detail="visitTime"
    ></DetailedCardSm>
    <DetailedCardSm
      :detail="provinceDistribution"
    ></DetailedCardSm>
  </div>
</template>
<script>
import commenMotheds from "./../../../assets/commen";
import IndexCard from "./indexCard";
import DetailedCardBig from "./detailedCardBig";
import DetailedCardSm from "./detailedCardSm";
export default {
  name: "Kanban",
  data() {
    return {
  user:{
          loading: false,
          name: "累计用户量",
          _id: 'allUser',
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
        newUser:{
          loading: true,
          name: "新增用户数",
          _id: 'newUser',
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
        uv:{
          loading: false,
          name: "日活",
          _id: 'nikkatsu',
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
        pv:{
          loading: false,
          name: "PV",
          _id: 'pv',
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
      detailList: [
        {
          number: 233.2565,
          numbertoDecimal: commenMotheds.toDecimal(233.2565, 2),
          unit: "人",
          loading: false,
          name: "每日访问趋势",
          _id: "visit",
          range: ["2019-02-07", "2019-03-08"],
          all: {
            number: 5167,
            measuresUnit: "人"
          },
          average: {
            number: 4210,
            measuresUnit: "人"
          },
          ratio: {
            trend: 1,
            number: "1.2%"
          },
          basis: {
            trend: 1,
            number: "1.2%"
          },

          option: {
            title: {
              show: false,
              text: "Web浏览页面用户的触发数",
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
                data: [
                  "1月",
                  "2月",
                  "3月",
                  "4月",
                  "5月",
                  "6月",
                  "7月",
                  "8月",
                  "9月",
                  "10月",
                  "11月",
                  "12月",
                  "12月",
                  "12月",
                  "12月",
                  "12月",
                  "12月",
                  "12月",
                  "12月",
                  "12月",
                  "12月",
                  "12月",
                  "12月",
                  "12月",
                  "12月",
                  "12月",
                  "12月",
                  "12月",
                  "12月",
                  "12月"
                ],
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
                name: "Web浏览页面用户的触发数",
                type: "line",
                barWidth: "60%",
                data: [
                  995,
                  666,
                  444,
                  858,
                  654,
                  236,
                  645,
                  546,
                  846,
                  225,
                  547,
                  356,
                  547,
                  547,
                  547,
                  547,
                  547,
                  547,
                  547,
                  547,
                  547,
                  547,
                  547,
                  547,
                  547,
                  547,
                  547,
                  547,
                  547,
                  547
                ]
              }
            ]
          }
        }
      ],
      Nikkatsu:
        {
          loading: false,
          name: "过去7天日活",
          _id: "nikkatsu",
          range: ["2019-02-07", "2019-03-08"],
          all: {
            number: 5167,
            measuresUnit: "人"
          },
          average: {
            number: 4210,
            measuresUnit: "人"
          },
          option: {
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
          }
        },
         newuser:
        {
          loading: false,
          name: "去过7天新用户数",
          _id: "newUser",
          range: ["2019-02-07", "2019-03-08"],
          all: {
            number: 5167,
            measuresUnit: "人"
          },
          average: {
            number: 4210,
            measuresUnit: "人"
          },
          option: {
            title: {
              show: false,
              text: "去过7天新用户数",
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
                name: "访问全站的新用户数",
                type: "line",
                barWidth: "60%",
                data: [995, 666, 444, 858, 654, 236, 645]
              }
            ]
          }
        },
         visitTime:
        {
          loading: false,
          name: "平均访问时长",
          _id: "visitTime",
          range: ["2019-02-07", "2019-03-08"],
          all: {
            number: 5167,
            measuresUnit: "人"
          },
          average: {
            number: 4210,
            measuresUnit: "人"
          },
          option: {
            title: {
              show: false,
              text: "平均访问时长",
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
                " 秒"
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
                name: "平均访问时长",
                type: "line",
                barWidth: "60%",
                data: [995, 666, 444, 858, 654, 236, 645]
              }
            ]
          }
        },
         provinceDistribution:
        {
          loading: false,
          name: "Web 访问省份分布",
          _id: "provinceDistribution",
          range: ["2019-02-07", "2019-03-08"],
          all: {
            number: 5167,
            measuresUnit: "人"
          },
          average: {
            number: 4210,
            measuresUnit: "人"
          },
          option: {
            color: ["#5ea6f1"],
             visualMap: {
                show: false,
                min: 80,
                max: 400,
                color: ['#d94e5d','#eac736','#50a3ba',"#5ea6f1",'#000','#49b91c','#20231f'],
                textStyle: {
                    color: '#fff'
                }
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
                name: "Web 访问省份分布",
                type: "pie",
                barWidth: "60%",
              data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:274, name:'联盟广告'},
                {value:235, name:'视频广告'},
                {value:400, name:'搜索引擎'}
            ]
              }
            ]
          }
        },
    };
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
