<template>
<div id="myechartspie" class="myechartspie"></div>
</template>

<script>
export default {
    name: "myechartspie",
    props: ["myEcharts"],
    data() {
        return {
            myChart: {},
        };
    },
    mounted() {
        console.log(this.myEcharts);
        let _this = this;
        setTimeout(() => {
            _this.fnDrawLine();
        });
        window.onresize = function () {
            _this.myChart.resize();
        };
    },
    methods: {
        fnDrawLine() {
            // 基于准备好的dom，初始化echarts实例
            this.myChart = this.$echarts.init(
                document.getElementById("myechartspie")
            );
            this.myChart.setOption({
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c}",
                    textStyle: {
                        fontSize: 16,
                        color: "#fff",
                    },
                },
                grid: {
                    left: "3%",
                    right: "3%",
                    bottom: "3%",
                    containLabel: true,
                },
                xAxis: [{
                    type: "category",
                    data: ["高危", "中危", "低危"],

                    nameTextStyle: {
                        color: "rgba(169,169,169,1)",
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(169,169,169,1)",
                        },
                    },
                }, ],
                yAxis: [{
                    type: "value",
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
                }, ],
                series: [{
                    name: "等级分布",
                    type: "bar",
                    itemStyle: {
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = ["#FFC0CB", "#00BFFF", "#7FFFAA"];
                            return colorList[params.dataIndex];
                        },
                    },
                    barMaxWidth: "20%",
                    barMinHeight: 5,
                    data: [{
                            value: this.myEcharts.high_risk_number,
                        },
                        {
                            value: this.myEcharts.mid_risk_number,
                        },
                        {
                            value: this.myEcharts.low_risk_number,
                        },
                    ],
                    // roseType:'radius',
                    // minAngle:'33',
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                    label: {
                        show: true,
                        fontFamily: "黑体",
                        fontSize: 16,
                        color: "#fff",
                        backgroundColor: "rgba(0,23,11,0.5)",
                        position: "top",
                    },
                }, ],
            });
            window.addEventListener("resize", () => {
                this.myChart.resize();
            });
        },
    },
    watch: {
        myEcharts() {
            this.myEcharts = this.myEcharts;
            this.fnDrawLine();
        },
    },
};
</script>

<style>
.myechartspie {
    width: 100%;
    height: 100%;
}
</style>
