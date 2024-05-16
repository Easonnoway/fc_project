<template>
  <div>
    <p class="title">
    <div class="imgcon">
      <img src="@/assets/Product_Logo.png" style="width: 100%;height: 100%;"
    </div>
    <p style="line-height: 10px;">碳核算交易平台</p>
  </p>
  </div>
  <div>
    <el-button type="primary" size="mini" plain @click="accountingJump">碳核算</el-button>
    <el-button type="primary" plain @click="tradingJump">碳交易</el-button>
    <el-button type="primary" round @click="LoginJump" v-show="!getloginState()">登录</el-button>
    <el-button type="primary" round @click="leavelogin" class="leave" v-show="getloginState()">退出登录</el-button>
    <el-avatar :size="32" class="mr-3" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      v-show="getloginState()" />
    <span class="username" v-show="getloginState()">{{ getUsername() }}</span>
  </div>
</template>

<script lang="ts" setup name="Nav">
import router from '@/router';

import { ref } from 'vue'
import { ElLoading, ElMessage } from "element-plus"
import { getIdentity, removeIdentity, removeToken, removeUsername, getUsername } from '@/utils/auth';
import { getloginState, removeTraloginState, removeloginState, setloginState } from '@/utils/loginstate';
import { removeAddress, removeEnid } from '@/utils/constract';
defineProps(['useLoginState'])
const LoginJump = () => {
  router.push('/login')
}
const accountingJump = () => {
  if (!getloginState()) {
    ElMessage({
      dangerouslyUseHTMLString: true,
      message: '<strong>请先登录后再使用相关功能</strong>',
    })
  } else {
    if (getIdentity() === "0") {
      router.push('/accounting/ceramics')
    } else {
      router.push('/audit')
    }
  }
}
const tradingJump = () => {
  if (!getloginState()) {
    ElMessage({
      dangerouslyUseHTMLString: true,
      message: '<strong>请先登录后再使用相关功能</strong>',
    })
  } else {
    if (getIdentity() === "0") {
      router.push('/trading')
    } else {
      ElMessage({
        dangerouslyUseHTMLString: true,
        message: '暂为向审核员开启该通道',
      })
    }
  }
}
const leavelogin = () => {
  setloginState("false")
  removeUsername()
  removeToken()
  removeIdentity()
  removeloginState()
  removeTraloginState()
  removeAddress()
  removeEnid()
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  setTimeout(() => {
    loading.close()
  }, 500)
  router.go(0)
}
</script>

<style scoped>
.imgcon{
  width: 250px;
  height:60px;
  margin-top: 10px;
}
.title {
  position: absolute;
  top: -20px;
  font-size: 40px;
  display: flex;
  flex-direction:row;
}

.el-button {
  position: absolute;
  width: 10%;
  top: 30%;
  font-size: 20px;
}

.el-button:nth-child(1) {
  right: 26%;
  height: 40%;
}

.el-button:nth-child(2) {
  right: 14%;
  height: 40%;
}

.el-button:nth-child(3) {
  right: 2%;
  height: 40%;
}

.leave {
  position: absolute;
  right: 38%;
  height: 40%;
}

.el-avatar {
  position: absolute;
  width: 60px;
  height: 60px;
  top: 50%;
  margin-top: -30px;
  right: 9%;
}

.username {
  position: absolute;
  right: 6%;
  font-size: 30px;
  top: 50%;
  margin-top: -15px;
  padding-left: 0;
}
</style>
