<template>
     <el-col :span="24">
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1" @click="Jump1">
          <el-icon><OfficeBuilding /></el-icon>
          <span>陶瓷企业</span>
        </el-menu-item>
        <el-menu-item index="2" @click="Jump2">
          <el-icon><OfficeBuilding /></el-icon>
          <span>发电企业</span>
        </el-menu-item>
        <el-menu-item index="3" @click="Jump3">
        <el-icon><OfficeBuilding /></el-icon>
          <span>平板玻璃企业</span>
        </el-menu-item>
        <el-menu-item index="4" @click="Jump4">
          <el-icon><OfficeBuilding /></el-icon>
          <span>民航企业</span>
        </el-menu-item>
      </el-menu>
      <el-button type="primary" class="homeBtn" @click="jumpHome">返回主页</el-button>
    </el-col>
</template>

<script setup lang="ts">
    import router from '@/router';
    import {
      OfficeBuilding,
    } from '@element-plus/icons-vue'
    const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
    }
    const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
    }
    const Jump1 = ()=>{
      router.push('/accounting/ceramics')
    }
    const Jump2 = ()=>{
      router.push('/accounting/electric')
   }
   const Jump3 = ()=>{
      router.push('/accounting/glass')
   }
   const Jump4 = ()=>{
      router.push('/accounting/aviation')
   }
   const jumpHome = ()=>{
      router.push('/')
   }

</script>

<style>
    .el-menu{
        width: 100%;
    }
    .homeBtn{
      width: 60%;
      position: absolute;
      bottom: 3%;
      margin-left: 20%;
    }
</style>