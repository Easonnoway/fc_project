<template>
    <el-col :span="24">
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <User />
                    </el-icon>
                    <span>个人账户</span>
                </template>
                <el-menu-item index="1-1" @click="Jump1">信息及余额</el-menu-item>
                <el-menu-item index="1-2" @click="Jump5">交易记录</el-menu-item>
                <el-menu-item index="1-3">修改密码</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2">
                <template #title>
                    <el-icon>
                        <MessageBox />
                    </el-icon>
                    <span>信息平台</span>
                </template>
                <el-menu-item index="2-1" @click="Jump6">政策法规</el-menu-item>
                <el-menu-item index="2-2">出售信息</el-menu-item>
                <el-menu-item index="2-3">需求信息</el-menu-item>
                <el-menu-item index="2-4">成交记录</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
                <template #title>
                    <el-icon>
                        <Handbag />
                    </el-icon>
                    <span>交易模块</span>
                </template>
                <el-menu-item index="3-1" @click="Jump2">发布信息</el-menu-item>
                <el-menu-item index="3-2" @click="Jump3">出售市场</el-menu-item>
                <el-menu-item index="3-3" @click="Jump4">求购市场</el-menu-item>
            </el-sub-menu>
            <el-menu-item-group title="辅助功能">
                <el-menu-item index="4">交易检测</el-menu-item>
                <el-menu-item index="5">碳资产管理</el-menu-item>
            </el-menu-item-group>
        </el-menu>
        <el-button type="primary" class="homeBtn" @click="jumpHome">返回主页</el-button>
    </el-col>
</template>

<script setup lang="ts">
import router from '@/router';
import { getEnid } from '@/utils/constract';
import { getTraloginState } from '@/utils/loginstate';
import {
    User, MessageBox, Handbag
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
const handleOpen = (key: string, keyPath: string[]) => {
    // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    // console.log(key, keyPath)
}
const Jump1 = () => {
    if (!getTraloginState()) {
        ElMessage({
            showClose: true,
            message: '请先登录区块链钱包',
            type: 'warning',
        })
        return
    }
    router.push('/trading/balance')
}
const Jump2 = () => {
    if (!getTraloginState()) {
        ElMessage({
            showClose: true,
            message: '请先登录区块链钱包',
            type: 'warning',
        })
        return
    }
if (getEnid() == 'null') {
        ElMessage({
            showClose: true,
            message: '你还未上传过碳报告',
            type: 'warning',
        })
        return
    }
    router.push('/trading/message')
}
const Jump3 = () => {
    if (!getTraloginState()) {
        ElMessage({
            showClose: true,
            message: '请先登录区块链钱包',
            type: 'warning',
        })
        return
    }
    if (getEnid() == 'null') {
        ElMessage({
            showClose: true,
            message: '你还未上传过碳报告',
            type: 'warning',
        })
        return
    }
    router.push('/trading/sellmar')
}
const Jump4 = () => {
    if (!getTraloginState()) {
        ElMessage({
            showClose: true,
            message: '请先登录区块链钱包',
            type: 'warning',
        })
        return
    }
    if (getEnid() == 'null') {
        ElMessage({
            showClose: true,
            message: '你还未上传过碳报告',
            type: 'warning',
        })
        return
    }
    router.push('/trading/wantmar')
}
const Jump5 = () => {
    if (!getTraloginState()) {
        ElMessage({
            showClose: true,
            message: '请先登录区块链钱包',
            type: 'warning',
        })
        return
    }
    if (getEnid() == 'null') {
        ElMessage({
            showClose: true,
            message: '你还未上传过碳报告',
            type: 'warning',
        })
        return
    }
    router.push('/trading/trahistory')
}
const Jump6 = () => {
    if (!getTraloginState()) {
        ElMessage({
            showClose: true,
            message: '请先登录区块链钱包',
            type: 'warning',
        })
        return
    }
    if (getEnid() == 'null') {
        ElMessage({
            showClose: true,
            message: '你还未上传过碳报告',
            type: 'warning',
        })
        return
    }
    router.push('/trading/law')
}
const jumpHome = () => {
    router.push('/')
}

</script>

<style>
.el-menu {
    width: 100%;
}

.homeBtn {
    width: 60%;
    position: absolute;
    bottom: 3%;
    margin-left: 20%;
}
</style>