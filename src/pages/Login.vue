<template>
    <div class="bgc">
        <bgc />
    </div>
    <div class="loginCon">
        <div class="login">
            <div class="left">
                <P>登录</P>
                <p>欢迎使用碳链宝</p>
                <el-link type="primary" @click="Signup">没有账户？前往注册</el-link>
            </div>
            <div class="right">
                <loginCom />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import loginCom from '../components/LoginForm.vue'
import bgc from '../components/EarthBgc.vue'
import { onMounted } from 'vue';
const Signup = () => {
    router.push('/signup')
}

</script>

<style>
body {
    margin: 0;
}

.bgc {
    width: 100%;
    height: 100%;
    position: fixed;
    margin: 0 auto;
    left: 30%;
    top: 25%;
    filter: blur(3px);
}

.loginCon {
    position: relative;
    height: 100vh;
    width: 100%;
    font-family: Helvetica, "Roboto", sans-serif;
}

.login {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -150px;
    margin-left: -350px;
    height: 300px;
    width: 700px;
}

.left {
    position: absolute;
    width: 350px;
    height: 100%;
    background-color: rgba(242, 246, 252, 0.8);
    border-radius: 5%;
    box-shadow: -12px 12px 12px 2px #999;
}

.left p:nth-child(1) {
    text-align: center;
    font-size: 40px;
    font-weight: bold;
    line-height: 50px;
    padding-top: 40px;
    padding-bottom: 10px;
}

.left p:nth-child(2) {
    text-align: center;
    font-size: 20px;
    color: #999999;
}

.left .el-link {
    position: relative;
    left: 110px;
    font-size: 15px;
    color: #409EFF;
    margin: 0 auto;
}

.right {
    position: absolute;
    margin-left: 350px;
    margin-top: -50PX;
    position: relative;
    width: 350px;
    height: 400PX;
    background-color: rgba(62, 153, 247, 0.9);
    border-radius: 5%;
    box-shadow: 0 0 5px 1px #999;
}
</style>