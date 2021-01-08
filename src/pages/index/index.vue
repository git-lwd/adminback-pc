<template>
  <div>
    <topHead></topHead>
    <div class="main-box">
      <div class="left-menu">
        <leftMenu></leftMenu>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import topHead from "@/components/header.vue";
import leftMenu from "@/components/left.vue";
export default {
  components: {
    topHead,
    leftMenu,
  },
};
</script>

<style lang="scss" scoped>
.main-box {
  height: calc(100vh - 61px);
  display: flex;
}
.left-menu {
  width: 170px;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
/deep/.el-menu {
  height: 100%;
  background: rgb(84, 92, 100);
}
.content {
  width: calc(100% - 165px);
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: scroll;
}
/deep/.el-menu-item {
  padding: 0 0 0 40px;
  width: 165px;
}
</style>