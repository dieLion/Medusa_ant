<template>
  <div class="personalSettings">
    <div class="ant-col-14">
      <div class="profile-left ant-col-24">
        <a-col class="profile-info ant-col-16" :push="4">
          <a-avatar
            shape="square"
            class="profile-avatar"
            icon="user"
            :src="title"
          />

          <div class="profile-name">omVDSwouVNvoFGnLDtyTikLarqbM</div>
          <div class="profile-email">None</div>
          <a-col class="profile-operation ant-col-12" :push="5">
            <button type="button" class="ant-btn profile-operate ant-btn-primary">
              <span>修改密码</span>
            </button>

            <button type="button" class="ant-btn profile-operate">
              <span>修改头像</span>
            </button>
          </a-col>
          <a-col class="profile-deadline ant-col-24">
            <p>
              {{time}}
            </p>
          </a-col>
        </a-col>
      </div>
    </div>
    <div class="ant-col-10">
      <div class="profile-main">
        <a-col class="profile ant-col-24">
          <a-icon type="form" style="height: 40px;width:40px;fontSize:0.15rem;lineHeight:47px;  " />Profile
        </a-col>
        <a-col
          class="personalInformationList ant-col-24"
          v-for="(item) in personalInformationList"
          :key="item.title"
        ><span class="ant-col-8">
          <a-icon :type="item.type" style="fontSize=0.1rem"/>
          {{item.title}}:</span><span class="ant-col-12">{{item.nav}}</span>
        </a-col>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "personalSettings",
  data() {
    return {
      time: this.newtime(),
      title: require('../../assets/avatar.png'),
      personalInformationList: [
        {
          title: "Username",
          type: "user",
          nav:"ycj牛逼"
        },
        {
          title: "Nickname",
          type: "heart",
          nav:"ycj牛逼"
        },
        {
          title: "Email",
          type: "mail",
          nav:"ycj牛逼"
        },
        {
          title: "Mobile",
          type: "mobile",
          nav:"ycj牛逼"
        },
        {
          title: "Verification",
          type: "unlock",
          nav:"ycj牛逼"
        },
        {
          title: "Identifier",
          type: "rocket",
          nav:"ycj牛逼"
        },
        {
          title: "API Token",
          type: "key",
          nav:"ycj牛逼"
        },
        {
          title: "DNS Rebinding",
          type: "hourglass",
          nav:"ycj牛逼"
        },
      ],
    };
  },
  mounted() {
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
      this.time ="Last Login (UTC+0):" +
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
        seconds
    },
  },
};
</script>
<style lang="scss" scoped>
.personalSettings{
}
.ant-btn{
  font-size: 0.07rem;
}
.profile-left,
.profile-right {
  padding: 5px 0;
  .profile-info {
    padding: 0.22rem;
    height: 2.6rem;
    margin: 0 auto;
    background: #fff;
    text-align: center;
    .profile-avatar {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      overflow: hidden;
      border: 0;
      font-size: 0;
    }
    .profile-name {
      font-size: 0.12rem;
      line-height: 1.5;
      font-weight: 700;
      color: #000;
    }
    .profile-email {
      font-size: 0.07rem;
      color: #888;
    }
    .profile-operation {
      margin: 30px 24px;
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
    font-size: 0.15rem;
    line-height: 40px;
  }
  .personalInformationList {
    height: 20px;
    width: 100%;
    font-size: 0.1rem;
    line-height: 20px;
    margin-top: 20px;
    line-height: unset;
  }
}
</style>
