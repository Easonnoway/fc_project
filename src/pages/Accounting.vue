<template>
    <div class="allcon">
        <div class="navigation">
            <div class="topNav">
                <p style="font-weight: bold;">碳核算</p>
            </div>
            <div class="bottomNav">
                <p>选取行业</p>
                <div class="NavCon"><Nav/></div>
            </div>
        </div>
        <div class="content">
            <RouterView></RouterView>
        </div>
    </div>
</template>
  

<script setup lang="ts">
import Nav from '../components/AccountNavigation.vue'
</script>

<style>
    *{
        font-family: Helvetica,"Roboto", sans-serif;
    }
    .allcon{
        display: flex;
        flex-direction: column;
    }
    .navigation{
        position: fixed;
        width: 15%;
        height: 100%;
    }
    .content{
        margin-left: 15%;
        width: 85%;
        min-height: 100vh;
        background-color: #EBEEF5;
    }
    .topNav{
        position: relative;
        background-color: #79bbff;
        height: 10%;
        font-size: 24px;
        margin: auto;
    }
    .topNav p{
        position: absolute;
        top: 50%;
        margin-top: -12px;
        padding-left:50%;
        left: -36px;
    }
    .bottomNav p:nth-child(1){
        text-align: center;
        font-weight: bold;
        font-size: 20px
    }
    .NavCon{
        width: 100%;
    }
</style>