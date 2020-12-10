<template>
<div class="createProject">
    <a-row :gutter="[
        { xs: 8, sm: 8, md: 8, xs: 8 },
        { xs: 8, sm: 16, md: 24, lg: 32 },
      ]">
        <a-col :xs="{ span: 24 }" :lg="{ span: 8 }" :xl="{ span: 8 }" :xxl="{ span: 6 }">
            <a-col :xs="{ span: 24 }" class="read">
                <Tabbten @handelSetActiveL="handelSetActiveL" @handelSetActiveR="handelSetActiveR"></Tabbten>
                <a-list item-layout="horizontal" class="read_horizontal" :data-source="DefaultScriptTemplate" :column="[24]">
                    <a-list-item slot="renderItem" slot-scope="item">
                        <a-list-item-meta>
                            <span slot="title" class="read_font" @click="handleSelectData(item)">{{ item.template_name }}</span>
                            <myicon type="icon-js" slot="avatar" class="icon" />
                        </a-list-item-meta>
                    </a-list-item>
                </a-list>
                <!--       <a-col :xs="{ span: 24 }" class="read_border">
                </a-col>-->
            </a-col>
        </a-col>
        <a-col :xs="{ span: 24 }" :lg="{ span: 16 }" :xl="{ span: 16 }" :xxl="{ span: 18 }">
            <a-col :xs="{ span: 24 }" class="ruleForm">
                <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" ref="ruleForm" :layout="form.layout">
                    <a-form-model-item label="模板名称" prop="template_name" :labelAlign="'left'">
                        <a-input v-model="form.template_name" :disabled="true" />
                    </a-form-model-item>
                    <a-form-model-item label="模板内容" prop="template_data" :labelAlign="'left'">
                        <codemirror ref="myCm" v-model="form.template_data" :options="cmOptions" class="code"></codemirror>
                    </a-form-model-item>

                </a-form-model>
            </a-col>
        </a-col>
    </a-row>
</div>
</template>

<script>
import {
    Icon
} from "ant-design-vue";
import Tabbten from "../../../components/Tabbten.vue";
import {
    codemirror
} from "vue-codemirror";
require("codemirror/mode/javascript/javascript.js");
const MyIcon = Icon.createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_1734998_apjce2fwnsu.js",
});

export default {
    components: {
        myicon: MyIcon,
        Tabbten,
        codemirror,
    },
    data() {
        return {
            labelCol: {
                span: 20,
                offset: 2,
            },
            wrapperCol: {
                span: 20,
                offset: 2,
            },
            form: {
                template_name: "",
                template_data: "",
            },
            DefaultScriptTemplate: [],

            cmOptions: {
                mode: "javascript",
                theme: "duotone-light",
                lineNumbers: true,
                line: true,
                readOnly: "nocursor", //只读
                matchBrackets: true,
            },
        };
    },
    mounted() {
        this.handleReadDefaultScriptTemplate();
    },
    methods: {
        handleReadDefaultScriptTemplate() {
            let params = {
                token: localStorage.getItem("storeToken"),
            };
            this.$api.read_default_script_template(params).then((res) => {
                console.log(res);
                let DefaultScriptTemplate = [];
                switch (res.code) {
                    case 200:
                        res.message.map((item) => {
                            let Template = {
                                template_data: this.$qj.QJBase64Decode(item.file_data),
                                template_name: item.file_name,
                            };
                            DefaultScriptTemplate.push(Template);
                        });
                        this.DefaultScriptTemplate = DefaultScriptTemplate;
                        break;
                    case 169:
                        this.$message.error(res.message);
                        break;
                    case 403:
                        this.$message.error(res.message);
                        break;
                    case 500:
                        this.$message.error(res.message);
                        break;
                }
            });
        },
        handleSelectData(val) {
            console.log(val);
            this.form = {
                template_name: val.template_name,
                template_data: val.template_data,
            };
            //   this.DefaultScriptTemplate.map((item) => {
            //     if (item.value == val) {
            //       this.defaultVal = item.key;
            //       this.showDataForm.title = item.value;
            //       this.showDataForm.data = item.key;
            //     }
            //   });
        },
        handelSetActiveL() {
            this.handleReadDefaultScriptTemplate();
        },
        handelSetActiveR() {
            let params = {
                token: localStorage.getItem("storeToken"),
            };
            let list = [];
            this.$api.read_script_template(params).then((res) => {
                switch (res.code) {
                    case 200:
                        res.message.map((item) => {
                            let options = {
                                template_data: this.$qj.QJBase64Decode(item.template_data),
                                template_name: item.template_name,
                            };
                            list.push(options);
                        });
                        this.DefaultScriptTemplate = list;
                        break;
                    case 169:
                        this.$message.error(res.message);
                        break;
                    case 403:
                        this.$message.error(res.message);
                        break;
                    case 500:
                        this.$message.error(res.message);
                        break;
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
$color: #51c51a;

.icon {
    font-size: 30px;
}

.read_font {
    font-size: 20px;
}

.read_font:hover {
    color: $color;
    cursor: pointer;
}

.createProject {
    margin: 0;
    padding: 20px;
    padding-top: 20px;
    min-width: 300px;

    .read,
    .ruleForm {
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 18px;
        min-height: 800px;

        .btn {
            display: -webkit-flex;
            /* Safari */
            display: flex;
            justify-content: space-around;
        }
    }

    .ruleForm {
        background: #fff;
        // background: url("../../../assets/blackBack.jpg") no-repeat;
        // background-size: 100% 100%;
    }

    // .read /deep/.ant-list-split .ant-list-item {
    //     border-bottom: 1px solid rgb(148, 148, 148);
    // }

    .read {
        background: #fff;

        .read_horizontal {
            margin: 10px;
            border-top: 2px solid rgb(255, 238, 0);
        }
    }

    .read_border {
        width: 100%;
        height: 100%;
        border: 1px solid #fff;
        border-radius: 5px;
        overflow: auto;
        background: #fff;
    }

    /*定义整体的宽度*/
    .read_border::-webkit-scrollbar {
        width: 3px;
    }

    /*定义滚动条轨道*/
    .read_border::-webkit-scrollbar-track {
        border-radius: 5px;
    }

    /*定义滑块*/
    .read_border::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.5);
    }

    .read_border::after {}
}
</style>
