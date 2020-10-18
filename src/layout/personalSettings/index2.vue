<template>
  <div class="personalSettings">
    <a-row :gutter="[16, 24]">
      <a-col class="profile-left" :xs="{ span: 24 }" :lg="{ span: 10 }">
        <a-col class="profile-info" :xs="{ span: 24 }" :lg="{ span: 24 }">
          <a-avatar
            shape="square"
            class="profile-avatar"
            icon="user"
            :src="title"
          />
          <div class="profile-name">{{ personalInformationList[0].nav }}</div>
          <div class="profile-email">{{ personalInformationList[2].nav }}</div>
          <a-col
            class="profile-operation"
            :xs="{ span: 14, offset: 5 }"
            :sm="{ span: 10, offset: 7 }"
            :md="{ span: 8, offset: 8 }"
            :lg="{ span: 14, offset: 5 }"
            :xl="{ span: 14, offset: 5 }"
            :xxl="{ span: 8, offset: 8 }"
          >
            <button
              type="button"
              class="ant-btn profile-operate ant-btn-primary"
              @click="
                () => {
                  this.show_pw = true;
                }
              "
            >
              <span>修改密码</span>
            </button>
            <a-modal
              title="修改密码"
              :visible="show_pw"
              @ok="handleSetPw"
              @cancel="handleNoSetPw"
            >
              <div>
                <setPW ref="getPW"></setPW>
              </div>
            </a-modal>

            <button type="button" class="ant-btn profile-operate">
              <span>修改头像</span>
            </button>
          </a-col>
          <a-col
            class="profile-deadline"
            :xs="{ span: 16, offset: 4 }"
            :lg="{ span: 16, offset: 4 }"
          >
            <p style="minwidth: 187px; minheight: 76px">{{ time }}</p>
          </a-col>
        </a-col>
      </a-col>
      <a-col class="profile-right" :xs="{ span: 24 }" :lg="{ span: 10 }">
        <div class="profile-main">
          <a-col class="profile" :xs="{ span: 24 }" :lg="{ span: 24 }">
            <a-icon
              type="form"
              style="
                height: 40px;
                width: 40px;
                fontsize: 0.15rem;
                lineheight: 47px;
              "
            />Profile
          </a-col>
          <a-col
            class="personalInformationList"
            :xs="{ span: 24 }"
            :lg="{ span: 24 }"
            v-for="item in personalInformationList"
            :key="item.title"
          >
            <span :xs="{ span: 16 }" :lg="{ span: 8 }">
              <a-icon :type="item.type" />
              {{ item.title }}:
            </span>
            <span :xs="{ span: 16 }" :lg="{ span: 12 }">{{ item.nav }}</span>
          </a-col>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import setPW from "./setpassword/setpassword";

export default {
  name: "personalSettings2",
  components: { setPW },
  data() {
    return {
      time: this.newtime(),
      title: require("../../assets/avatar.png"),
      personalInformationList: [
        {
          title: "Username",
          type: "user",
          nav: "",
        },
        {
          title: "Nickname",
          type: "heart",
          nav: "",
        },
        {
          title: "Email",
          type: "mail",
          nav: "",
        },
        {
          title: "Mobile",
          type: "mobile",
          nav: "",
        },
        {
          title: "Verification",
          type: "unlock",
          nav: "",
        },
        {
          title: "Identifier",
          type: "rocket",
          nav: "",
        },
        {
          title: "API Token",
          type: "key",
          nav: "",
        },
        {
          title: "DNS Rebinding",
          type: "hourglass",
          nav: "",
        },
      ],
      show_pw: false,
    };
  },
  mounted() {
    this.handleSetPersonalInformationList();
    setInterval(this.newtime, 1000);
  },
  methods: {
    newtime() {
      //标签内容
      var date = new Date();
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一 如 09:11:05
       * */
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      this.time =
        // "Last Login (UTC+0):" +
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
    },
    handleSetPersonalInformationList() {
      const config = require("../../../faceConfig");
      const imgURL = config.imgPath;

      if (this.$store.state.userinfo.name != undefined) {
        let userinfo = this.$store.state.userinfo;
        console.log("获取vuex" + userinfo);
        this.title = imgURL + userinfo.img_path;
        this.personalInformationList = [
          {
            title: "Username",
            type: "user",
            nav: userinfo.show_name,
          },
          {
            title: "Nickname",
            type: "heart",
            nav: userinfo.name,
          },
          {
            title: "Email",
            type: "mail",
            nav: userinfo.email,
          },
          {
            title: "key",
            type: "key",
            nav: userinfo.key,
          },
        ];
      } else {
        console.log("请求后台");
        let params = { token: this.$store.state.storeToken };
        this.$api.user_info(params).then((res) => {
          switch (res.code) {
            case 200:
              let user = res.message;
              this.title = imgURL + user.img_path;
              this.personalInformationList = [
                {
                  title: "Username",
                  type: "user",
                  nav: user.show_name,
                },
                {
                  title: "Nickname",
                  type: "heart",
                  nav: user.name,
                },
                {
                  title: "Email",
                  type: "mail",
                  nav: user.email,
                },
                {
                  title: "key",
                  type: "key",
                  nav: user.key,
                },
              ];
              let userinfo = {
                email: res.message.email,
                img_path: res.message.img_path,
                name: res.message.name,
                show_name: res.message.show_name,
                key: res.message.key,
              };
              this.$store.commit("userinfo", userinfo);
              break;
            case 404:
              console.log("您未登录，请重新登录");
              this.$message.error("您未登录，请重新登录");
              this.$router.push("/");
              break;
            case 500:
              console.log("请使用Post请求，请重新登录");
              this.$message.error("请使用Post请求，请重新登录");
              this.$router.push("/");
              break;
          }
        });
      }
    },
    handleSetPw() {
      let params = this.$refs.getPW.handleReturnPW();
      if (params != null) {
        this.$api.update_password(params).then((res) => {
          switch (res.code) {
            case 200:
              console.log("密码修改成功，请重新登录");
              this.$message.success("密码修改成功，请重新登录");
              localStorage.setItem("storeToken", "");
              this.$router.push("/");
              break;
            case 403:
              this.$message.error("输入信息有误");
              break;
            case 500:
              this.$message.error("请使用post请求");
              break;
          }
        });
      }
    },
    handleNoSetPw() {
      this.show_pw = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.personalSettings {
  width: 100%;
  height: 100%;
  background: #fff;
}

.ant-btn {
  font-size: 0.07rem;
}

.profile-left,
.profile-right {
  padding: 5px 0;

  .profile-info {
    padding: 0.22rem;
    margin: 0 auto;
    background: #fff;
    text-align: center;

    .profile-avatar {
      display: inline-block;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      border: 0;
      font-size: 0;
    }

    .profile-name {
      font-size: 20px;
      line-height: 1.5;
      font-weight: 700;
      color: #000;
    }

    .profile-email {
      font-size: 0.07rem;
      color: #888;
    }

    .profile-operation {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: justify;
      justify-content: space-between;
    }

    .profile-deadline {
      position: relative;
      margin-bottom: 30px;
      text-align: left;
    }

    .profile-deadline p {
      padding-bottom: 8px;
      height: 48px;
      line-height: 40px;
      border-bottom: 4px solid #9ca4bf;
    }
  }
}

.profile-main {
  padding: 0.12rem 0.12rem;

  .profile {
    height: 40px;
    width: 100%;
    border-left: 5px solid #1890ff;
    font-size: 24px;
    line-height: 40px;
  }

  .personalInformationList {
    height: 20px;
    width: 100%;
    font-size: 20px;
    line-height: 20px;
    margin-top: 20px;
    line-height: unset;
  }
}
</style>
