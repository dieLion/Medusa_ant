<template>
  <div ref="activeRisk" class="activeRisk"></div>
</template>

<script>
export default {
  props: {
    parameter: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      activeRiskEcharts: {},
      //   xais: [],
      //   value: [],
      data: [],
      textvalue: ["60", "61", "62"],
    };
  },
  mounted() {
    let _this = this;
    _this.parameter.map(function (item) {
      _this.data.push([item[0], item[1]]);
    });
    _this.fnactiveRiskEcharts();
    window.onresize = function () {
      _this.activeRiskEcharts.resize();
    };
  },
  methods: {
    fnactiveRiskEcharts() {
      //   console.log(this.parameter);
      // 基于准备好的dom，初始化echarts实例
      this.activeRiskEcharts = this.$echarts.init(this.$refs.activeRisk);
      this.activeRiskEcharts.setOption({
        backgroundColor: "rgb(241,242,246)",
        xAxis: {
          type: "time",
          axisLine: {
            lineStyle: {
              color: "#000",
            },
          },
          axisLabel: {
            show: true,
            interval: 0
          },
          splitLine: {
            show: false,
          },
          boundaryGap: [0, 0],

          axisPointer: {
            
            snap: true,
            lineStyle: {
              color: "#004E52",
              opacity: 0.5,
              width: 2,
            },
            label: {
              show: true,
            //   formatter: function (params) {
            //     return echarts.format.formatTime("yyyy-MM-dd", params.value);
            //   },
              backgroundColor: "#004E52",
            },
            handle: {
              show: true,
              color: "#004E52",
            },
          },
        },
        yAxis: {
          type: "value",
          max: "dataMax",
          axisLine: {
            lineStyle: {
              color: "#000",
            },
          },
          splitLine: {
            show: false,
          },

          axisTick: {
            inside: true,
          },
          axisLabel: {
            inside: true,
            formatter: "{value}\n",
          },
        },
        dataZoom: [
          {
            type: "inside",
          },
        ],
        series: {
          type: "line",
          showSymbol: false,
          hoverAnimation: false,
          itemStyle: {
            color: "#d68262",
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#d68262",
                },
                {
                  offset: 1,
                  color: "#ffe",
                },
              ],
            },
          },
          data: this.data,
        },
      });
    },
  },
  watch: {
    parameter() {
      //   this.axis = this.parameter.distribution_time;
      //   this.value = this.parameter.distribution_value;
      //   console.log(this.axis, this.value);
      // let a = [["2020-07-7 10:4:57",116],["2020-07-7 10:4:58",129],["2020-07-8 10:4:58",135]]
      // console.log(a)
      //   console.log(this.parameter )
      //   this.parameter.map(function (item) {
      //             console.log(item[0])
      //         }),
      let _this = this;
      _this.parameter.map(function (item) {
        // _this.xais.push(item[0]);
        // _this.value.push(item[1]);
        _this.data.push([item[0], item[1]]);
      });

      _this.fnactiveRiskEcharts();
    },
  },
};
</script>

<style>
.activeRisk {
  width: 100%;
  height: 100%;
}
</style>