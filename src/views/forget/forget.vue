<template>
<a-row :gutter="[16, 24]">
    <a-col :xs="{ span: 20, offset: 2 }" :lg="{ span: 10, offset: 7 }">
        <a-form :form="form" @submit="handleSubmit">
            <a-form-item v-bind="formItemLayout">
                <span slot="label">
                    key&nbsp;
                    <a-tooltip title="用户本地config.py文件中设置的forget_password_key值">
                        <a-icon type="question-circle-o" />
                    </a-tooltip>
                </span>
                <a-input v-decorator="[
              'key',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input your key!',
                    whitespace: true,
                  },
                ],
              },
            ]" />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="E-mail">
                <a-input v-decorator="[
              'email',
              {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              },
            ]" />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="new_Password" has-feedback>
                <a-input v-decorator="[
              'password',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: validateToNextPassword,
                  },
                ],
              },
            ]" type="password" />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="Confirm Password" has-feedback>
                <a-input v-decorator="[
              'confirm',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: compareToFirstPassword,
                  },
                ],
              },
            ]" type="password" @blur="handleConfirmBlur" />
            </a-form-item>
            <a-form-item v-bind="formItemLayout">
                <span slot="label">
                    Username&nbsp;
                    <a-tooltip title="唯一的登录名">
                        <a-icon type="question-circle-o" />
                    </a-tooltip>
                </span>
                <a-input v-decorator="[
              'username',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input your username!',
                    whitespace: true,
                  },
                ],
              },
            ]" />
            </a-form-item>
            <a-form-item v-bind="tailFormItemLayout">
                <a-button type="primary" html-type="submit">Register</a-button>
            </a-form-item>
        </a-form>
    </a-col>
</a-row>
</template>

<script>
export default {
    name: "Forget",
    data() {
        return {
            confirmDirty: false,
            autoCompleteResult: [],
            formItemLayout: {
                labelCol: {
                    xs: {
                        span: 24,
                    },
                    sm: {
                        span: 8,
                    },
                },
                wrapperCol: {
                    xs: {
                        span: 24,
                    },
                    sm: {
                        span: 16,
                    },
                },
            },
            tailFormItemLayout: {
                wrapperCol: {
                    xs: {
                        span: 24,
                        offset: 0,
                    },
                    sm: {
                        span: 16,
                        offset: 8,
                    },
                },
            },
        };
    },
    beforeCreate() {
        this.form = this.$form.createForm(this, {
            name: "register",
        });
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    let params = {
                        key: values.key,
                        name: values.username,
                        new_passwd: values.password,
                        email: values.email,
                    };
                    console.log(values, params);
                    this.$api.forget_password(params).then((res) => {
                        console.log(res);
                        switch (res.code) {
                            case 200:
                                this.$message.success("修改成功啦~建议去配置文件中关闭忘记密码功能哦~");
                                this.$router.push("/");
                                break;
                            case 404:
                                this.$message.error("大黑阔别乱搞，莎莎好怕怕(/ω＼)");
                                break;
                            case 403:
                                this.$message.error("小宝贝你没有开启忘记密码功能哦(๑•̀ㅂ•́)و✧");
                                break;
                            case 500:
                                this.$message.error("请使用Post请求");
                                break;
                            case 503:
                                this.$message.error("这个数据你是认真的嘛(。﹏。)");
                                break;
                        }
                    });
                }
            });
        },
        handleConfirmBlur(e) {
            const value = e.target.value;
            this.confirmDirty = this.confirmDirty || !!value;
        },
        compareToFirstPassword(rule, value, callback) {
            const form = this.form;
            if (value && value !== form.getFieldValue("password")) {
                callback("Two passwords that you enter is inconsistent!");
            } else {
                callback();
            }
        },
        validateToNextPassword(rule, value, callback) {
            const form = this.form;
            if (value && this.confirmDirty) {
                form.validateFields(["confirm"], {
                    force: true,
                });
            }
            callback();
        },
        handleWebsiteChange(value) {
            let autoCompleteResult;
            if (!value) {
                autoCompleteResult = [];
            } else {
                autoCompleteResult = [".com", ".org", ".net"].map(
                    (domain) => `${value}${domain}`
                );
            }
            this.autoCompleteResult = autoCompleteResult;
        },
    },
};
</script>

<style>
</style>
