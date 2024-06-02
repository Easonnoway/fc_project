<template>
  <div class="bgc">
    <Background />
  </div>
  <el-container @scroll="scrolling">
    <el-header height="15%" v-show="isShow">
      <Nav />
    </el-header>
    <el-main>
      <HomCon />
    </el-main>
    <el-footer height="5%">
      <span style="font-family: Helvetica">Made by 以太链盟</span>
      <!-- 备案号，网站上传需要备案 -->
      <!-- <div class="beian">备案号：<a href="https://beian.miit.gov.cn" style="color: blue;" >备案号 蜀ICP备2024077657号-1</a></div> -->
    </el-footer>
  </el-container>
</template>

<script lang="ts" setup>
import Background from "../components/EarthBgc.vue";
import Nav from "../components/Navigation.vue";
import HomCon from "../components/HomeContent.vue";
import { onMounted, ref } from "vue";
import bundleID from "@/hooks/useBinding";
let isShow = ref(true);
const scrolling = () => {
  console.log(111);
};
</script>

<style lang="css" scoped>
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
.bgc {
  width: 100%;
  height: 100%;
  position: fixed;
  margin: 0 auto;
  left: 30%;
  top: 25%;
  filter: blur(3px);
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