<template>
<windows98 :task="task">
      <a-row class="forget" :class="forgetSize">
      <a-col :xs="xs" :sm="sm" class="forget_nav" :class="forgetNavSize">
        <div class="window" :class="windowSize">
          <div class="title-bar">
            <div class="title-bar-text">忘记密码</div>
            <div class="title-bar-controls">
              <button aria-label="Minimize" @click="handelMinimize"></button>
              <button aria-label="Maximize" @click="handelMaximize"></button>
              <button aria-label="Close" @click="handelClose"></button>
            </div>
          </div>
          <div class="window-body">
            <div class="field-row">
              <label for="text17" class="label">key:</label>
              <input id="text17" type="text" class="input" v-model="form.key" />
              <label for="text17" class="label labelEnd">{{ keyLabel }}</label>
            </div>
            <div class="field-row">
              <label for="text17" class="label">E-mail:</label>
              <input
                id="text17"
                type="text"
                class="input"
                v-model="form.email"
                v-on:input="handelChangeEmail"
              />
              <label for="text17" class="label labelEnd">{{ EmailLabel }}</label>
            </div>
            <div class="field-row">
              <label for="text17" class="label">New Password:</label>
              <input
                id="text17"
                type="password"
                class="input"
                v-model="form.new_passwd"
              />
              <label for="text17" class="label labelEnd">{{ passwdLabel }}</label>
            </div>
            <div class="field-row">
              <label for="text17" class="label">Username:</label>
              <input id="text17" type="text" class="input" v-model="form.name" />
              <label for="text17" class="label labelEnd">{{ usernameLabel }}</label>
            </div>
            <div class="field-row">
              <label for="text17" class="label">验证码:</label>
              <input
                id="text17"
                type="text"
                class="input"
                v-model="form.verificationCode"
              />
              <img
                width="100%"
                height="40px"
                :src="imgFilePath"
                @click="handleCAPTCHA"
                class="label labelEnd img"
              />
            </div>
            <div class="field-row">
              <button class="forgetBtn" @click="handelForget">修改密码</button>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
</windows98>
<!--
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
-->
</template>

<script>
import windows98 from "../../components/windows98";
export default {
    name: "Forget",
      components: {
    windows98,
  },
    data() {
        return {
            task:"Forget Password",
             xs: { span: 24, offset: 0 },
      sm: { span: 12, offset: 6 },
      form: {
        key: "",
        email: "",
        new_passwd: "",
        name: "",
        verificationCode: "",
      },
      keyLabel: "请输入您的Key",
      usernameLabel: "请输入您的用户名",
      EmailLabel: "",
      passwdLabel: "请输入您的新密码",
      forgetSize: "forgetMini",
      forgetNavSize: "forgetNavMini",
      windowSize: "windowMini",
      imgFilePath: "",
        };
    },
    mounted() {
    this.handleCAPTCHA();
  },
  methods: {
    handelChangeEmail() {
      let ruleEmail = /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
      if (this.form.email != "") {
        if (ruleEmail.test(this.form.email)) {
          this.EmailLabel = "邮箱格式正确";
        } else {
          this.EmailLabel = "邮箱格式错误";
        }
      } else {
        this.EmailLabel = "邮箱不能为空";
      }
    },
    handelMinimize() {
      this.forgetSize = "forgetMini";
      this.forgetNavSize = "forgetNavMini";
      this.windowSize = "windowMini";
      this.sm = { span: 12, offset: 6 };
    },
    handelMaximize() {
      this.forgetSize = "forgetMax";
      this.forgetNavSize = "forgetNavMax";
      this.windowSize = "windowMax";
      this.sm = { span: 24, offset: 0 };
    },
    handelClose() {
      this.$router.push("/");
    },
    async handleCAPTCHA() {
      //获取验证码.
      this.imgFilePath = await this.$qj.QJGETCAPTCHA();
    },
    handelForget() {
      let form = this.form;
      if (
        form.verificationCode != "" &&
        form.key != "" &&
        form.email != "" &&
        form.new_passwd != "" &&
        form.name != "" 
      ) {
        let params = {
          key: form.key,
          name: form.name,
          new_passwd: form.new_passwd,
          email: form.email,
          verification_code_key: this.$store.state.verificationcodekey,
          verification_code: form.verificationCode,
        };
        this.$api.forget_password(params).then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success("密码修改成功");
            this.$router.push("/");
          } else if (res.code == 503) {
            this.$message.error("验证码错误");
            this.handleCAPTCHA();
          } else {
            this.$message.error("服务器卡住了，请稍后再试");
            this.handleCAPTCHA();
          }
        });
      } else {
        this.$message.warning("请填写完整");
      }
    },
  },
};
</script>
<style src="../../../node_modules/98.css/dist/98.css" scoped></style>
<style lang="scss" scoped>
.forget {
  height: 100%;
  // display: flex;

  .forget_nav {
    min-width: 320px;
    // position: absolute;
    z-index: 15;
    // transition: all 1s;
    // height: 100%;
    // align-self: center;
    .window {
      .title-bar {
        width: 100%;
        align-self: flex-start;
      }
      .window-body {
        width: 100%;
        margin: 0;
        .field-row {
          margin: 15px auto 15px auto;
          width: 80%;
          min-width: 300px;
          .label {
            font-size: 22px;
            width: 25%;
            min-width: 95px;
            max-width: 190px;
          }
          .labelEnd {
            font-size: 12px;
            max-width: 100px;
            // color: rgb(0, 255, 0);
          }
          .img {
            cursor: pointer;
          }
          .input {
            font-size: 18px;
            height: 25px;
            width: 75%;
            min-width: 110px;
          }
          .forgetBtn {
            margin: 0 auto;
          }
        }
      }
    }
  }
}
.forgetMax {
  display: flex;
  .forgetNavMax {
    height: 100%;
    // align-self: center;
    .windowMax {
      height: 100%;
      display: -webkit-flex; /* Safari */
      display: flex;
      // flex-direction:column;
      align-items: flex-start;
      // justify-content: center; // 垂直居中
      flex-wrap: wrap;
    }
  }
}
.forgetMini {
  display: flex;
  .forgetNavMini {
    // height: 410px;
    align-self: center;
    .windowMini {
    }
  }
}
</style>
