<template>
  <div>
    <el-table :data="tableData" :border="true" :header-cell-style="headerCellStyle">
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column label="头像" align="center">
        <template slot-scope="scope">
          <el-image class="userImg" :src="scope.row.pic" fit="cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
      <el-table-column prop="age" label="年龄" align="center"></el-table-column>
      <el-table-column prop="gender" label="性别" align="center">
        <template slot-scope="scope">{{scope.row.gender==0?'女':'男'}}</template>
      </el-table-column>
      <el-table-column prop="birthday" label="生日" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="updateUser(scope.$index,scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteUser(scope.row.id)">删除</el-button>
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
    <userDialog :showDialog="showDialog" :itemInfo="itemInfo" @closeDialog="closeDialog"></userDialog>
  </div>
</template>

<script>
import userDialog from "./userDialog";
export default {
  name: "user",
  components: { userDialog },
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
    this.findAllUser();
  },
  methods: {
    findAllUser() {
      let params = this.baseParams;
      this.$axios.get(this.$APIURL.findAllUser, {params}).then((res) => {
        let data = res.data.data;
        this.tableData = data.rows;
        this.total = data.count;
      });
    },

    updateUser(index, obj) {
      console.log(obj)
      this.itemInfo = obj;
      this.showDialog = true;
    },

    deleteUser(id) {
      let user = this.$store.state.userInfo.user;
      this.$confirm("是否删除用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if(user.id == id){
          this.$message.error('不能删除当前登录的用户');
          return;
        }
        this.$axios.delete(this.$APIURL.deleteUser, {params:{id}}).then((res) => {
          if (res.data.code == 0) {
            this.$message.success("删除成功");
            this.findAllUser();
          } else {
            this.$message.error(res.data.message);
          }
        });
      }).catch(()=>{});
    },

    closeDialog() {
      this.showDialog = false;
      this.itemInfo = '';
      this.findAllUser();
    },
    prevClick(currentPage) {
      this.baseParams.page = currentPage;
      this.findAllUser();
    },
    nextClick(currentPage) {
      this.baseParams.page = currentPage;
      this.findAllUser();
    },
    currentChange(currentPage) {
      this.baseParams.page = currentPage;
      this.findAllUser();
    },
    sizeChange(size) {
      this.baseParams.pageSize = size;
      this.findAllUser();
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