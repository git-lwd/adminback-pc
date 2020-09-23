<template>
  <div class="login-bg">
    <div class="login-content">
      <el-card>
        <div class="login-title">
          <el-image class="login-logo" :src="logo" fit="cover"></el-image>
          <h3 class="ml-10">欢迎登录数据管理后台</h3>
        </div>
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="70px" :hide-required-asterisk="false">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name" placeholder="请输入用户名" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入密码" type="password" clearable></el-input>
          </el-form-item>
          <el-row class="login-footer">
            <el-button type="primary" @click="login">确认登录</el-button>
            <el-button type="danger">前往注册</el-button>
          </el-row>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: require("../../assets/logo.png"),
      form: {
        name: "",
        password: "",
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$axios({
            method: "post",
            url: this.$APIURL.userLogin,
            data: this.$qs.stringify(this.form),
          }).then((res) => {
            if (res.data.code == 0) {
              let data = res.data.data;
              this.$store.commit("setUserInfo", data);
              sessionStorage.setItem("userToken",data.token)
              this.$message.success("登录成功");
              this.$router.push({ name: "Home" });
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.login-bg {
  width: 100%;
  height: 100vh;
  background: #545c64;
  background-size: 100% 100%;
}
.login-title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}
.login-content {
  width: 450px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login-footer {
  margin-top: 30px;
  text-align: center;
}
.login-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #f5f5f5;
}
.ml-10 {
  margin-left: 10px;
}
</style>