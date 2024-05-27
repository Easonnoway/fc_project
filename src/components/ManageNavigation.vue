<template>
    <div>
        <p class="title">
          <div class="imgcon">
          <img src="@/assets/Product_Logo.png" style="width: 100%;height: 100%;">
          </div>
          <p style="line-height: 10px;">管理员平台</p>
        </p>
    </div>
    <div>
      <el-button type="primary" round @click="leavelogin" class="leave">退出登录</el-button>
      <el-avatar :size="60" class="mr-3" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
      <span class="username">{{ getUsername() }}</span>
    </div>
</template>
<script lang="ts" setup>
import router from "@/router";
import { ElLoading, ElMessage } from "element-plus";
import {
  getIdentity,
  removeIdentity,
  removeToken,
  removeUsername,
  getUsername,
} from "@/utils/auth";
import {
  getloginState,
  removeTraloginState,
  removeloginState,
  setloginState,
} from "@/utils/loginstate";
import { removeAddress, removeEnid } from "@/utils/constract";

const leavelogin = () => {
  setloginState("false");
  removeUsername();
  removeToken();
  removeIdentity();
  removeloginState();
  removeTraloginState();
  removeAddress();
  removeEnid();
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
  setTimeout(() => {
    router.push("/");
    loading.close();
  }, 500);
};
</script>
<style scoped>
.imgcon {
  width: 250px;
  height: 60px;
  margin-top: 10px;
}
.title {
  position: absolute;
  top: -20px;
  font-size: 40px;
  display: flex;
  flex-direction: row;
}
.el-avatar {
  position: absolute;
  top: 50%;
  margin-top: -30px;
  right: 10.5%;
  width: 60px;
  height: 60px;
}
.username {
  position: absolute;
  font-size: 30px;
  left: 90%;
  top: 45%;
  margin-top: -15px;
  padding-left: 0;
}
.leave {
  position: absolute;
  right: 15%;
  height: 40%;
}
.el-button {
  position: absolute;
  width: 10%;
  top: 30%;
  font-size: 20px;
}
</style>