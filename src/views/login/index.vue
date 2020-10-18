<template>
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit="handleSubmit"
    ref="form"
  >
    <a-row
      :gutter="[
        { xs: 8, sm: 16, md: 24, xs: 8 },
        { xs: 4, sm: 6, md: 8, lg: 10 },
      ]"
    >
      <a-col :xs="{ span: 24 }" :lg="{ span: 24 }">
        <img width="100%" height="100%" src="./cover.png" />
      </a-col>
    </a-row>
    <a-form-item>
      <a-input
        v-decorator="[
          'userName',
          {
            rules: [{ required: true, message: 'Please input your username!' }],
          },
        ]"
        placeholder="Username"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          {
            rules: [{ required: true, message: 'Please input your Password!' }],
          },
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-checkbox
        :disabled="checkboxDisabled"
        v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: false,
            rules: [{ validator: handleConfirm }],
          },
        ]"
      >
        <a
          @click="
            () => {
              this.visible = true;
            }
          "
          >请认真阅读并同意Medusa服务条款</a
        >
      </a-checkbox>
      <a-modal
        title="Medusa服务条款"
        :visible="visible"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <p>ycjnb</p>
      </a-modal>
    </a-form-item>

    <a-form-item>
      <a-col :xs="{ span: 24 }" :md="{ span: 8 }" class="col_mybtn">
        <Mybtn
          :title="loginbtn"
          :btn_width="110"
          :btn_hight="40"
          :ClickPromise="handleLogin"
        />
      </a-col>
      <a-col :xs="{ span: 24 }" :md="{ span: 8 }" class="col_mybtn">
        <Mybtn
          :title="regbtn"
          :btn_width="110"
          :btn_hight="40"
          :ClickPromise="handleRegister"
        />
      </a-col>
      <a-col :xs="{ span: 24 }" :md="{ span: 8 }" class="col_mybtn">
        <Mybtn
          :btn_width="110"
          :btn_hight="40"
          :title="TTT"
          :ClickPromise="handleTest"
        />
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
      TTT: "test",
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
                      this.$message.success("欢迎" + res.message.show_name);
                      let userinfo = {
                        email: res.message.email,
                        img_path: res.message.img_path,
                        name: res.message.name,
                        show_name: res.message.show_name,
                        key: res.message.key,
                      };
                      this.$store.commit("userinfo", userinfo);
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
    handleTest() {
      
      let newdate = Math.round(new Date().getTime()/1000)
      const thirtyDays = 2592000
      let thirtyDaysdate = newdate - thirtyDays
      let params = {
        token : localStorage.getItem("storeToken"),
        start_time : "1594087497",
        end_time : "1604087497"
      }
      console.log(params)
      this.$api.homepage_data(params).then((res)=>{
          console.log(res)
      })
      // let params = {
      //   token: localStorage.getItem("storeToken"),
      // };
      // console.log(params);
      // this.$api.user_info(params).then((res) => {
      //   console.log(res);
      // });
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
