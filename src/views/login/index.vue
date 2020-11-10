<template>
<a-form id="components-form-demo-normal-login" :form="form" class="login-form" @submit="handleSubmit" ref="form">
    <a-row :gutter="[
        { xs: 8, sm: 16, md: 24, xs: 8 },
        { xs: 4, sm: 6, md: 8, lg: 10 },
      ]">
        <a-col :xs="{ span: 24 }" :lg="{ span: 24 }">
            <img width="100%" height="100%" src="./cover.png" />
        </a-col>
    </a-row>
    <a-form-item>
        <a-input v-decorator="[
          'userName',
          {
            rules: [{ required: true, message: 'Please input your username!' }],
          },
        ]" placeholder="Username">
            <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
        </a-input>
    </a-form-item>
    <a-form-item>
        <a-input v-decorator="[
          'password',
          {
            rules: [{ required: true, message: 'Please input your Password!' }],
          },
        ]" type="password" placeholder="Password">
            <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
        </a-input>
    </a-form-item>
    <a-form-item>
        <a-checkbox :disabled="checkboxDisabled" v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: false,
            rules: [{ validator: handleConfirm }],
          },
        ]">
            <a @click="
            () => {
              this.visible = true;
            }
          " style="color: #aaa">我已阅读并同意相关服务条款和使用协议</a>
        </a-checkbox>
        <a-modal title="Medusa使用协议" :visible="visible" @ok="handleOk" @cancel="handleCancel">
            <p>
                在原有的<a href="https://github.com/Ascotbe/Medusa/blob/master/LICENSE" style="color: #0366d6">协议</a>中追加以下内容：
            </p>
            <ul>
                <li>本项目禁止进行未授权商业用途</li>
                <li>
                    本项目仅面向<strong>合法授权</strong>的企业安全建设行为，在使用本项目进行检测时，您应确保该行为符合当地的法律法规，并且已经取得了足够的授权。
                </li>
                <li>
                    如您在使用本项目的过程中存在任何非法行为，您需自行承担相应后果，我们将不承担任何法律及连带责任。
                </li>
                <li>
                    在使用本项目前，请您<strong>务必审慎阅读、充分理解各条款内容</strong>，限制、免责条款或者其他涉及您重大权益的条款可能会以加粗、加下划线等形式提示您重点注意。
                    除非您已充分阅读、完全理解并接受本协议所有条款，否则，请您不要使用本项目。您的使用行为或者您以其他任何明示或者默示方式表示接受本协议的，即视为您已阅读并同意本协议的约束。
                </li>
            </ul>
        </a-modal>
    </a-form-item>

    <a-form-item>
        <a-col :xs="{ span: 24 }" :md="{ span: 8 }" class="col_mybtn">
            <Mybtn :title="loginbtn" :btn_width="110" :btn_hight="40" :ClickPromise="handleLogin" />
        </a-col>
        <a-col :xs="{ span: 24 }" :md="{ span: 8 }" class="col_mybtn">
            <Mybtn :title="regbtn" :btn_width="110" :btn_hight="40" :ClickPromise="handleRegister" />
        </a-col>
        <a-col :xs="{ span: 24 }" :md="{ span: 8 }" class="col_mybtn">
            <Mybtn :btn_width="110" :btn_hight="40" :title="forget" :ClickPromise="handleForget" />
        </a-col>
    </a-form-item>

</a-form>
</template>

<script>
import Mybtn from "../../components/Mybtn.vue";
export default {
    data() {
        return {
            loginbtn: "登陆",
            regbtn: "注册",
            forget: "忘记密码",
            checkboxDisabled: true,
            visible: false,
        };
    },
    components: {
        Mybtn,
    },
    beforeCreate() {
        this.form = this.$form.createForm(this, {
            name: "normal_login",
        });
    },

    methods: {
        handleSubmit() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    // let params = {
                    //   username: "ascotbe",
                    //   passwd: "1111",
                    // };
                    let params = {
                        username: values.userName,
                        passwd: values.password,
                    };
                    this.$api.login(params).then((res) => {
                        console.log(res);
                        switch (res.code) {
                            case 200:
                                this.$message.success("登录成功,正在获取用户信息");
                                this.$store.commit("tokenLogin", res.message);
                                let token = {
                                    token: res.message,
                                };
                                console.log("1");
                                this.$api.user_info(token).then((res) => {
                                    // 404：搁着闹呢？
                                    // 200：返回个人用户详细信息
                                    // 500：请使用Post请求
                                    switch (res.code) {
                                        case 200:
                                            console.log(res);
                                            this.$message.success("欢迎" + res.message.show_name);
                                            let userinfo = {
                                                email: res.message.email,
                                                name: res.message.name,
                                                show_name: res.message.show_name,
                                                key: res.message.key,
                                            };
                                            this.$store.commit("userinfo", userinfo);
                                            let avatar = res.message.avatar;
                                            this.$store.commit("avatar", avatar);
                                            this.$router.push("/layout");
                                            break;
                                        case 404:
                                            this.$message.error("搁着闹呢？");
                                            break;
                                        case 500:
                                            this.$message.error("请使用Post请求");
                                            break;
                                    }
                                    console.log(res);
                                });

                                break;
                            case 500:
                                this.$message.error("请使用post请求");
                                break;
                            case 604:
                                this.$message.error("账号密码错误");
                                break;
                        }
                    });
                }
            });
        },
        handleForget() {
            this.$router.push("/Forget");
            // let newdate = Math.round(new Date().getTime() / 1000);
            // const thirtyDays = 2592000;
            // let thirtyDaysdate = newdate - thirtyDays;
            // let params = {
            //     token: localStorage.getItem("storeToken"),
            //     start_time: "1594087497",
            //     end_time: "1604087497",
            // };
            // console.log(params);
            // this.$api.homepage_data(params).then((res) => {
            //     console.log(res);
            // });
            // // let params = {
            // //   token: localStorage.getItem("storeToken"),
            // // };
            // // console.log(params);
            // // this.$api.user_info(params).then((res) => {
            // //   console.log(res);
            // // });
        },

        handleOk() {
            this.form.setFieldsValue({
                remember: true,
            });
            this.visible = false;
        },
        handleCancel() {
            this.form.setFieldsValue({
                remember: false,
            });
            this.checkboxDisabled = true;
            this.visible = false;
        },
        handleConfirm(rule, value, callback) {
            //验证条款效验

            if (value) {
                callback();
            }
            callback("请认真阅读并同意Medusa服务条款");
        },
        handleLogin() {
            this.$refs.form.onSubmit();
            // this.$router.push('/layout');
        },
        handleRegister() {
            this.$router.push("/register");
        },
    },
};
</script>

<style lang="scss" scoped>
#components-form-demo-normal-login .login-form {
    max-width: 300px;
}

.login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
}

.col_mybtn {
    text-align: center;
}

#components-form-demo-normal-login .login-form-forgot {
    float: right;
}

#components-form-demo-normal-login .login-form-button {
    width: 110px;
    height: 40px;
    margin-left: 8px;
    position: relative;
    line-height: 40px;
}
</style>
