<template>
<a-row :gutter="[{ xs: 0, sm: 0, md: 0, xs: 0 },{xs: 8, sm: 6, md: 8, lg: 10 ,xl:9}]">
    <a-col :xs="{ span: 24}" :lg="{ span: 24}" class="portInformation-nav-header">
        <a-col :xs="{ span: 8}" :lg="{ span: 8}">端口序号</a-col>
        <a-col :xs="{ span: 8}" :lg="{ span: 8}">所属服务</a-col>
        <a-col :xs="{ span: 8}" :lg="{ span: 8}">服务承诺</a-col>
    </a-col>
    <a-col :xs="{ span: 24}" :lg="{ span: 24}" class="portInformation-nav-body">
        <div class="portInformation-nav-body-for" v-for="(item,i) in frontPortInformationList" :key="i" @click="handleGoDomainNameDetails(item.prot)">
            <a-col :xs="{ span: 8}" :lg="{ span: 8}" class="portInformation-nav-body-for-hover">{{item.prot}}</a-col>
            <a-col :xs="{ span: 8}" :lg="{ span: 8}" class="portInformation-nav-body-for-hover">{{item.service}}</a-col>
            <a-col :xs="{ span: 8}" :lg="{ span: 8}" class="portInformation-nav-body-for-hover">{{item.details}}</a-col>
        </div>
    </a-col>
    <a-col :xs="{ span: 20,push:4}" :sm="{ span: 16,push:8}" :lg="{ span: 11,push:13}" :xl="{ span: 10,push:14}" :xxl="{ span: 8,push:16}">
        <a-pagination class="pagination" size="small" :total="total" :pageSize.sync="pageSize" :show-total="total => `共 ${total} 条数据`" show-quick-jumper v-model="current" @change="fnonChange" :item-render="itemRender" />
    </a-col>
</a-row>
</template>

<script>
export default {
    name: "portInformation",
    data() {
        return {
            defaultPortInformationList: [{
                    //总数据
                    prot: "80",
                    service: "http",
                    details: "nginx",
                },
                {
                    prot: "443",
                    service: "http",
                    details: "nginx",
                },
                {
                    prot: "553",
                    service: "http",
                    details: "nginx",
                },
                {
                    prot: "668",
                    service: "http",
                    details: "nginx",
                },
                {
                    prot: "777",
                    service: "http",
                    details: "nginx",
                },
                {
                    prot: "8080",
                    service: "http",
                    details: "nginx",
                },
                {
                    prot: "9090",
                    service: "http",
                    details: "nginx",
                },
                {
                    prot: "123",
                    service: "http",
                    details: "nginx",
                },
            ],
            total: 4, //数句总数
            frontPortInformationList: [], //但前页数据
            current: 1, //默认当前页
            pageSize: 5, //一页显示数量
        };
    },
    mounted() {
        this.fnPaging();
    },
    methods: {
        fnonChange(pageNumber, pageSize) {
            console.log("Page: ", pageNumber, pageSize);
            let start = pageNumber * this.pageSize - this.pageSize;
            let end = 0;
            pageNumber * this.pageSize - 1 <=
                this.defaultPortInformationList.length - 1 ?
                (end = pageNumber * this.pageSize - 1) :
                (end = this.defaultPortInformationList.length - 1);
            this.frontPortInformationList = [];
            for (let i = start; i <= end; i++) {
                this.frontPortInformationList.push(this.defaultPortInformationList[i]);
            }
        },
        fnPaging() {
            this.total = this.defaultPortInformationList.length;
            for (let i = 0; i < this.pageSize; i++) {
                this.frontPortInformationList.push(this.defaultPortInformationList[i]);
            }
        },
        itemRender(current, type, originalElement) {
            if (type === "prev") {
                return "上一页";
            } else if (type === "next") {
                return "下一页";
            }
            return originalElement;
        },
        handleGoDomainNameDetails(prot) {
            console.log(prot)
            this.$router.push("/layout/siteScan/domainNameDetails");
        }
    },
};
</script>

<style lang="scss">
.portInformation-nav-header {
    font-size: 0.09rem;
    text-align: center;
}

.portInformation-nav-body {
    font-size: 0.07rem;
    text-align: center;
    height: 140px;

    .portInformation-nav-body-for {
        height: 20%;
    }

    .portInformation-nav-body-for:hover .portInformation-nav-body-for-hover {
        background: #2a4a69;
    }
}

.pagination {
    color: floralwhite !important;

    .ant-pagination-prev,
    .ant-pagination-next,
    .ant-pagination-item a {
        font-size: 0.07rem;
        color: floralwhite !important;
    }

    .ant-pagination-item-active a {
        font-size: 0.07rem;
        color: #1890ff !important;
    }
}
</style>
