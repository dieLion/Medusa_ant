<template>
<div ref="gitHubMonitoring" class="gitHubMonitoring"></div>
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
            gitHubMonitoringEcharts: {},
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
        _this.$nextTick(() => {
            setTimeout(() => {
                _this.fngitHubMonitoringEcharts();
            }, 10);
        });
        window.onresize = function () {
            _this.gitHubMonitoringEcharts.resize();
        };
    },
    methods: {
        fngitHubMonitoringEcharts() {
            //   console.log(this.parameter);
            // 基于准备好的dom，初始化echarts实例
            this.gitHubMonitoringEcharts = this.$echarts.init(this.$refs.gitHubMonitoring);
            this.gitHubMonitoringEcharts.setOption({
                // backgroundColor: "rgb(241,242,246)",
                tooltip: {
                    show: true,
                    trigger: "axis",
                    axisPointer: {
                        type: "line",

                    },
                    formatter: function (params) {
                        return params[0].data[0] + '<br />' + '监控数:' + params[0].data[1]
                    },
                    backgroundColor: "rgba(111, 111, 111, 1)",
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    textStyle: {
                        color: "#fff",
                    },
                },
                xAxis: {
                    type: "time",
                    nameTextStyle: {
                        color: "rgba(169,169,169,1)",
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(169,169,169,1)",
                        },
                    },
                    axisLabel: {
                        show: true,
                        interval: 0,
                        formatter: function (value, index) {
                            // 格式化成月/日，只在第一个刻度显示年份
                            let date = new Date(value);
                            let texts = [
                                date.getFullYear(),
                                date.getMonth() + 1,
                                date.getDate(),
                            ];
                            return texts.join("-");
                        },
                    },
                    splitLine: {
                        show: false,
                    },
                    minInterval: 3600 * 24 * 1000,
                    // maxInterval: 3600 * 24 * 1000,
                    boundaryGap: [0, 0],
                },
                yAxis: {
                    type: "value",
                    splitNumber: 5,
                    axisLabel: {
                        show: true,
                        color: "rgba(169,169,169,1)",
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(169,169,169,1)",
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            // 使用深浅的间隔色
                            type: "dashed",
                            color: ["rgba(169,169,169,0.5)"],
                        },
                    },
                    label: {
                        show: false,
                    },
                    emphasis: {
                        label: {
                            show: false,
                        },
                    },
                },
                // dataZoom: [{
                //     type: "inside",
                // }, ],
                grid: {
                    top: '15%',
                    height: '70%'
                },
                series: {
                    type: "line",
                    showSymbol: false,
                    symbol: 'circle',
                    smooth: true,
                    hoverAnimation: true,
                    itemStyle: {
                        color: "rgba(110,150,243,1)",
                    },

                    emphasis: {
                        label: {
                            show: false,
                        },
                    },
                    areaStyle: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                    offset: 0,
                                    color: "rgba(164,189,247,1)",
                                },
                                {
                                    offset: 1,
                                    color: "rgba(254,254,255,1)",
                                },
                            ],
                        },
                    },
                    data: this.data,
                },
            });
            window.addEventListener("resize", () => {
                this.gitHubMonitoringEcharts.resize();
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
            _this.data = [];
            _this.parameter.map(function (item) {
                // _this.xais.push(item[0]);
                // _this.value.push(item[1]);
                _this.data.push([item[0], item[1]]);
            });

            _this.fngitHubMonitoringEcharts();
        },
    },
};
</script>

<style>
.gitHubMonitoring {
    width: 100%;
    height: 100%;
}
</style>
