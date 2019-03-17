<template>
  <div class="content-width-right content-flex">
    <DetailedCardSm :detail="provinceDistribution"></DetailedCardSm>
    <DetailedCardSm :detail="cityDistribution"></DetailedCardSm>
    <DetailedCardSm :detail="OSDistribution"></DetailedCardSm>
    <DetailedCardSm :detail="userDistribution"></DetailedCardSm>
  </div>
</template>
<script>
import DetailedCardSm from "./../kanban/detailedCardSm";
import moment from 'moment';
import Fetcher from "../../../assets/fetcher";
const echartsData= {
        loading: true,
        text:'等一等啊o(╥﹏╥)o',
        name: "Web 访问省份分布",
        _id: "provinceDistribution",
       range: [
            moment()
              .subtract(7, "days")
              .format("YYYY-MM-DD"),
            moment()
              .subtract(1, "days")
              .format("YYYY-MM-DD")
          ],
        all: {
          number: 0,
          measuresUnit: ""
        },
        average: {
          number: 0,
          measuresUnit: ""
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
                data: []
              }
            ]         
        }
      }
export default {
  name: "UserFeatures",
  data() {
    return {
      provinceDistribution: echartsData,
      cityDistribution:echartsData,
      OSDistribution: echartsData,
      userDistribution: echartsData
    };
  },
  methods: {
    async getProvinceDta(){
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
        let newData = JSON.parse(JSON.stringify(this.provinceDistribution));
        newData.loading = false;
        newData._id = 'provinceDistribution';
        newData.name = data.data.name;
        newData.all.number = data.data.sum;
        newData.all.measuresUnit = data.data.unit;
        newData.average.number = data.data.average;
        newData.average.measuresUnit = data.data.unit;
        newData.option.series[0].data = data.data.seriesData;
        if(data.data.seriesData.length<=0){
          newData.text = "暂无数据o(╥﹏╥)o";
          newData.loading = true;
        }else{
          newData.text = "等一等啊o(╥﹏╥)o";
          newData.loading = false;
        }
        this.provinceDistribution = newData;
        } else {
        this.$Message.error(data.message);
      }
    },
    async getCityData(){
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
      let data = await Fetcher.getCityData(this, params);
      if (data.code === 200) {
        let newData = JSON.parse(JSON.stringify(this.cityDistribution));
        newData.loading = false;
         newData._id = 'cityDistribution';
        newData.name = data.data.name;
        newData.all.number = data.data.sum;
        newData.all.measuresUnit = data.data.unit;
        newData.average.number = data.data.average;
        newData.average.measuresUnit = data.data.unit;
        newData.option.series[0].data = data.data.seriesData;
        if(data.data.seriesData.length<=0){
          newData.text = "暂无数据o(╥﹏╥)o";
          newData.loading = true;
        }else{
          newData.text = "等一等啊o(╥﹏╥)o";
          newData.loading = false;
        }
        this.cityDistribution = newData;
        } else {
        this.$Message.error(data.message);
      }
    },
     async getOSData(){
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
      let data = await Fetcher.getOSData(this, params);
      if (data.code === 200) {
        let newData = JSON.parse(JSON.stringify(this.OSDistribution));
        newData.loading = false;
         newData._id = 'OSDistribution';
        newData.name = data.data.name;
        newData.all.number = data.data.sum;
        newData.all.measuresUnit = data.data.unit;
        newData.average.number = data.data.average;
        newData.average.measuresUnit = data.data.unit;
        newData.option.series[0].data = data.data.seriesData;
        if(data.data.seriesData.length<=0){
          newData.text = "暂无数据o(╥﹏╥)o";
          newData.loading = true;
        }else{
          newData.text = "等一等啊o(╥﹏╥)o";
          newData.loading = false;
        }
        this.OSDistribution = newData;
        } else {
        this.$Message.error(data.message);
      }
    },
    async getUserVisitTimeData(){
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
      let data = await Fetcher.getUserVisitTimeData(this, params);
      if (data.code === 200) {
        let newData = JSON.parse(JSON.stringify(this.userDistribution));
        newData.loading = false;
         newData._id = 'userDistribution';
        newData.name = data.data.name;
        newData.all.number = data.data.sum;
        newData.all.measuresUnit = data.data.unit;
        newData.average.number = data.data.average;
        newData.average.measuresUnit = data.data.unit;
        newData.option.series[0].data = data.data.seriesData;
        if(data.data.seriesData.length<=0){
          newData.text = "暂无数据o(╥﹏╥)o";
          newData.loading = true;
        }else{
          newData.text = "等一等啊o(╥﹏╥)o";
          newData.loading = false;
        }
        this.userDistribution = newData;
        } else {
        this.$Message.error(data.message);
      }
    }
  },
  created() {
    this.getProvinceDta();
    this.getCityData();
    this.getOSData();
    this.getUserVisitTimeData();
    Fetcher.postEventViewData({
          action: "用户特征",
          category: "用户特征查看"
        });
  },
  components: {
    DetailedCardSm
  }
};
</script>
<style lang="less" scoped>
</style>
