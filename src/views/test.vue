<template>
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit="handleSubmit"
    ref="f"
  >
    <a-row
      :gutter="[
        { xs: 8, sm: 16, md: 24, xs: 8 },
        { xs: 4, sm: 6, md: 8, lg: 10 },
      ]"
    >
      <a-col :xs="{ span: 24 }" :lg="{ span: 24 }">
        <img width="100%" height="100%" src="./cover.png"
      /></a-col>
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
        ><a
          @click="
            () => {
              this.visible = true;
            }
          "
        >
          请认真阅读并同意Medusa服务条款</a
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
          :ClickPromise="Register"
        />
      </a-col>
      <a-col :xs="{ span: 24 }" :md="{ span: 8 }" class="col_mybtn">
        <Mybtn
          :title="regbtn"
          :btn_width="110"
          :btn_hight="40"
          :ClickPromise="Register"
        />
      </a-col>
      <a-col :xs="{ span: 24 }" :md="{ span: 8 }" class="col_mybtn">
        <Mybtn :btn_width="110" :btn_hight="40" />
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
      //   onValuesChange:(props,values)=>{
      //       console.log(values)
      //   }
    });
  },
  methods: {
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          //   if (!values.remember) {
          //     alert("请认真阅读并同意Medusa服务条款");
          //   } else {
          //     console.log(values);
          //   }
          console.log(values);
        }
      });
    },
    handleOk() {
        console.log(this.form.setFieldsValue)
        this.form.setFieldsValue((checked)=>{
            console.log(checked)
        })
      this.visible = false;
    },
    handleCancel() {
      this.checkboxDisabled = true;
      this.visible = false;
    },
    handleConfirm(rule, value, callback) {
      //验证条款效验
      console.log(value);
      if (value) {
        callback();
      }
      callback("请认真阅读并同意Medusa服务条款");
    },
    Register() {
      this.$refs.f.onSubmit();
      console.log(this.$refs.f);
      // this.$router.push('/layout');
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
