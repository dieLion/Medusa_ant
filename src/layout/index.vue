<template>
  <a-config-provider :locale="locale">
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
          <a-menu-item key="personalSettings" @click="handleGopersonalSettings">
            <a-icon type="user" />
            <span>个人界面</span>
          </a-menu-item>
          <a-menu-item key="dashboard" @click="handleGodashboard">
            <myicon type="icon-ziyuan" />
            <span>仪表盘</span>
          </a-menu-item>

          <a-sub-menu key="sub1">
            <span slot="title">
              <myicon type="icon-ziyuan" />
              <span>主动扫描</span>
            </span>
            <a-menu-item key="siteScan" @click="handleGositeScan"
              >站点扫描</a-menu-item
            >
            <!-- <a-menu-item key="6">服务信息</a-menu-item>
            <a-menu-item key="7">漏洞信息</a-menu-item> -->
          </a-sub-menu>

          <a-sub-menu key="sub2">
            <span slot="title">
              <myicon type="icon-ziyuan" />
              <span>被动扫描</span>
            </span>
            <!-- <a-menu-item key="8">添加项目</a-menu-item>
            <a-menu-item key="9">项目管理</a-menu-item>
            <a-menu-item key="10">代理记录</a-menu-item> -->
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <span slot="title">
              <myicon type="icon-ziyuan" />
              <span>监控页面</span>
            </span>
            <a-menu-item key="gitHub" @click="handleGogitHub"
              >GitHub</a-menu-item
            >
            <!-- <a-menu-item key="8">添加项目</a-menu-item>
            <a-menu-item key="9">项目管理</a-menu-item>
            <a-menu-item key="10">代理记录</a-menu-item> -->
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
          <div class="control">
            <div class="user">
              <a-avatar :src="headerImg" :loadError="handleLoadError" />
              <span class="user_name">{{ username }}</span>
            </div>
            <div class="language">
              <a-button @click="handelSetLanguage"> {{ language }} </a-button>
            </div>
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
  </a-config-provider>
</template>

<script>
import { Icon } from "ant-design-vue";
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1734998_i0feu56gjii.js",
});
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import enUS from "ant-design-vue/lib/locale-provider/en_US";
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
      locale: zhCN,
      activeIndex: [],
      defaultOpenKeys: [],
      username: "",
      headerImg: "",
      language: "中文",
    };
  },
  created() {
    this.Refresh();
  },
  mounted() {
    this.handleGetuserinfo();
  },
  computed: {
    getAvatar() {
      return this.$store.state.avatar;
    },
  },
  methods: {
    handelSetLanguage(e) {
      if (this.language == "中文") {
        this.language = "English";
        this.locale = enUS;
      } else if (this.language == "English") {
        this.language = "中文";
        this.locale = zhCN;
      }
    },

    handleGetuserinfo() {
      const config = require("../../faceConfig");
      const imgURL = config.imgPath;
      let params = { token: localStorage.getItem("storeToken") };
      console.log(params + "开始验证身份");
      this.$api.user_info(params).then((res) => {
        switch (res.code) {
          case 200:
            console.log("已验证您身份");
            let userinfo = {
              email: res.message.email,
              name: res.message.name,
              show_name: res.message.show_name,
              key: res.message.key,
            };

            let avatar = res.message.avatar;
            this.$store.commit("avatar", avatar);
            this.headerImg = imgURL + res.message.avatar;
            (this.username = res.message.show_name),
              this.$store.commit("userinfo", userinfo);
            break;
          case 404:
            console.log("您未登录，请重新登录");
            this.$message.error("您未登录，请重新登录");
            this.$router.push("/");
            break;
          case 500:
            console.log("请使用Post请求，请重新登录");
            this.$message.error("请使用Post请求，请重新登录");
            this.$router.push("/");
            break;
        }
      });
    },
    handleGopersonalSettings() {
      this.contentBackground = {
        background: "rgba(242,242,242,1)",
      };
      this.$router.push("/layout/personalSettings");
    },
    handleGodashboard() {
      this.contentBackground = {
        background: "rgba(242,242,242,1)",
      };
      this.$router.push("/layout/dashboard");
    },
    handleGositeScan() {
      this.contentBackground = {
        background: "#587797",
      };
      this.$router.push("/layout/siteScan");
    },
    handleGogitHub() {
      this.contentBackground = {
        background: "rgba(242,242,242,1)",
      };
      this.$router.push("/layout/gitHub");
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
      if (this.activeIndex == "personalSettings" ||
        this.activeIndex == "gitHub") {
        this.contentBackground = {
          background: "rgba(242,242,242,1)",
        };
        if(this.activeIndex == "gitHub"){
          this.defaultOpenKeys = ["sub3"];
        }
      } else if (
        this.activeIndex == "dashboard" ||
        this.activeIndex == "siteScan"
      ) {
        // console.log(this.defaultOpenKeys);
        if (this.activeIndex == "siteScan") {
          this.defaultOpenKeys = ["sub1"];
          this.contentBackground = {
            background: "#587797",
          };
        } else {
          this.contentBackground = {
            background: "rgba(242,242,242,1)",
          };
        }

        if (this.$route.name == "siteScan/vulnerabilityDetails") {
          this.contentBackground = {
            background: "#587797",
          };
        }
      }

      // console.log(this.defaultOpenKeys);
    },
    handleLoadError() {
      console.log("error");
      const config = require("../../faceConfig");
      const imgURL = config.imgPath;
      this.headerImg = imgURL + "admin.jpg";
    },
  },
  watch: {
    $route(to) {
      this.activeIndex = [to.name];
      this.Refresh();
    },
    getAvatar: function (old, newd) {
      const config = require("../../faceConfig");
      const imgURL = config.imgPath;
      this.headerImg = imgURL + old;
    },
  },
};
</script>

<style lang="scss">
.icon {
  font-size: 40px;
}
.control {
  display: flex;
  .user {
    align-self: flex-start;
    margin-right: 25px;
    .user_name {
      margin-left: 10px;
      font-size: 16px;
    }
  }
  .language {
    width: 100px;
    align-self: flex-end;
    margin-right: 50px;
  }
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

 .ant-menu>>> .ant-menu-item-selected, .ant-menu-submenu-popup>>>.ant-menu-item-selected {
    background-color: rgb(114,193,65)
}
</style>
