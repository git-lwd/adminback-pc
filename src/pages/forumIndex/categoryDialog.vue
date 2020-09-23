<template>
  <el-dialog
    :visible.sync="visibleDialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="handleClose"
    width="600px"
    :title="dialogTitle"
  >
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="分类名称" prop="name">
        <el-col :span="10">
          <el-input v-model="form.name" maxlength="50" clearable placeholder="请输入"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="分类图片" required>
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
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="formSubmit">确 定</el-button>
      <el-button @click="handleClose">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "categoryDialog",
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    itemInfo: null,
  },
  data() {
    return {
      dialogTitle: "新增分类",
      visibleDialog: false,
      form: {
        name: "",
        pic: "",
      },
      uploadAction: process.env.VUE_APP_API_HOST + "open/upload",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("userToken"),
      },
      rules: {
        name: [{ required: true, message: "请输入分类名", trigger: "blur" }],
        pic: [{ required: true, message: "请选择图片", trigger: "blur" }],
      },
    };
  },
  watch: {
    showDialog(val) {
      this.visibleDialog = val;
    },
    itemInfo(val) {
      console.log(val);
      if (val) {
        this.dialogTitle = "修改分类";
        this.form = {
          id: val.id,
          name: val.name,
          pic: val.pic,
        };
      }
    },
  },
  methods: {
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.form.pic = process.env.VUE_APP_IMG_HOST + res.path;
      } else {
        this.$message.error("上传失败");
      }
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
      this.form = {
        name: "",
        password: "",
      };
      this.$refs.ruleForm.resetFields();
      this.$emit("closeDialog");
    },
    formSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let url = this.form.id
            ? this.$APIURL.updateCategory
            : this.$APIURL.createCategory;
          this.$axios({
            method: "post",
            url,
            data: this.$qs.stringify(this.form),
          }).then((res) => {
            if (res.data.code == 0) {
              this.$message.success("保存成功");
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