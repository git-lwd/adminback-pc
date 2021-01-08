<template>
  <div>
    <el-row type="flex" align="center" justify="space-around">
      <el-col :span="5" v-for="item in cardList" :key="item.text">
        <el-card> 
          <div>{{item.text}}</div>
          <div>{{item.count}}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardList: [
        {
          text: "当前用户数：",
          count: 100,
        },
        {
          text: "当前帖子数：",
          count: 1000,
        },
        {
          text: "当前点赞数：",
          count: 10000,
        },
        {
          text: "当前评论数：",
          count: 9554,
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>

<style>
</style>