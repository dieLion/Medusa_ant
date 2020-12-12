<template>
<div class="dashboard">
    <a-row :gutter="[
        { xs: 8, sm: 16, md: 24, lg: 32 },
        { xs: 24, sm: 32, md: 40, lg: 48 },
      ]" style="margin-top: 5px">
        <a-col :xs="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 6 }" v-for="(item, i) in arrNumber" :key="i">
            <div class="a-col-4" :style="{ background: colorlist[i] }">
                <h3 class="a-col-4-title">{{ item.name }}</h3>
                <div>
                    <div class="icon_pie">
                        <myicon :type="item.type" class="a-col-4-icon" />
                    </div>

                    <span class="a-col-4-val"><span style="font-size: 36px">{{ item.val }}</span>个</span>
                </div>
            </div>
        </a-col>
    </a-row>
    <a-row :gutter="[
        { xs: 8, sm: 16, md: 24, xs: 8 },
        { xs: 8, sm: 16, md: 24, lg: 32 },
      ]" style="margintop: 50px">
        <a-col :xs="{ span: 24 }" :lg="{ span: 12 }" class="hoverBorder">
            <a-col :xs="{ span: 24 }" :lg="{ span: 24 }" class="gradeDistribution-name">等级分布</a-col>
            <a-col :xs="{ span: 24 }" :lg="{ span: 24 }" class="gradeDistribution-nav">
                <myechartspie :myEcharts="myEcharts"></myechartspie>
            </a-col>
        </a-col>
        <a-col :xs="{ span: 24 }" :lg="{ span: 12 }" class="hoverBorder">
            <a-col :xs="{ span: 24 }" :lg="{ span: 24 }" class="gradeDistribution-name">系统信息</a-col>
            <a-col :xs="{ span: 24 }" :lg="{ span: 24 }" class="gradeDistribution-nav">
                <systemInformation></systemInformation>
            </a-col>
        </a-col>
    </a-row>
    <a-row :gutter="[
        { xs: 8, sm: 16, md: 24, xs: 8 },
        { xs: 8, sm: 12, md: 14, lg: 16 },
      ]">
        <a-col :xs="{ span: 24 }" :lg="{ span: 12 }">
            检索时间:
            <a-range-picker @change="handleOnChangeDate" :default-value="defaultValue" />
        </a-col>
    </a-row>
    <a-row :gutter="[
        { xs: 8, sm: 16, md: 24, xs: 8 },
        { xs: 8, sm: 16, md: 24, lg: 32 },
      ]">
        <a-col :xs="{ span: 24 }" :lg="{ span: 24 }" class="hoverBorder">
            <a-col :xs="{ span: 24 }" :lg="{ span: 24 }" class="gradeDistribution-name">漏洞分布</a-col>
            <a-col :xs="{ span: 24 }" :lg="{ span: 24 }" class="gradeDistribution-nav">
                <activeRisk :parameter="parameter"></activeRisk>
            </a-col>
        </a-col>
    </a-row>
    <a-row :gutter="[
        { xs: 8, sm: 16, md: 24, xs: 8 },
        { xs: 8, sm: 12, md: 14, lg: 16 },
      ]">
        <a-col :xs="{ span: 24 }" :lg="{ span: 12 }">
            检索时间:
            <a-range-picker @change="handleOnChangeDate2" :default-value="defaultValue" />
        </a-col>
    </a-row>
    <a-row :gutter="[
        { xs: 8, sm: 16, md: 24, xs: 8 },
        { xs: 8, sm: 16, md: 24, lg: 32 },
      ]">
        <a-col :xs="{ span: 24 }" :lg="{ span: 24 }" class="hoverBorder">
            <a-col :xs="{ span: 24 }" :lg="{ span: 24 }" class="gradeDistribution-name">GitHub监控</a-col>
            <a-col :xs="{ span: 24 }" :lg="{ span: 24 }" class="gradeDistribution-nav">
                <gitHubMonitoring :parameter="parameter2"></gitHubMonitoring>
            </a-col>
        </a-col>
    </a-row>
</div>
</template>

<script>
import moment from "moment";
import myechartspie from "./myechartspie/myechartspie.vue";
import activeRisk from "./activeRisk/activeRisk.vue";
import gitHubMonitoring from "./gitHubMonitoring/gitHubMonitoring.vue";
import systemInformation from "./systemInformation/systemInformation.vue";
import {
    Icon
} from "ant-design-vue";

const MyIcon = Icon.createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_1734998_apjce2fwnsu.js",
});
export default {
    name: "dashboard",
    components: {
        myicon: MyIcon,
        myechartspie,
        activeRisk,
        gitHubMonitoring,
        systemInformation
    },
    data() {
        return {
            arrNumber: [{
                    name: "目标网站",
                    type: "icon-Vector",
                    val: 0,
                },
                {
                    name: "端口发现",
                    type: "icon-duankousaomiao",
                    val: 0,
                },
                {
                    name: "代理扫描",
                    type: "icon-saomiao",
                    val: 0,
                },
                {
                    name: "发现漏洞",
                    type: "icon-loudongyujing",
                    val: 0,
                },
            ],
            security: "icon-Vector",
            rice: "icon-duankousaomiao",
            farmer: "icon-saomiao",
            core: "icon-loudongyujing",
            myEcharts: {},
            test: [],
            test2: [],
            defaultValue: [],
            parameter: [],
            parameter2: [],
            colorlist: [
                "rgba(153,217,234,1)",
                "rgba(105,160,251,1)",
                "rgba(107,133,252,1)",
                "rgba(101,206,165,1)",
            ],
        };
    },
    created() {
        let TimeAll = this.FnUnixStartEnd();
        this.defaultValue = [
            moment(TimeAll.start_time_YMD, "YYYY-MM-DD"),
            moment(TimeAll.end_time_YMD, "YYYY-MM-DD"),
        ];
    },
    mounted() {
        this.handleHomePage();
        this.handleHomepage_Vulnerability();
        this.handleHomepage_github_monitor_data();
    },
    methods: {
        moment,
        //获取当天和三十天前的 unitx时间 和 YYYY-MM-DD格式时间 或者正常时间转换成UNIX时间
        FnUnixStartEnd(star, end) {
            if (star && end) {
                //正常时间转换成UNIX时间
                let Unixstar = Math.round(new Date(star).getTime() / 1000); //unix时间
                let Unixend = Math.round(new Date(end).getTime() / 1000); //unix时间
                let newdateYMD = this.FnUnixTimes(Unixend); //YYYY-MM-DD格式时间
                let thirtyDaysdateYMD = this.FnUnixTimes(Unixstar); //YYYY-MM-DD格式时间
                let TimeAll = {
                    start_time: Unixstar,
                    end_time: Unixend,
                    start_time_YMD: thirtyDaysdateYMD,
                    end_time_YMD: newdateYMD,
                };
                return TimeAll;
            } else {
                //获取当天和三十天前的unitx时间
                const thirtyDays = 2592000; //unitx30天的时间跨度
                let newdate = Math.round(new Date().getTime() / 1000); //unix时间
                let newdateYMD = this.FnUnixTimes(newdate); //YYYY-MM-DD格式时间
                let thirtyDaysdate = newdate - thirtyDays; //unix时间
                let thirtyDaysdateYMD = this.FnUnixTimes(thirtyDaysdate); //YYYY-MM-DD格式时间
                this.defaultValue = [
                    moment(thirtyDaysdateYMD, "YYYY-MM-DD"),
                    moment(newdateYMD, "YYYY-MM-DD"),
                ];
                // let params = {
                //   token: localStorage.getItem("storeToken"),
                //   start_time: "1594087497",
                //   end_time: "1604087497",
                // };
                let TimeAll = {
                    start_time: thirtyDaysdate,
                    end_time: newdate,
                    start_time_YMD: thirtyDaysdateYMD,
                    end_time_YMD: newdateYMD,
                };
                return TimeAll;
            }
        },
        //UNix时间转换正常时间并格式化YYYY-MM-DD格式时间
        FnUnixTimes(e) {
            let unixTimestamp = new Date(e * 1000);
            let Y = unixTimestamp.getFullYear() + "-";
            let M =
                (unixTimestamp.getMonth() + 1 < 10 ?
                    "0" + (unixTimestamp.getMonth() + 1) :
                    unixTimestamp.getMonth() + 1) + "-";
            let D =
                unixTimestamp.getDate() + 1 < 10 ?
                "0" + unixTimestamp.getDate() :
                unixTimestamp.getDate();
            // let h = unixTimestamp.getHours() + ":";
            // let m = unixTimestamp.getMinutes() + ":";
            // let s = unixTimestamp.getSeconds();
            let Time = Y + M + D;
            return Time;
        },
        //填充日期数组中间没有数据的天数为0
        FnFillArray(starttime, endtime, ArrayDate, target) {
            let dateArr = [];
            let startArr = starttime.split("-");
            let endArr = endtime.split("-");
            let db = new Date();
            db.setUTCFullYear(startArr[0], startArr[1] - 1, startArr[2]);
            let de = new Date();
            de.setUTCFullYear(endArr[0], endArr[1] - 1, endArr[2]);
            let unixDb = db.getTime();
            let unixDe = de.getTime();
            let stamp;
            const oneDay = 24 * 60 * 60 * 1000;
            for (stamp = unixDb; stamp <= unixDe;) {
                dateArr.push(this.Fnformat(new Date(parseInt(stamp))));
                stamp = stamp + oneDay;
            }

            if (target == "vulnerability") {
                this.parameter = [];
                let number = 1;
                let ok = false;
                dateArr.forEach((i) => {
                    number = 1;
                    ok = false; //单次遍历时候是否已经push过一次
                    if (ArrayDate.length != 0) {
                        ArrayDate.forEach((j) => {
                            if (i == j[0]) {
                                this.parameter.push([i, j[1]]);
                                ok = true;
                            } else if (number == ArrayDate.length && ok != true) {
                                this.parameter.push([i, 0]);
                                ok == false;
                            }
                            number++;
                        });
                    } else {
                        this.parameter.push([i, 0]);
                    }
                });
            } else if (target == "github") {
                this.parameter2 = [];
                let number = 1;
                let ok = false;
                dateArr.forEach((i) => {
                    number = 1;
                    ok = false; //单次遍历时候是否已经push过一次
                    if (ArrayDate.length != 0) {
                        ArrayDate.forEach((j) => {
                            if (i == j[0]) {
                                this.parameter2.push([i, j[1]]);
                                ok = true;
                            } else if (number == ArrayDate.length && ok != true) {
                                this.parameter2.push([i, 0]);
                                ok == false;
                            }
                            number++;
                        });
                    } else {
                        this.parameter2.push([i, 0]);
                    }
                });
            }
            console.log(ArrayDate);
        },
        //正常时间的格式化YYYY-MM-DD格式时间
        Fnformat(time) {
            let ymd = "";
            let mouth =
                time.getMonth() + 1 >= 10 ?
                time.getMonth() + 1 :
                "0" + (time.getMonth() + 1);
            let day = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
            ymd += time.getFullYear() + "-"; // 获取年份。
            ymd += mouth + "-"; // 获取月份。
            ymd += day; // 获取日。
            return ymd; // 返回日期。
        },
        //漏洞分布获取检索日期上的开始结束日期
        handleOnChangeDate(date, dateString) {
            this.handleHomepage_Vulnerability(dateString[0], dateString[1]);
            // this.FnFillArray(dateString[0], dateString[1]);
        },
        //github监控获取检索日期上的开始结束日期
        handleOnChangeDate2(date, dateString) {
            this.handleHomepage_github_monitor_data(dateString[0], dateString[1]);
        },
        //开头请求 普通数据信息
        handleHomePage() {
            let params = {
                token: localStorage.getItem("storeToken"),
            };
            this.$api.homepage_data(params).then((res) => {
                //   503：小宝贝时间呢？
                // 404：想啥呢？不知道查询出问题了吗？
                // 200：返回用户当前信息
                // 169：呐呐呐！莎酱被玩坏啦(>^ω^<)
                // 500：请使用Post请求
                console.log(res);
                switch (res.code) {
                    case 200:
                        this.arrNumber = [{
                                name: "目标网站",
                                type: this.security,
                                val: res.message.number_of_websites,
                            },
                            {
                                name: "端口发现",
                                type: this.rice,
                                val: res.message.number_of_port,
                            },
                            {
                                name: "代理扫描",
                                type: this.farmer,
                                val: res.message.number_of_agent_tasks,
                            },
                            {
                                name: "发现漏洞",
                                type: this.core,
                                val: res.message.number_of_vulnerabilities,
                            },
                        ];
                        this.myEcharts = {
                            high_risk_number: res.message.high_risk_number,
                            mid_risk_number: res.message.mid_risk_number,
                            low_risk_number: res.message.low_risk_number,
                        };

                        break;
                    case 503:
                        this.$message.error("小宝贝时间呢？");
                        break;
                    case 404:
                        this.$message.error("想啥呢？不知道查询出问题了吗？");
                        break;
                    case 169:
                        this.$message.error("呐呐呐！莎酱被玩坏啦(>^ω^<)");
                        break;
                    case 500:
                        this.$message.error("请使用Post请求");
                        break;
                }
            });
        },
        handleHomepage_Vulnerability(star, end) {
            let params = {};
            let TimeAll;
            if (star && end) {
                TimeAll = this.FnUnixStartEnd(star, end);
                params = {
                    token: localStorage.getItem("storeToken"),
                    start_time: TimeAll.start_time,
                    end_time: TimeAll.end_time,
                };
            } else {
                TimeAll = this.FnUnixStartEnd();
                params = {
                    token: localStorage.getItem("storeToken"),
                    start_time: TimeAll.start_time,
                    end_time: TimeAll.end_time,
                };
            }
            console.log(params);
            this.$api
                .homepage_vulnerability_distributiont_data(params)
                .then((res) => {
                    switch (res.code) {
                        case 200:
                            console.log(res);
                            let key = 0;
                            let conter = 0;
                            let endL = 1;
                            res.message.forEach((e) => {
                                let Time = this.FnUnixTimes(e[0]);
                                if (Time != key && conter == 0) {
                                    key = Time;
                                    conter = e[1];
                                } else if (Time != key && conter != 0) {
                                    this.test.push([key, conter]);
                                    key = Time;
                                    conter = e[1];
                                } else if (Time == key) {
                                    conter += e[1];
                                    if (endL == res.message.length) {
                                        this.test.push([key, conter]);
                                    }
                                }
                                let a = e[0] * 1000;
                                endL++;
                            });
                            let target = "vulnerability";
                            this.FnFillArray(
                                TimeAll.start_time_YMD,
                                TimeAll.end_time_YMD,
                                this.test,
                                target
                            );
                            break;
                        case 503:
                            this.$message.error("小宝贝时间呢？");
                            break;
                        case 404:
                            this.$message.error("想啥呢？不知道查询出问题了吗？");
                            break;
                        case 169:
                            this.$message.error("呐呐呐！莎酱被玩坏啦(>^ω^<)");
                            break;
                        case 500:
                            this.$message.error("请使用Post请求");
                            break;
                    }
                });
        },
        handleHomepage_github_monitor_data(star, end) {
            let params = {};
            let TimeAll;
            if (star && end) {
                TimeAll = this.FnUnixStartEnd(star, end);
                params = {
                    token: localStorage.getItem("storeToken"),
                    start_time: TimeAll.start_time,
                    end_time: TimeAll.end_time,
                };
            } else {
                TimeAll = this.FnUnixStartEnd();
                params = {
                    token: localStorage.getItem("storeToken"),
                    start_time: TimeAll.start_time,
                    end_time: TimeAll.end_time,
                };
            }
            // let params = {
            //   token: localStorage.getItem("storeToken"),
            //   start_time: "1594087497",
            //   end_time: "1604087497",
            // };
            this.$api.homepage_github_monitor_data(params).then((res) => {
                console.log(res);
                switch (res.code) {
                    case 200:
                        let key = 0;
                        let conter = 0;
                        let endL = 1;
                        res.message.forEach((e) => {
                            let Time = this.FnUnixTimes(e[0]);
                            if (Time != key && conter == 0) {
                                key = Time;
                                conter = e[1];
                            } else if (Time != key && conter != 0) {
                                this.test2.push([key, conter]);
                                key = Time;
                                conter = e[1];
                            } else if (Time == key) {
                                conter += e[1];
                                if (endL == res.message.length) {
                                    this.test2.push([key, conter]);
                                }
                            }
                            let a = e[0] * 1000;
                            endL++;
                        });
                        let target = "github";
                        this.FnFillArray(
                            TimeAll.start_time_YMD,
                            TimeAll.end_time_YMD,
                            this.test2,
                            target
                        );
                        break;
                    case 503:
                        this.$message.error("小宝贝时间呢？");
                        break;
                    case 404:
                        this.$message.error("想啥呢？不知道查询出问题了吗？");
                        break;
                    case 169:
                        this.$message.error("呐呐呐！莎酱被玩坏啦(>^ω^<)");
                        break;
                    case 500:
                        this.$message.error("请使用Post请求");
                        break;
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}

.dashboard {
    width: 100%;
    // height: 100%;

    padding: 0px 20px 0 20px;
    // background: #587797;

    .a-col-4 {
        padding: 10px;
        color: #fff;
        border-radius: 5px;
        text-align: left;
        background: #2e4051;
        font-size: 16px;
        min-width: 168px;

        .a-col-4-title {
            color: #fff;
        }

        .icon_pie {
            display: inline-block;
            border: 1px solid #88888870;
            border-radius: 50% 50%;
            box-shadow: 0px 2px 5px #6b6b6b inset;
            overflow: hidden;

            .a-col-4-icon {
                padding: 10px;
                font-size: 40px;
            }
        }

        .a-col-4-val {
            margin: 0 0 0 15px;
            position: absolute;
            top: 50%;
            transform: translateY(-35%);
            font-size: 18px;
        }
    }

    .gradeDistribution-name {
        min-width: 85px;
        padding: 10px;
        color: rgba(113, 113, 113, 1);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        text-align: left;
        background: #fff;
        margin-right: 30px;

        font-size: 20px;
        border-bottom: 1px solid rgb(238, 238, 238);
    }

    .gradeDistribution-nav {
        padding: 10px;
        color: rgba(169, 169, 169, 1);
        height: 1.7rem;
        min-width: 288px;
        min-height: 200px;
        // border-top-right-radius: 5px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border-bottom: 1px solid rgb(238, 238, 238);
        text-align: left;
        background: #fff;
        font-size: 16px;
    }

    .hoverBorder:hover .gradeDistribution-name,
    .hoverBorder:hover .gradeDistribution-nav {
        box-shadow: 10px 10px 5px #888888;
        /*设置阴影,可以自定义参数*/
        -webkit-box-shadow: 10px 10px 5px #888888;
        -o-box-shadow: 10px 10px 5px #888888;
        -moz-box-shadow: 10px 10px 5px #888888;
    }

    .list-nav {
        height: 350px;
        min-width: 280px;
        padding: 10px;
        color: rgba(169, 169, 169, 1);
        border-top-right-radius: 5px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        text-align: center;
        background: #2e4051;
        font-size: 16px;
    }
}
</style>
