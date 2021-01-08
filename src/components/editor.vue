<template>
  <div ref="editor"></div>
</template>

<script>
import E from "wangeditor";
export default {
  name: "editor",
  data() {
    return {
      editor: null,
      info: "",
    };
  },
  props: {
    value: {
      default: "",
    },
  },
  watch: {
    value(val) {
      this.editor.txt.html(val);
    },
  },
  created() {
    this.$nextTick(() => {
      this.init();
    });
  },

  methods: {
    init() {
      this.editor = new E(this.$refs.editor);
      // editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
      // 配置服务器端地址
      this.editor.customConfig = {
        uploadImgServer: process.env.VUE_APP_API_HOST + "/open/ue/upload",
        uploadFileName: "files",
      };
      this.editor.customConfig.uploadImgHeaders = {}; // 自定义 header
      this.editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024; // 将图片大小限制为 10M
      this.editor.customConfig.uploadImgMaxLength = 50; // 限制一次最多上传 50 张图片
      this.editor.customConfig.uploadImgTimeout = 10000; // 设置超时时间
      this.editor.customConfig.onchange = (html) => {
        this.info = html; // 绑定当前逐渐地值
        this.$emit("ueChange", this.info); // 将内容同步到父组件中
      };
      this.editor.create();
      this.editor.txt.html(this.value);
    },
  },
};
</script>

<style scoped>
/deep/.w-e-text-container {
  height: 500px !important;
}
</style>