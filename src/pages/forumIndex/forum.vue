<template>
  <div>
    <el-form>
      <el-form-item>
        <el-button type="primary" @click="openDialog('')">新增帖子</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" :border="true" :header-cell-style="headerCellStyle">
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <el-table-column prop="subtitle" label="副标题" align="center"  width="300px"></el-table-column>
      <el-table-column label="主图" align="center">
        <template slot-scope="scope">
          <el-image class="userImg" :src="scope.row.pic" fit="cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="作者" align="center"></el-table-column>
      <el-table-column prop="browse" label="浏览量" align="center"></el-table-column>
      <el-table-column prop="praise" label="点赞数" align="center"></el-table-column>
      <el-table-column prop="praise" label="分类" align="center"></el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">{{scope.row.createdAt | dataFormat}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="openDialog(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-center">
      <el-pagination
        @prev-click="prevClick"
        @next-click="nextClick"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="baseParams.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="baseParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <forumDialog :showDialog="showDialog" :itemInfo="itemInfo" @closeDialog="closeDialog"></forumDialog>
  </div>
</template>

<script>
import forumDialog from "./forumDialog";
export default {
  name: "forum",
  components: { forumDialog },
  data() {
    return {
      tableData: [],
      total: 0,
      baseParams: {
        page: 1,
        pageSize: 10,
      },
      showDialog: false,
      itemInfo: "",
    };
  },
  created() {
    this.findForum();
  },
  methods: {
    findForum() {
      let params = this.baseParams;
      this.$axios.get(this.$APIURL.findForum, { params }).then((res) => {
        let data = res.data.data;
        this.tableData = data.rows;
        this.total = data.count;
      });
    },

    openDialog(obj) {
      if (obj) {
        this.itemInfo = obj;
      }
      this.showDialog = true;
    },

    handleDel(id) {
      this.$confirm("是否删除帖子?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .delete(this.$APIURL.deleteCategory, { params: { id } })
            .then((res) => {
              if (res.data.code == 0) {
                this.$message.success("删除成功");
                this.findForum();
              } else {
                this.$message.error(res.data.message);
              }
            });
        })
        .catch(() => {});
    },

    closeDialog() {
      this.showDialog = false;
      this.itemInfo = "";
      this.findForum();
    },
    prevClick(currentPage) {
      this.baseParams.page = currentPage;
      this.findForum();
    },
    nextClick(currentPage) {
      this.baseParams.page = currentPage;
      this.findForum();
    },
    currentChange(currentPage) {
      this.baseParams.page = currentPage;
      this.findForum();
    },
    sizeChange(size) {
      this.baseParams.pageSize = size;
      this.findForum();
    },
    headerCellStyle() {
      let style = { background: "#fafafa" };
      return style;
    },
  },
};
</script>

<style>
.page-center {
  margin-top: 20px;
  text-align: center;
}
.userImg {
  width: 60px;
  height: 60px;
}
</style>