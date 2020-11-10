<template>
<div class="siteInformation">
    <a-row :gutter="[
        { xs: 8, sm: 16, md: 24, xs: 8 },
        { xs: 8, sm: 16, md: 24, lg: 32 },
      ]" style="background: #fff">
        <a-col :xs="{ span: 12 }" :lg="{ offset: 14, span: 4 }">
            <a-select style="width: 100%" :options="options" placeholder="选择搜索字段" @change="handleChange">
            </a-select>
        </a-col>
        <a-col :xs="{ span: 12 }" :lg="{ span: 6 }">
            <a-input-search placeholder="搜索内容" enter-button @search="handleOnSearch" />
        </a-col>
        <a-col :xs="{ span: 24 }" :lg="{ span: 24 }">
            <a-table :columns="columns" :data-source="data">
                <span slot="action" slot-scope="text, record">
                    <a @click="handleGetSerch(record.key)">查询</a>
                </span>
            </a-table>
        </a-col>
    </a-row>
</div>
</template>

<script>
export default {
    name: "siteInformation",
    data() {
        return {
            columns: [{
                    title: "目标地址",
                    dataIndex: "url",
                    key: "url",
                },
                {
                    title: "代理地址",
                    dataIndex: "proxy",
                    key: "proxy",
                },
                {
                    title: "扫描模块",
                    dataIndex: "module",
                    key: "module",
                },
                {
                    title: "进程数量",
                    dataIndex: "process",
                    key: "process",
                },
                {
                    title: "扫描状态",
                    dataIndex: "status",
                    key: "status",
                },
                {
                    title: "项目创建时间",
                    dataIndex: "creation_time",
                    key: "creation_time",
                },
                {
                    title: "操作",
                    key: "action",
                    scopedSlots: {
                        customRender: "action",
                    },
                },
            ],
            data: [],
            FBdata: [], //data的副本
            options: [],
            optionValue: "",
        };
    },
    mounted() {
        this.columns.map((item) => {
            let itemlist = {
                value: item.dataIndex,
                label: item.title,
            };
            if (itemlist.label != "操作") {
                this.options.push(itemlist);
            }
        });
        this.handleGetList_query();
    },
    methods: {
        handleGetList_query() {
            let params = {
                token: localStorage.getItem("storeToken"),
            };
            this.$api.list_query(params).then((res) => {
                console.log(res)
                switch (res.code) {
                    case 200:

                        res.message.map((item) => {
                            let data = {
                                key: item.active_scan_id,
                                url: item.url,
                                proxy: item.proxy,
                                module: item.module,
                                process: item.process,
                                status: item.status,
                                creation_time: this.FnUnixTimes(item.creation_time),
                            };
                            this.FBdata.push(data);
                        });

                        this.data = this.FBdata;
                        break;
                }
            });
        },
        FnUnixTimes(e) {
            //Unix时间转化
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
            let h = unixTimestamp.getHours() + ":";
            let m = unixTimestamp.getMinutes() + ":";
            let s = unixTimestamp.getSeconds();
            let Time = Y + M + D + "  " + h + m + s;
            return Time;
        },
        handleOnSearch(val) {
            let optionItem = this.optionValue;
            if (optionItem != "") {
                console.log(this.optionValue, val);
                // for (let i = 0; i < this.FBdata.length; i++) {
                //     console.log(this.FBdata[i][item])
                // }
                this.data = [];
                this.FBdata.map((item) => {
                    console.log(this.FBdata);
                    if (item[optionItem].indexOf(val) != -1) {
                        let data = {
                            key: item.active_scan_id,
                            url: item.url,
                            proxy: item.proxy,
                            module: item.module,
                            process: item.process,
                            status: item.status,
                            creation_time: item.creation_time,
                        };

                        this.data.push(data);
                    }
                });
            } else {
                this.$message.error("请先选择要搜索的字段");
            }
        },
        handleChange(val) {
            this.optionValue = val;
        },
        handleGetSerch(e) {

            this.$store.commit('active_scan_id', e)
            this.$router.push("/layout/siteInformation/siteScan")
        }

    },
};
</script>

<style lang="scss" scoped>
.siteInformation {
    margin: 0;
    padding: 20px;
    padding-top: 30px;
}
</style>
