<template>
<div class="issueTasks">
    <a-row :gutter="[
        { xs: 8, sm: 16, md: 24, xs: 8 },
        { xs: 8, sm: 16, md: 24, lg: 32 },
      ]" style="background: #fff">
        <a-col :xs="{ span: 20, offset: 2 }" :lg="{ span: 14, offset: 5 }" :xl="{ span: 12, offset: 6 }" :xxl="{ span: 10, offset: 7 }">
            <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules" ref="ruleForm">
                <a-form-model-item label="目标URL" prop="url">
                    <a-input v-model="form.url" />
                </a-form-model-item>
                <a-form-model-item label="任务的进程树" prop="process" placeholder="默认为20">
                    <a-input v-model.number="form.process" />
                </a-form-model-item>
                <a-form-model-item label="扫描模块" prop="module" placeholder="默认为ALL">
                    <a-input v-model="form.module" />
                </a-form-model-item>
                <a-form-model-item label="自定义头" prop="header">
                    <a-input v-model="form.header" type="textarea" :auto-size="{ minRows: 10 }" placeholder="Accept:text/javascript
Accept-Encoding:gzip
Accept-Language:zh-CN,zh
Connection:keep-alive
Cookie:test
Host:www.baidu.com
Referer:https://www.baidu.com
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-origin
            " />
                </a-form-model-item>
                <a-form-model-item label="指定代理" prop="proxy" placeholder="默认为None">
                    <a-input v-model="form.proxy" />
                </a-form-model-item>
                <a-form-model-item :wrapper-col="{ span: 6, offset: 9 }">
                    <a-button type="primary" @click="handleOnSubmit"> 下发任务 </a-button>
                </a-form-model-item>
            </a-form-model>
        </a-col>
    </a-row>
</div>
</template>

<script>
export default {
    data() {
        return {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 14,
            },
            form: {
                url: "",
                process: undefined,
                module: "",
                header: "",
                proxy: "",
            },
            rules: {
                url: [{
                    required: true,
                    message: "请输入目标URL",
                    whitespace: true,
                }, ],
                process: [{
                    message: "当前任务使用的进程树",
                    whitespace: true,
                    type: "number",
                }, ],
                module: [{
                    message: "扫描模块,参考Modules目录下的文件名",
                    whitespace: true,
                }, ],
                header: [{
                    message: "自定义头，如果没有的话传入None参数，用法和bash版一样",
                    whitespace: true,
                }, ],
                proxy: [{
                    message: "该任务指定代理，如果没有代理该值直接传入0 ",
                    whitespace: true,
                }, ],
            },
        };
    },
    mounted() {},
    methods: {
        handleOnSubmit() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    let form = this.form;
                    //
                    // console.log((form.header.replace(/^\s+|\s+$/g, '')).split(/\r*\n*\s/))
                    // let re_form = form.header.replace(/^\s+|\s+$/g, "");
                    let obj = {};
                    let json_obj;
                    console.log(form.header)

                    if (form.header == "None" || form.header == '') {
                        json_obj = "None";
                    } else {
                        let sp_form = form.header.split(/\r*\n/);
                        sp_form.map((i) => {
                            let arr = i.split(":");
                            obj[arr[0]] = arr[1];
                        });
                        json_obj = JSON.stringify(obj);
                    }
                    if (form.process == undefined || form.process == '') {
                        form.process = 20
                    }
                    if (form.header == '') {
                        form.module = "ALL"
                    }
                    if (form.proxy == '') {
                        form.proxy = "None"
                    }
                    // console.log(sp_form)
                    // console.log(sp_form.toString())
                    let params = {
                        url: form.url,
                        process: form.process,
                        module: form.module,
                        header: json_obj,
                        proxy: form.proxy,
                        token: localStorage.getItem("storeToken"),
                    };
                    console.log(params);
                    this.$api.scanning(params).then((res) => {
                        // 200：任务下发成功👌
                        // 403：小宝贝这是非法查询哦(๑•̀ㅂ•́)و✧
                        // 666：类型错误！
                        // 169：莎酱被玩坏掉嘞QAQ
                        // 500：请使用Post请求
                        switch (res.code) {
                            case 200:
                                this.$message.success("任务下发成功👌");
                                console.log(res.message);
                                break;
                            case 169:
                                this.$message.error("莎酱被玩坏掉嘞QAQ");
                                break;
                            case 403:
                                this.$message.error("小宝贝这是非法查询哦(๑•̀ㅂ•́)و✧");
                                break;
                            case 666:
                                this.$message.error("类型错误");
                                break;
                            case 500:
                                this.$message.error("请使用Post请求");
                                break;
                        }
                    });
                } else {
                    this.$message.error("请填写内容");
                    return false;
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.issueTasks {
    margin: 0;
    padding: 20px;
    padding-top: 30px;
}
</style>
