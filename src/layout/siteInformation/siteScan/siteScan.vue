<template>
<div class="siteScan">
    <a-row :gutter="[
        { xs: 8, sm: 16, md: 24, xs: 8 },
        { xs: 4, sm: 8, md: 12, lg: 16 },
      ]">
        <a-col :xs="{ span: 24 }" :lg="{ span: 24 }">
            <a-col :xs="{ span: 4 }" :lg="{ span: 3 }" :xl="{ span: 3 }" :xxl="{ span: 2 }" class="safetyOverview">安全总览</a-col>
            <a-col :xs="{ span: 24 }" :lg="{ span: 24 }" class="safetyOverview-nav">
                <a-col :xs="{ span: 24 }" :lg="{ span: 24 }" class="safetyOverview-nav-header">
                    <a-col :xs="{ span: 8 }" :lg="{ span: 4 }">richhc.com</a-col>
                    <a-col :xs="{ span: 16 }" :lg="{ span: 12 }" style="color: rgba(36, 181, 155, 1)">2020.03.12 16:15:06---1010.03.13 16:15:06</a-col>
                    <a-col :xs="{ span: 8 }" :lg="{ span: 3 }" style="color: rgba(36, 181, 155, 1)">得分: 100</a-col>
                    <a-col :xs="{ span: 8 }" :lg="{ span: 3 }" style="color: rgba(36, 181, 155, 1)">非周期任务</a-col>
                    <a-col :xs="{ span: 8 }" :lg="{ span: 2 }" style="color: rgba(36, 181, 155, 1)">导出报告</a-col>
                </a-col>
                <a-col :xs="{ span: 24 }" :lg="{ span: 24 }" class="safetyOverview-nav-body">
                    <a-col :xs="{ span: 24 }" :lg="{ span: 8 }" class="safetyOverview-nav-body-risk">
                        <hisghtRisk></hisghtRisk>
                    </a-col>
                    <a-col :xs="{ span: 24 }" :lg="{ span: 8 }" class="safetyOverview-nav-body-risk">
                        <mediumRisk></mediumRisk>
                    </a-col>
                    <a-col :xs="{ span: 24 }" :lg="{ span: 8 }" class="safetyOverview-nav-body-risk">
                        <lowRisk></lowRisk>
                    </a-col>
                </a-col>
            </a-col>
        </a-col>
    </a-row>

    <a-row :gutter="[
        { xs: 8, sm: 16, md: 24, xs: 8 },
        { xs: 4, sm: 6, md: 8, lg: 10 },
      ]">
        <a-col :xs="{ span: 24 }" :lg="{ span: 24 }">
            <div class="tabs">
                <a-col :xs="{ span: 6 }" :md="{ span: 3 }" :lg="{ span: 3 }" :xl="{ span: 3 }" :xxl="{ span: 2 }" v-for="(index, i) in tabs" :key="i" @click="fntab(i, index.view)" class="tab" :class="{ active: active == i }">{{ index.type }}</a-col>
            </div>

            <a-col :xs="{ span: 24 }" :lg="{ span: 24 }" class="list-nav">
                <component :is="currentView"></component>
            </a-col>
        </a-col>
    </a-row>

    <a-row :gutter="[
        { xs: 8, sm: 16, md: 24, xs: 8 },
        { xs: 4, sm: 6, md: 8, lg: 10 },
      ]">
        <a-col :xs="{ span: 24 }" :lg="{ span: 24 }">
            <a-col :xs="{ span: 4 }" :lg="{ span: 3 }" :xl="{ span: 3 }" :xxl="{ span: 2 }" class="vulnerabilityDetails">漏洞详情</a-col>
            <a-col :xs="{ span: 24 }" :lg="{ span: 24 }" class="vulnerabilityDetails-nav">
                <vulnerability></vulnerability>
            </a-col>
        </a-col>
    </a-row>
</div>
</template>

<script>
import hisghtRisk from "./risk/hightRisk";
import mediumRisk from "./risk/mediumRisk";
import lowRisk from "./risk/lowRisk";
import portInformation from "./portInformation/portInformation";
import subdomainNameList from "./subdomainNameList/subdomainNameList";
import vulnerability from "./vulnerability/vulnerability";
export default {
    name: "siteScan",
    components: {
        hisghtRisk,
        mediumRisk,
        lowRisk,
        portInformation,
        subdomainNameList,
        vulnerability,
    },
    data() {
        return {
            active: 0,
            currentView: "portInformation",
            tabs: [{
                    type: "端口信息",
                    view: "portInformation",
                },
                {
                    type: "子域名列表",
                    view: "subdomainNameList",
                },
            ],
        };
    },
    mounted() {
        this.handleGetImfomation_query();
    },
    methods: {
        handleGetImfomation_query() {
            console.log(this.$store.state.active_scan_id);
            if (this.$store.state.active_scan_id != 'null') {
                let params = {
                    token: localStorage.getItem("storeToken"),
                    active_scan_id: this.$store.state.active_scan_id,
                };
                this.$api.imfomation_query(params).then((res) => {
                    console.log(res);
                });
            } else {
                this.$message.warning('请从站点扫描进入,跳转站点扫描中...')
                this.$router.push('/layout/siteInformation')
            }
        },
        fntab(i, v) {
            this.active = i;
            this.currentView = v;
            //console.log(this.active, this.currentView)
        },
    },
};
</script>

<style lang="scss" scoped>
.siteScan {
    width: 100%;
    //height: 100%;
    padding: 20px 20px 0 20px;
    background: #587797;

    .safetyOverview,
    .vulnerabilityDetails {
        min-width: 60px;
        padding: 10px;
        color: #fff;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        text-align: center;
        background: #2e4051;
        margin-right: 20px;
        font-size: 16px;
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
            font-size: 16px;
        }

        .tab.active {
            background: #2e4051;
        }
    }

    .subdomainNameList {
        min-width: 60px;
        padding: 10px;
        color: #fff;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        text-align: center;
        background: rgba(42, 74, 105, 1);
        margin-right: 20px;
        font-size: 16px;
    }

    .safetyOverview-nav {
        min-width: 280px;
        padding: 10px;
        color: #fff;
        border-top-right-radius: 5px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        text-align: left;
        background: #2e4051;
        font: 0.12rem sans-serif;

        .safetyOverview-nav-header {
            font-size: 14px;
        }

        .portInformation-nav-header {
            font-size: 14px;
            text-align: center;
        }

        .safetyOverview-nav-body {
            background: rgba(42, 74, 105, 1);
            min-height: 210px;

            .safetyOverview-nav-body-risk {
                min-height: 190px;
                height: 1rem;
            }
        }
    }

    .vulnerabilityDetails-nav {
        min-width: 265px;
        padding: 10px;
        color: #fff;
        border-top-right-radius: 5px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        text-align: left;
        background: #2e4051;
        font-size: 14px;
    }

    .list-nav {
        min-height: 230px;
        min-width: 280px;
        padding: 10px;
        color: #fff;
        border-top-right-radius: 5px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        text-align: left;
        background: #2e4051;
        font-size: 14px;
    }
}
</style>
