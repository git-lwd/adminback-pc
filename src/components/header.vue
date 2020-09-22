<template>
  <div class="header">
    <div class="title">我的工作台</div>
    <div class="userInfo">
      <el-image class="userImg" :src="user.pic" fit="cover"></el-image>
      <span class="userName">{{user.name}}</span>
      <div class="logout" @click="logout">退出登录</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
    };
  },
  created() {
    this.$nextTick(() => {
      this.user = this.$store.state.userInfo.user;
    });
  },
  methods: {
    logout() {
      this.$confirm("是否退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          sessionStorage.removeItem("store");
          sessionStorage.removeItem("userToken");
          this.$store.commit("setUserInfo", "");
          this.$router.push({
            name: "Login",
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  background: #545c64;
  color: #ffffff;
}
.title {
  font-size: 20px;
}
.userInfo {
  display: flex;
  align-items: center;
}
.userName {
  margin-left: 8px;
}
.userImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.logout {
  font-size: 14px;
  margin-left: 20px;
  cursor: pointer;
  color: #f5f5f5;
}
.logout:hover {
  color: #ffffff;
}
</style>