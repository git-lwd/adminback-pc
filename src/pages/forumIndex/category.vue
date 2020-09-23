<template>
  <div>
    <el-form>
      <el-form-item>
        <el-button type="primary" @click="openDialog('')">新增分类</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" :border="true" :header-cell-style="headerCellStyle">
      <el-table-column prop="name" label="分类名" align="center"></el-table-column>
      <el-table-column label="分类图片" align="center">
        <template slot-scope="scope">
          <el-image class="userImg" :src="scope.row.pic" fit="cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="openDialog(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <categoryDialog :showDialog="showDialog" :itemInfo="itemInfo" @closeDialog="closeDialog"></categoryDialog>
  </div>
</template>

<script>
import categoryDialog from "./categoryDialog";
export default {
  name: "category",
  components: { categoryDialog },
  data() {
    return {
      tableData: [],
      showDialog: false,
      itemInfo: "",
    };
  },
  created() {
    this.findCategory();
  },
  methods: {
    findCategory() {
      this.$axios.get(this.$APIURL.findCategory, {}).then((res) => {
        this.tableData = res.data.data;
      });
    },

    openDialog(obj) {
      if (obj) {
        this.itemInfo = obj;
      }
      this.showDialog = true;
    },

    handleDel(id) {
      this.$confirm("是否删除分类?", "提示", {
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
                this.findCategory();
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
      this.findCategory();
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