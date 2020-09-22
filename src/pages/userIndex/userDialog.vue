<template>
  <el-dialog
    :visible.sync="visibleDialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="handleClose"
    width="600px"
    title="修改用户信息"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="手机号" prop="phone">
        <el-col :span="10">
          <el-input
            v-model="form.phone"
            maxlength="11"
            clearable
            placeholder="请输入"
            onkeyup="value=value.replace(/[^\d]/g,'')"
            onblur="value=value.replace(/[^\d]/g,'')"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="头像" required>
        <el-upload
          class="avatar-uploader"
          :action="uploadAction"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :headers="headers"
        >
          <img v-if="form.pic" :src="form.pic" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-col :span="10">
          <el-input v-model="form.age" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日">
        <el-col :span="10">
          <el-input v-model="form.birthday" clearable></el-input>
        </el-col>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitUser">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "userDialog",
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visibleDialog: false,
      form: {
        phone: "",
        pic: "",
        age: "",
        gender: 0,
        birthday: "",
      },
      uploadAction: process.env.VUE_APP_API_HOST + "upload",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("userToken"),
      },
      rules: {
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        pic: [{ required: true, message: "请选择头像", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
      },
    };
  },
  watch: {
    showDialog(val) {
      this.visibleDialog = val;
    },
  },
  methods: {
    handleAvatarSuccess(res) {
      this.form.pic = res.path;
    },
    beforeAvatarUpload(file) {
      // 判断图片的类型
      const isJpg =
        file.type == "image/jpeg" ||
        file.type == "image/jpg" ||
        file.type == "image/png" ||
        file.type == "image/gif";
      if (!isJpg) {
        this.$message.error("只能上传jpg, jpeg, png, gif格式的图片！");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJpg && isLt2M;
    },
    handleClose() {
      this.$emit("closeDialog");
    },
    submitUser() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$axios({
            method: "post",
            url: this.$APIURL.updateUser,
            data: this.$qs.stringify(this.form),
          }).then((res) => {
            if (res.data.code == 0) {
              this.$message.success("修改成功");
              this.handleClose();
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
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>