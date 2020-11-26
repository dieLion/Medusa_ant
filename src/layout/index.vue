<template>
<a-config-provider :locale="locale">
    <a-layout id="components-layout-demo-custom-trigger" style="height: 100%">
        <a-layout-sider v-model="collapsed" :trigger="null" collapsible breakpoint="lg" collapsed-width="0">
            <div class="logo">
                <img width="100%" height="100%" src="../assets/logo.png" />
            </div>
            <a-menu theme="dark" mode="inline" :selectedKeys="activeIndex" :default-open-keys="defaultOpenKeys">
                <template v-for="item in menuList">
                    <a-menu-item :key="item.key" @click="handleGoChange" v-if="!item.children">
                        <myicon :type="item.iconType" />
                        <span>{{ item.msg }}</span>
                    </a-menu-item>
                    <sub-menu v-else :key="item.key" :menu-info="item" :handleGoChange="handleGoChange" />
                </template>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="
            background: #fff;
            padding: 0;
            display: flex;
            justify-content: space-between;
          ">
                <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="() => (collapsed = !collapsed)" />
                <div class="control">
                    <a-dropdown class="user">
                        <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                            <a-avatar :src="headerImg" :loadError="handleLoadError" />
                            <span class="user_name">{{ username }}</span>
                        </a>
                        <a-menu slot="overlay" @click="handleMenuClick">
                            <a-menu-item key="user">
                                <a-icon type="setting" />个人中心
                            </a-menu-item>
                            <a-menu-item key="logOut">
                                <a-icon type="poweroff" />退出登录
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
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
import {
    Icon
} from "ant-design-vue";
const MyIcon = Icon.createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_1734998_261bksb0z5p.js",
});
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import enUS from "ant-design-vue/lib/locale-provider/en_US";
import SubMenu from "./SubMenu";

export default {
    name: "layout",
    components: {
        myicon: MyIcon,
        "sub-menu": SubMenu,
    },
    // computed: {
    //     logo: function () {
    //         return {
    //             background: this.logoimg
    //         }
    //     }
    // },
    data() {
        return {
            menuList: [{
                    key: "personalSettings",
                    iconType: "icon-Serviceusers",
                    msg: "个人界面",
                },
                {
                    key: "dashboard",
                    iconType: "icon-saomiao1",
                    msg: "仪表盘",
                },
                {
                    key: "sub1",
                    iconType: "icon-ziyuan",
                    msg: "主动扫描",
                    children: [{
                            key: "issueTasks",
                            msg: "下发任务",
                        },
                        {
                            key: "siteInformation",
                            msg: "站点扫描",
                        },
                    ],
                },
                {
                    key: "sub2",
                    iconType: "icon-saomiao2",
                    msg: "被动扫描",
                    children: [],
                },
                {
                    key: "sub3",
                    iconType: "icon-jiankong",
                    msg: "监控页面",
                    children: [{
                        key: "gitHub",
                        msg: "gitHub监控",
                    }, ],
                },
                {
                    key: "sub4",
                    iconType: "icon-jiankong",
                    msg: "跨站脚本钓鱼",
                    children: [{
                            key: "createProject",
                            msg: "创建项目",
                        },
                        {
                            key: "projectManagement",
                            msg: "项目管理",
                        },
                        {
                            key: "publicTemplate",
                            msg: "公共模板",
                        },
                        {
                            key: "customTemplate",
                            msg: "自定义模板",
                        },
                    ],
                },
            ],
            top: 0.1,
            collapsed: false,
            contentBackground: {
                background: "rgba(242,242,242,1)",
                padding: "10px"
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
        handleGoChange(e) {
            console.log(e);
            this.$router.push("/layout/" + e.key);
            // switch (e.key) {
            //     case "personalSettings":
            //         this.$router.push("/layout/personalSettings");
            //         this.activeIndex = ["personalSettings"];
            //         break;
            //     case "dashboard":
            //         this.$router.push("/layout/dashboard");
            //         this.activeIndex = ["dashboard"];
            //         break;
            //     case "issueTasks":
            //         this.$router.push("/layout/issueTasks");
            //         this.activeIndex = ["issueTasks"];
            //         break;
            //     case "siteInformation":
            //         this.$router.push("/layout/siteInformation");
            //         this.activeIndex = ["siteInformation"];
            //         break;
            //     case "gitHub":
            //         this.$router.push("/layout/gitHub");
            //         this.activeIndex = ["gitHub"];
            //         break;
            // }
        },
        handleMenuClick(e) {
            switch (e.key) {
                case "user":
                    this.$router.push("/layout/personalSettings");
                    this.activeIndex = ["personalSettings"];
                    break;
                case "logOut":
                    this.$router.push("/");
                    localStorage.setItem("storeToken", "");
                    break;
            }
        },
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
            let params = {
                token: localStorage.getItem("storeToken"),
            };
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
                        (this.username = res.message.name),
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
        Refresh() {
            console.log(this.$route.meta.activeIndex);
            this.activeIndex = [this.$route.meta.activeIndex]
            if (this.$route.meta.defaultOpenKeys) {
                this.defaultOpenKeys = [this.$route.meta.defaultOpenKeys];
            }
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
            console.log(to.meta.keepAlive);
            this.activeIndex = [to.name];
            this.Refresh();
            this.handleGetuserinfo();
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
        color: #000;
        align-self: flex-start;
        padding-left: 15px;
        padding-right: 25px;

        .user_name {
            margin-left: 10px;
            font-size: 16px;
        }

        // .user_item {
        //     border-top: 1px solid rgb(2, 177, 247);
        //     background: rgba(236, 236, 236, 0.5);
        // }
    }

    .user:hover {
        background: rgba(236, 236, 236, 0.5);
    }

    .language {
        width: 100px;
        align-self: flex-end;
        margin-right: 50px;
        margin-left: 20px;
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
    height: 60px;
}

.ant-menu>>>.ant-menu-item-selected,
.ant-menu-submenu-popup>>>.ant-menu-item-selected {
    background-color: rgb(114, 193, 65);
}
</style>
