<template>
<div id="myechartspie" class="myechartspie"></div>
</template>

<script>
export default {
    name: "myechartspie",
    props:['myEcharts'],
    data() {
        return {
            myChart: {},
        };
    },
    mounted() {
        console.log(this.myEcharts)
        let _this = this;
        _this.fnDrawLine();
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
                    formatter: "{a} <br/>{b} : {c} ({d}%)",
                    textStyle: {
                        fontSize: 16,
                        color: "#fff",
                    },
                },
                legend: {
                    orient: "vertical",
                    top: 10,
                    left: 10,
                    data: ["高危", "中危", "低危"],
                    textStyle: {
                        fontSize: 16,
                        color: "#fff",
                    },
                },
                series: [{
                    name: "等级分布",
                    type: "pie",
                    center: ["50%", "50%"],
                    color:["red","yellow","blue"],
                    data: [{
                            value: this.myEcharts.high_risk_number,
                            name: "高危"
                        },
                        {
                            value: this.myEcharts.mid_risk_number,
                            name: "中危"
                        },
                        {
                            value: this.myEcharts.low_risk_number,
                            name: "低危"
                        },
                    ],
                    roseType:'radius',
                    minAngle:'33',
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
                    },
                }, ],
            });
        },
    },
    watch:{
        myEcharts(){
            this.myEcharts=this.myEcharts
            this.fnDrawLine();
        }
    }
};
</script>

<style>
.myechartspie {
    width: 100%;
    height: 100%;
}
</style>
