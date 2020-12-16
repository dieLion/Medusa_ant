<template>
<div ref="systemHardware" class="systemHardware"></div>
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
            systemHardwareEcharts: {},
            //   xais: [],
            //   value: [],
            memoryFreeData: [], //内存未使用量
            memoryPercentData: [], // 内存利用率
            memoryUsedData: [], //内存使用量 
        };
    },
    mounted() {
        let _this = this;
        console.log(_this.parameter);
        _this.parameter.map((item) => {
            _this.memoryFreeData.push([item.creation_time, item.memory_free]);
            _this.memoryPercentData.push([item.creation_time, item.memory_percent]);
            _this.memoryUsedData.push([item.creation_time, item.memory_used]);
        });
        console.log(_this.memoryFreeData);
        console.log(_this.memoryPercentData);
        console.log(_this.memoryUsedData);
        _this.$nextTick(() => {
            setTimeout(() => {
                _this.fnsystemHardwareEcharts();
            }, 10);
        });
        window.onresize = function () {
            _this.systemHardwareEcharts.resize();
        };
    },
    methods: {
        fnsystemHardwareEcharts() {
            //   console.log(this.parameter);
            // 基于准备好的dom，初始化echarts实例
            this.systemHardwareEcharts = this.$echarts.init(
                this.$refs.systemHardware
            );
            this.systemHardwareEcharts.setOption({
                tooltip: {
                    show: true,
                    trigger: "axis",
                    axisPointer: {
                        type: "line",
                    },
                    // formatter: function (params) {
                    //     return params[0].data[0] + "<br />" + "监控数:" + params[0].data[1];
                    // },
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
                                date.getHours(),
                                date.getMinutes(),
                                date.getSeconds(),
                            ];
                            return texts.join(":");
                        },
                    },
                    splitLine: {
                        show: false,
                    },
                    // maxInterval: 3600 * 24 * 1000,
                    boundaryGap: [0, 0],
                },
                yAxis: [{
                        name: "内存容量",
                        type: "value",
                        splitNumber: 5,
                        axisLabel: {
                            show: true,
                            color: "rgba(169,169,169,1)",
                            formatter: '{value} Gb'
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
                    {
                        name: "内存占用率",
                        type: "value",
                        splitNumber: 5,
                        axisLabel: {
                            show: true,
                            color: "rgba(169,169,169,1)",
                            formatter: '{value} %'
                        },
                        axisLine: {
                            lineStyle: {
                                color: "rgba(169,169,169,1)",
                            },
                        },
                        max: 100,
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
                ],
                grid: {
                    top: "20%",
                    height: "70%",
                },
                series: [{
                        name: '内存未使用',
                        type: "line",
                        showSymbol: false,
                        symbol: "circle",
                        smooth: true,
                        hoverAnimation: true,
                        itemStyle: {

                            color: "rgb(51, 255, 0)",
                        },
                        emphasis: {
                            label: {
                                show: false,
                            },
                        },

                        data: this.memoryFreeData,
                    },
                    {
                        name: '内存占用率',
                        type: "line",
                        showSymbol: false,
                        symbol: "circle",
                        smooth: true,
                        hoverAnimation: true,
                        itemStyle: {
                            color: " rgb(255, 145, 0)",
                        },
                        emphasis: {
                            label: {
                                show: false,
                            },
                        },
                        yAxisIndex: 1,

                        data: this.memoryPercentData,
                    },
                    {
                        name: '内存已使用',
                        type: "line",
                        showSymbol: false,
                        symbol: "circle",
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

                        data: this.memoryUsedData,
                    },
                ],
            });
            window.addEventListener("resize", () => {
                this.systemHardwareEcharts.resize();
            });
        },
    },
    watch: {
        parameter() {
            let _this = this;
            _this.data = [];
            _this.parameter.map((item) => {
                _this.memoryFreeData.push([item.creation_time, item.memory_free]);
                _this.memoryPercentData.push([item.creation_time, item.memory_percent]);
                _this.memoryUsedData.push([item.creation_time, item.memory_used]);
            });

            _this.fnsystemHardwareEcharts();
        },
    },
};
</script>

<style>
.systemHardware {
    width: 100%;
    height: 100%;
}
</style>
