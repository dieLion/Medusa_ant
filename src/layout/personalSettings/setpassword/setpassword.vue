<template>
<a-form :form="form">
    <a-form-item label="旧密码">
        <a-input v-decorator="[
          'old_pw',
          {
            rules: [
              {
                required: true,
                message: '请输入旧密码!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]" type="password" />
    </a-form-item>
    <a-form-item label="新密码" has-feedback>
        <a-input v-decorator="[
          'new_pw',
          {
            rules: [
              {
                required: true,
                message: '请输入新密码!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]" type="password" />
    </a-form-item>
    <a-form-item label="在输入一次新密码" has-feedback>
        <a-input v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: '在输入一次新密码!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]" type="password" @blur="handleConfirmBlur" />
    </a-form-item>
</a-form>
</template>

<script>
export default {
    name: "setpassword",
    data() {
        return {
            confirmDirty: false,
        };
    },
    beforeCreate() {
        this.form = this.$form.createForm(this, {
            name: "setPW"
        });
    },
    methods: {
        validateToNextPassword(rule, value, callback) {
            const form = this.form;
            if (value && this.confirmDirty) {
                form.validateFields(["confirm"], {
                    force: true
                });
            }
            callback();
        },
        handleConfirmBlur(e) {
            const value = e.target.value;
            this.confirmDirty = this.confirmDirty || !!value;
        },
        compareToFirstPassword(rule, value, callback) {
            const form = this.form;
            if (value && value !== form.getFieldValue("new_pw")) {
                callback("Two passwords that you enter is inconsistent!");
            } else {
                callback();
            }
        },
        handleReturnPW() {
            //       "username": "ascotbe",
            // "old_passwd": "Soryu Asuka Langley",
            // "new_passwd": "XXXXXXXXXXXXXXXXXXX"
            if (
                this.form.getFieldsValue().new_pw == this.form.getFieldsValue().confirm && this.form.getFieldsValue().old_pw != undefined
            ) {
                let data = {
                    username: this.$store.state.userinfo.name,
                    old_passwd: this.form.getFieldsValue().old_pw,
                    new_passwd: this.form.getFieldsValue().new_pw,
                };
                return data;
            }
            this.$message.success("请检查输入参数或者确定两次新密码一致");
            return null;
        },
    },
};
</script>

<style>
</style>
