<template>
  <div class="content-width-right content-flex">
    <DetailedCardSm :detail="provinceDistribution"></DetailedCardSm>
    <DetailedCardSm :detail="cityDistribution"></DetailedCardSm>
    <DetailedCardSm :detail="dosDistribution"></DetailedCardSm>
    <DetailedCardSm :detail="userDistribution"></DetailedCardSm>
  </div>
</template>
<script>
import DetailedCardSm from "./../kanban/detailedCardSm";
export default {
  name: "UserFeatures",
  data() {
    return {
      provinceDistribution: {
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
            color: [
              "#d94e5d",
              "#eac736",
              "#50a3ba",
              "#5ea6f1",
              "#000",
              "#49b91c",
              "#20231f"
            ],
            textStyle: {
              color: "#fff"
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
              data: [
                { value: 335, name: "直接访问" },
                { value: 310, name: "邮件营销" },
                { value: 274, name: "联盟广告" },
                { value: 235, name: "视频广告" },
                { value: 400, name: "搜索引擎" }
              ]
            }
          ]
        }
      },
      cityDistribution: {
        loading: false,
        name: "Web 访问城市分布",
        _id: "cityDistribution",
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
            color: [
              "#d94e5d",
              "#eac736",
              "#50a3ba",
              "#5ea6f1",
              "#000",
              "#49b91c",
              "#20231f"
            ],
            textStyle: {
              color: "#fff"
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
              name: "Web 访问城市分布",
              type: "pie",
              barWidth: "60%",
              data: [
                { value: 335, name: "直接访问" },
                { value: 310, name: "邮件营销" },
                { value: 274, name: "联盟广告" },
                { value: 235, name: "视频广告" },
                { value: 400, name: "搜索引擎" }
              ]
            }
          ]
        }
      },
      dosDistribution: {
        loading: false,
        name: "Web 访问操作系统",
        _id: "dosDistribution",
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
            color: [
              "#d94e5d",
              "#eac736",
              "#50a3ba",
              "#5ea6f1",
              "#000",
              "#49b91c",
              "#20231f"
            ],
            textStyle: {
              color: "#fff"
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
              name: "Web 访问操作系统",
              type: "pie",
              barWidth: "60%",
              data: [
                { value: 335, name: "直接访问" },
                { value: 310, name: "邮件营销" },
                { value: 274, name: "联盟广告" },
                { value: 235, name: "视频广告" },
                { value: 400, name: "搜索引擎" }
              ]
            }
          ]
        }
      },
      userDistribution: {
        loading: false,
        name: "Web 新/非新用户",
        _id: "user",
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
            color: [
              "#d94e5d",
              "#eac736",
              "#50a3ba",
              "#5ea6f1",
              "#000",
              "#49b91c",
              "#20231f"
            ],
            textStyle: {
              color: "#fff"
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
              name: "Web 访问新/非新用户",
              type: "pie",
              barWidth: "60%",
              data: [
                { value: 335, name: "直接访问" },
                { value: 310, name: "邮件营销" },
                { value: 274, name: "联盟广告" },
                { value: 235, name: "视频广告" },
                { value: 400, name: "搜索引擎" }
              ]
            }
          ]
        }
      }
    };
  },
  components: {
    DetailedCardSm
  }
};
</script>
<style lang="less" scoped>
</style>
