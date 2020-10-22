<template>
  <div class="dashboard">
    <a-row
      :gutter="[
        { xs: 8, sm: 16, md: 24, lg: 32 },
        { xs: 8, sm: 16, md: 24, lg: 32 },
      ]"
      style="margintop: 20px"
    >
      <a-col
        :xs="{ span: 24 }"
        :md="{ span: 12 }"
        :lg="{ span: 6 }"
        v-for="(item, i) in arrNumber"
        :key="i"
      >
        <div class="a-col-4">
          <h3 class="a-col-4-title">{{ item.name }}</h3>
          <myicon :type="item.type" class="a-col-4-icon" />
          <span class="a-col-4-val">{{ item.val }}</span>
        </div>
      </a-col>
    </a-row>
    <a-row
      :gutter="[
        { xs: 8, sm: 16, md: 24, xs: 8 },
        { xs: 4, sm: 6, md: 8, lg: 10 },
      ]"
      style="margintop: 50px"
    >
      <a-col :xs="{ span: 24 }" :lg="{ span: 12 }">
        <a-col
          :xs="{ span: 4 }"
          :lg="{ span: 5 }"
          :xl="{ span: 4 }"
          :xxl="{ span: 4 }"
          class="gradeDistribution-name"
          >等级分布</a-col
        >
        <a-col
          :xs="{ span: 24 }"
          :lg="{ span: 24 }"
          class="gradeDistribution-nav"
        >
          <myechartspie :myEcharts="myEcharts"></myechartspie>
        </a-col>
      </a-col>
      <a-col :xs="{ span: 24 }" :lg="{ span: 12 }">
        <a-col
          :xs="{ span: 4 }"
          :lg="{ span: 5 }"
          :xl="{ span: 4 }"
          :xxl="{ span: 4 }"
          class="gradeDistribution-name"
          >类型分布</a-col
        >
        <a-col
          :xs="{ span: 24 }"
          :lg="{ span: 24 }"
          class="gradeDistribution-nav"
        ></a-col>
      </a-col>
    </a-row>

    <a-row
      :gutter="[
        { xs: 8, sm: 16, md: 24, xs: 8 },
        { xs: 4, sm: 6, md: 8, lg: 10 },
      ]"
    >
      <a-col :xs="{ span: 24 }" :lg="{ span: 24 }">
        <div class="tabs">
          <a-col
            :xs="{ span: 6 }"
            :md="{ span: 3 }"
            :lg="{ span: 3 }"
            :xl="{ span: 3 }"
            :xxl="{ span: 2 }"
            v-for="(index, i) in tabs"
            :key="i"
            @click="fntab(i, index.view)"
            class="tab"
            :class="{ active: active == i }"
            >{{ index.type }}</a-col
          >
        </div>

        <a-col :xs="{ span: 24 }" :lg="{ span: 24 }" class="list-nav">
          <component :is="currentView" :parameter="parameter"></component>
        </a-col>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import myechartspie from "./myechartspie/myechartspie.vue";
import { Icon } from "ant-design-vue";
import activeRisk from "./activeRisk/activeRisk.vue";
import passiveMonitoring from "./passiveMonitoring/passiveMonitoring.vue";
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1734998_i0feu56gjii.js",
});
export default {
  name: "dashboard",
  components: {
    myicon: MyIcon,
    myechartspie,
    activeRisk,
    passiveMonitoring,
  },
  data() {
    return {
      arrNumber: [
        {
          name: "目标网站",
          type: "icon-anquanbiaozhi",
          val: 0,
        },
        {
          name: "端口发现",
          type: "icon-shuidaoSVG",
          val: 0,
        },
        {
          name: "代理扫描",
          type: "icon-nongminSVG",
          val: 0,
        },
        {
          name: "发现漏洞",
          type: "icon-anquanzhongxin",
          val: 0,
        },
      ],
      security: "icon-anquanbiaozhi",
      rice: "icon-shuidaoSVG",
      core: "icon-anquanzhongxin",
      farmer: "icon-nongminSVG",
      myEcharts: {},
      active: 0,
      currentView: "activeRisk",
      tabs: [
        {
          type: "主动风险",
          view: "activeRisk",
        },
        {
          type: "被动监控",
          view: "passiveMonitoring",
        },
      ],
      distribution_time:[],
      distribution_value:[],
      parameterlist: [],
      parameter: [],
    };
  },
  mounted() {
    this.handleHomePage();
  },
  methods: {
    fntab(i, v) {
      this.active = i;
      this.currentView = v;
      // console.log(this.parameterlist[i])
      this.parameter = this.parameterlist[i];

      //console.log(this.active, this.currentView)
    },
    handleHomePage() {
      let newdate = Math.round(new Date().getTime() / 1000);
      const thirtyDays = 2592000;
      let thirtyDaysdate = newdate - thirtyDays;
      let params = {
        token: localStorage.getItem("storeToken"),
        start_time: "1594087497",
        end_time: "1604087497",
      };
      this.$api.homepage_data(params).then((res) => {
        //   503：小宝贝时间呢？
        // 404：想啥呢？不知道查询出问题了吗？
        // 200：返回用户当前信息
        // 169：呐呐呐！莎酱被玩坏啦(>^ω^<)
        // 500：请使用Post请求
        switch (res.code) {
          case 200:
            console.log(res)
            this.arrNumber = [
              {
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
            res.message.time_distribution.forEach((e) => {
              // let unixTimestamp = new Date(e[0] * 1000);
              // let Y = unixTimestamp.getFullYear() + "-";
              // let M =
              //   (unixTimestamp.getMonth() + 1 < 10
              //     ? "0" + (unixTimestamp.getMonth() + 1)
              //     : unixTimestamp.getMonth() + 1) + "-";
              // let D = unixTimestamp.getDate() + " ";
              // let h = unixTimestamp.getHours() + ":";
              // let m = unixTimestamp.getMinutes() + ":";
              // let s = unixTimestamp.getSeconds();
              // let Time = Y + M + D + h + m + s;
              let a = e[0] * 1000
              this.distribution_time.push([a,e[1]])
              // this.distribution_value.push(e[1])
            });
            this.parameterlist = [
              this.distribution_time,
            ];
            this.parameter = this.parameterlist[0];
            console.log(this.parameter);
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

  padding: 20px 20px 0 20px;
  background: #587797;

  .a-col-4 {
    padding: 10px;
    color: #fff;
    border-radius: 5px;
    text-align: left;
    background: #2e4051;
    font: 20px sans-serif;
    min-width: 168px;

    .a-col-4-title {
      color: #fff;
    }

    .a-col-4-icon {
      font-size: 70px;
    }

    .a-col-4-val {
      float: right;
      font-size: 18px;
    }
  }

  .gradeDistribution-name {
    min-width: 85px;
    padding: 10px;
    color: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    text-align: center;
    background: #2e4051;
    margin-right: 20px;
    font: 16px sans-serif;
  }

  .gradeDistribution-nav {
    padding: 10px;
    color: #fff;
    height: 1.7rem;
    min-width: 288px;
    min-height: 200px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    text-align: left;
    background: #2e4051;
    font: 16px sans-serif;
  }

  .tabs {
    min-height: 20px;
    min-width: 280px;

    .tab {
      min-width: 85px;
      padding: 10px;
      color: #fff;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      text-align: center;
      background: rgba(42, 74, 105, 1);
      margin-right: 20px;
      font: 16px sans-serif;
    }

    .tab.active {
      background: #2e4051;
    }
  }
  .list-nav {
    height: 350px;
    min-width: 280px;
    padding: 10px;
    color: #fff;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    text-align: center;
    background: #2e4051;
    font: 16px sans-serif;
  }
}
</style>
