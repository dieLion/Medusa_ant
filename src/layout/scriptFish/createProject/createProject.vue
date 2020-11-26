<template>
  <div class="createProject">
    <a-row
      :gutter="[
        { xs: 8, sm: 16, md: 24, xs: 8 },
        { xs: 8, sm: 16, md: 24, lg: 32 },
      ]"
    >
      <a-col
        :xs="{ span: 24 }"
        :lg="{ span: 12 }"
        :xl="{ span: 12 }"
        :xxl="{ span: 12 }"
      >
        <a-col :xs="{ span: 24 }" class="read">
          <a-list
            item-layout="horizontal"
            :data-source="ScriptTemplate"
            :column="[24]"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta>
                <span
                  slot="title"
                  class="read_font"
                  @click="handleSet(item.template_data)"
                  >{{ item.template_name }}</span
                >
                <myicon type="icon-js" slot="avatar" class="icon" />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-col>
      </a-col>
      <a-col
        :xs="{ span: 24 }"
        :lg="{ span: 12 }"
        :xl="{ span: 12 }"
        :xxl="{ span: 12 }"
      >
        <a-col :xs="{ span: 24 }" class="ruleForm">
          <a-col :xs="{ span: 24 }"> 填写项目基本信息 </a-col>
          <a-form-model
            :model="form"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            :rules="rules"
            ref="ruleForm"
          >
            <a-form-model-item label="项目名" prop="projectName">
              <a-input v-model="form.projectName" />
            </a-form-model-item>
            <a-form-model-item label="默认模板选择" prop="default">
              <a-select
                :options="DefaultScriptTemplate"
                placeholder="选择搜索字段"
                @dropdownVisibleChange="handleDropdownVisibleChange"
                @change="handleChange"
              >
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="脚本数据" prop="script_data">
              <a-input
                v-model="form.script_data"
                type="textarea"
                :auto-size="{ minRows: 10 }"
                ref="textarea"
              />
            </a-form-model-item>

            <a-form-model-item :wrapper-col="{ span: 10, offset: 6 }">
              <a-button
                type="primary"
                @click="handleSetDefault"
                style="margin-right: 10px"
              >
                插入模板
              </a-button>
              <a-button type="primary" @click="handleOnSubmit">
                创建项目
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-col>
      </a-col>
    </a-row>
  </div>
</template>

<script>
let Base64 = require("js-base64").Base64;
import { Icon } from "ant-design-vue";
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1734998_apjce2fwnsu.js",
});
export default {
  components: {
    myicon: MyIcon,
  },
  data() {
    return {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
      form: {
        projectName: "",
        script_data: "",
      },
      rules: {
        projectName: [
          {
            required: true,
            message: "项目名",
            whitespace: true,
          },
        ],
        script_data: [
          {
            required: true,
            message: "脚本数据",
            whitespace: true,
          },
        ],
      },
      ScriptTemplate: ["无模板"],
      DefaultScriptTemplate: [],
      val: "",
      defaultVal: "",
    };
  },
  mounted() {
    this.handleReadScriptTemplate();
    // this.handleReadDefaultScriptTemplate();
  },
  methods: {
    handleReadScriptTemplate() {
      let params = {
        token: localStorage.getItem("storeToken"),
      };
      this.$api.read_script_template(params).then((res) => {
        console.log(res);
        switch (res.code) {
          case 200:
            let list = [];
            res.message.map((item) => {
              item.template_data = this.handleBase64Decode(item.template_data);
              item.creation_time = this.FnUnixTimes(item.creation_time);
              item.update_time = this.FnUnixTimes(item.update_time);
              list.push(item);
            });
            this.ScriptTemplate = list;
            console.log(this.ScriptTemplate);
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
    handleOnSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let form = this.form;
          let params = {
            project_name: form.projectName,
            javascript_data: this.handleBase64Encode(form.script_data),
            token: localStorage.getItem("storeToken"),
          };

          this.$api.create_script_project(params).then((res) => {
            switch (res.code) {
              case 200:
                this.$message.success(res.message);
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
        } else {
          this.$message.error("请填写内容");
          return false;
        }
      });
    },
    //UNix时间转换正常时间并格式化YYYY-MM-DD格式时间
    FnUnixTimes(e) {
      let unixTimestamp = new Date(e * 1000);
      let Y = unixTimestamp.getFullYear() + "-";
      let M =
        (unixTimestamp.getMonth() + 1 < 10
          ? "0" + (unixTimestamp.getMonth() + 1)
          : unixTimestamp.getMonth() + 1) + "-";
      let D =
        unixTimestamp.getDate() + 1 < 10
          ? "0" + unixTimestamp.getDate()
          : unixTimestamp.getDate();
      let h = unixTimestamp.getHours() + ":";
      let m = unixTimestamp.getMinutes() + ":";
      let s = unixTimestamp.getSeconds();
      let Time = Y + M + D + h + m + s;
      return Time;
    },
    handleBase64Encode(val) {
      return Base64.encode(val);
    },
    handleBase64Decode(val) {
      return Base64.decode(val);
    },
    handleChange(val) {
      console.log(val);
      this.defaultVal = val;
    },
    handleDropdownVisibleChange(open) {
      let params = {
        token: localStorage.getItem("storeToken"),
      };
      this.$api.read_default_script_template(params).then((res) => {
        switch (res.code) {
          case 200:
            let list = [];
            this.DefaultScriptTemplate = [];
            let options = {};
            res.message.map((item) => {
              options = {
                value: this.handleBase64Decode(item.file_data),
                label: item.file_name,
              };

              this.DefaultScriptTemplate.push(options);
              item.file_data = this.handleBase64Decode(item.file_data);
              list.push(item);
            });
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
    handleSetDefault() {
      let form = this.form;

      var tc = this.$refs.textarea;
      console.log(tc.$el.selectionStart);
      var tclen = form.script_data.length;
      tc.focus();
      if (typeof document.selection != "undefined") {
      } else {
        form.script_data =
          form.script_data.substr(0, tc.$el.selectionStart) +
          this.defaultVal +
          form.script_data.substring(tc.$el.selectionStart, tclen);
      }
    },
    handleSet(e) {
      this.val = e;
      let form = this.form;

      var tc = this.$refs.textarea;
      console.log(tc.$el.selectionStart);
      var tclen = form.script_data.length;
      tc.focus();
      if (typeof document.selection != "undefined") {
      } else {
        form.script_data =
          form.script_data.substr(0, tc.$el.selectionStart) +
          this.val +
          form.script_data.substring(tc.$el.selectionStart, tclen);
      }
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
    background: #fff;
    border: 1px solid #ccc;
    font-size: 18px;
    min-height: 700px;
    max-height: 800px;
    .btn {
      display: -webkit-flex; /* Safari */
      display: flex;
      justify-content: space-around;
    }
  }

  .read::after {
  }
}
</style>
