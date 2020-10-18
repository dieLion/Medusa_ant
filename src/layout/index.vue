<template>
  <a-layout id="components-layout-demo-custom-trigger" style="height: 100%">
    <a-layout-sider
      v-model="collapsed"
      :trigger="null"
      collapsible
      breakpoint="lg"
      collapsed-width="0"
    >
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="inline"
        :default-selected-keys="activeIndex"
        :default-open-keys="defaultOpenKeys"
      >
        <a-menu-item key="personalSettings" @click="gopersonalSettings">
          <a-icon type="user" />
          <span>个人界面</span>
        </a-menu-item>
        <a-menu-item key="dashboard" @click="godashboard">
          <myicon type="icon-ziyuan" />
          <span>仪表盘</span>
        </a-menu-item>

        <a-sub-menu key="sub1">
          <span slot="title">
            <myicon type="icon-ziyuan" />
            <span>主动扫描</span>
          </span>
          <a-menu-item key="siteScan" @click="gositeScan">站点扫描</a-menu-item>
          <a-menu-item key="6">服务信息</a-menu-item>
          <a-menu-item key="7">漏洞信息</a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="sub2">
          <span slot="title">
            <myicon type="icon-ziyuan" />
            <span>被动扫描</span>
          </span>
          <a-menu-item key="8">添加项目</a-menu-item>
          <a-menu-item key="9">项目管理</a-menu-item>
          <a-menu-item key="10">代理记录</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        style="
          background: #fff;
          padding: 0;
          display: flex;
          justify-content: space-between;
        "
      >
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <div class="user">
          <a-avatar size="small" :src="headerImg" />
          <span>{{username}}</span>
        </div>
        <!-- <a-breadcrumb style="margin: 0 0">
            <a-breadcrumb-item>个人界面</a-breadcrumb-item>
            <a-breadcrumb-item>设置</a-breadcrumb-item>
        </a-breadcrumb>-->
      </a-layout-header>

      <a-layout-content :style="contentBackground">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { Icon } from "ant-design-vue";
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1734998_i0feu56gjii.js",
});
export default {
  name: "layout",
  components: {
    myicon: MyIcon,
  },
  data() {
    return {
      collapsed: false,
      contentBackground: {
        background: "#fff",
      },
      activeIndex: [],
      defaultOpenKeys: [],
      username:'',
      headerImg:''
    };
  },
  created() {
    this.Refresh();
  },
  mounted() {
     this.handleGetuserinfo();
  },
  methods: {
    handleGetuserinfo() {
      const config = require("../../faceConfig");
      const imgURL = config.imgPath;
      let params = { token: localStorage.getItem("storeToken") };
        console.log(params+"开始验证身份")
        this.$api.user_info(params).then((res) => {
          switch (res.code) {
            case 200:
              console.log("已验证您身份")
              let userinfo = {
                email: res.message.email,
                img_path: res.message.img_path,
                name: res.message.name,
                show_name: res.message.show_name,
                key: res.message.key,
              };
              this.headerImg=imgURL+res.message.img_path
              this.username=res.message.show_name,
              this.$store.commit("userinfo", userinfo);
              break;
            case 404:
              console.log("您未登录，请重新登录")
              this.$message.error("您未登录，请重新登录");
              this.$router.push("/");
              break;
            case 500:
              console.log("请使用Post请求，请重新登录")
              this.$message.error("请使用Post请求，请重新登录");
              this.$router.push("/");
              break;
          }
        });
    },
    gopersonalSettings() {
      this.contentBackground = {
        background: "#fff",
      };
      this.$router.push("/layout/personalSettings");
    },
    godashboard() {
      this.contentBackground = {
        background: "#587797",
      };
      this.$router.push("/layout/dashboard");
    },
    gositeScan() {
      this.contentBackground = {
        background: "#587797",
      };
      this.$router.push("/layout/siteScan");
    },
    Refresh() {
      if (
        this.$route.name == "siteScan/vulnerabilityDetails" ||
        this.$route.name == "siteScan/domainNameDetails"
      ) {
        this.activeIndex = ["siteScan"];
      } else {
        this.activeIndex = [this.$route.name];
      }
      // console.log(this.$route.name, this.activeIndex);
      if (this.activeIndex == "personalSettings") {
        this.contentBackground = {
          background: "#fff",
        };
      } else if (
        this.activeIndex == "dashboard" ||
        this.activeIndex == "siteScan"
      ) {
        // console.log(this.defaultOpenKeys);
        if (this.activeIndex == "siteScan") {
          this.defaultOpenKeys = ["sub1"];
        }
        this.contentBackground = {
          background: "#587797",
        };
        if (this.$route.name == "siteScan/vulnerabilityDetails") {
          this.contentBackground = {
            background: "rgba(46,64,81,1)",
          };
        }
      }

      // console.log(this.defaultOpenKeys);
    },
  },
  watch: {
    $route(to) {
      // console.log(to.name);
      // if (this.$route.name == 'siteScan/vulnerabilityDetails') {
      //     this.contentBackground = {
      //         background: "rgba(46,64,81,1)",
      //     };
      // }
      this.activeIndex = [to.name];
      this.Refresh();
    },
  },
};
</script>

<style lang="scss">
.icon {
  font-size: 40px;
}
.user {
  align-self:flex-end;
  margin-right: 50px;;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
