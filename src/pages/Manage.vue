<template>
  <div class="bgc">
    <Background />
  </div>
  <el-container>
    <el-header height="15%">
      <Nav></Nav>
    </el-header>
    <el-main>
      <el-table :data="list" border="true" v-loading="loading" max-height="600">
        <el-table-column prop="id" label="ID" sortable />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="create_time" label="创建时间" />
        <el-table-column prop="update_time" label="更新时间" />
        <el-table-column prop="identity" label="用户身份" />
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button
              style="margin-left: 11px"
              type="primary"
              @click="frozen(scope.row)"
              v-show="scope.row.status == 0"
              >冻结</el-button
            >
            <el-button
              type="warning"
              @click="unfrozen(scope.row)"
              v-show="scope.row.status == 1"
              >解冻</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer height="5%">
      <span style="font-family: Helvetica">Made by 以太链盟</span>
      <div class="beian">备案号：<a href="https://beian.miit.gov.cn" style="color: blue;" >备案号 蜀ICP备2024077657号-1</a></div>
    </el-footer>
  </el-container>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import Background from "../components/EarthBgc.vue";
import Nav from "../components/ManageNavigation.vue";
import { getuserApi } from "@/apis/getuser";
import { changestatusApi } from "@/apis/changestatus";
import { CHANGE_EVENT } from "element-plus";
import { ElMessage } from "element-plus";

let list = reactive([
  {
    id: 6,
    username: "yuw1",
    password: "**********",
    identity: 2,
    create_time: "2024-05-12T16:31:34",
    update_time: "2024-05-12T16:31:34",
    address: null,
    enid: null,
    status: 0,
  },
]);
const loading = ref(false);
const getList = async () => {
  await getuserApi({})
    .then((response) => {
      loading.value = true;
      list = response?.data.data;
      loading.value = false;
    })
    .catch((error) => {
      console.log(error);
    });
};
getList();
const frozen = async (rowData) => {
  console.log(rowData.status);
  if (rowData.identity != 2) {
    await changestatusApi({ id: rowData.id, status: 1 })
      .then((response) => {
        console.log(response?.data.msg);
        getList();
        ElMessage({
          message: "冻结成功",
          type: "success",
        });
      })
      .catch((error) => {
        console.log("冻结失败");
      });
  } else {
    ElMessage({
      message: "无法冻结管理员",
      type: "warning",
    });
  }
};
const unfrozen = async (rowData) => {
  console.log(rowData.status);
  await changestatusApi({ id: rowData.id, status: 0 })
    .then((response) => {
      console.log(response?.data.msg);
      getList();
      ElMessage({
        message: "解冻成功",
        type: "success",
      });
    })
    .catch((error) => {
      console.log("解冻失败");
    });
};
</script>

<style scoped>
.bgc {
  width: 100%;
  height: 100%;
  position: fixed;
  margin: 0 auto;
  left: 30%;
  top: 25%;
  filter: blur(3px);
}
.el-container {
  overflow: scroll;
}
.el-header {
  position: fixed;
  width: 100%;
  background-color: rgb(236, 245, 255);
}
.el-main {
  left: 0;
  right: 0;
  box-sizing: border-box;
  position: absolute;
  top: 15%;
  width: 100%;
  height: 80%;
}

.el-table,
.el-table__expanded-cell {
  background-color: rgba(255, 255, 255, 0.4) !important;
}
.el-table th,
.el-table tr,
.el-table td {
  background-color: rgba(255, 255, 255, 0.4) !important;
}

.el-footer {
  left: 0;
  right: 0;
  background-color: rgb(236, 245, 255);
  position: absolute;
  width: 100%;
  bottom: 0;
}
.el-footer span {
  font-size: 20px;
  position: relative;
  top: 20%;
}
.beian{
  text-decoration: none;
  position: absolute;
  font-family: Helvetica;
  left: 35%;
  bottom: 10%;
  color: rgba(27, 24, 24, 0.315);
}
</style>