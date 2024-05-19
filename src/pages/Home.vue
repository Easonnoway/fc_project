<template>
    <div class="bgc">
      <Background/>
    </div>
    <el-container @scroll="scrolling">
      <el-header height="15%" v-show="isShow">
        <Nav/>
      </el-header>
      <el-main>
        <HomCon/>
      </el-main>
      <el-footer height="5%">
        <p style="font-family: Helvetica;">Made by 信安小组-以太链盟</p>
      </el-footer>
    </el-container>
</template>

<script lang="ts" setup>
  import Background from '../components/EarthBgc.vue'
  import Nav from '../components/Navigation.vue'
  import HomCon from '../components/HomeContent.vue'
  import { onMounted,ref } from "vue";
  import bundleID from '@/hooks/useBinding';
  let isShow = ref(true)
  const scrolling = ()=>{
    console.log(111)
  }

</script>

<style lang="css">
  .el-container{
    overflow: scroll
  }
  .el-header{
    position: fixed;
    width: 100%;
    background-color: rgb(236,245,255);
  }
  .el-main{
    left: 0;
    right: 0;
    box-sizing:border-box;
    position: absolute;
    top:15%;
    width: 100%;
    height: 80%;
  }
  .el-footer{
    left: 0;
    right: 0;
    background-color: rgb(236,245,255);
    position: absolute;
    width: 100%;
    bottom:0;
  }
  .el-footer p{
    font-size: 20px;
    line-height:5px;
  }
  .bgc{
    width: 100%;
    height: 100%;
    position: fixed;
    margin:0 auto;
    left: 30%;
    top: 25%;
    filter: blur(3px);
  }
</style>