<template>
    <div class="allcon">
        <div class="navigation">
            <div class="topNav">
                <p style="font-weight: bold;">碳交易</p>
            </div>
            <div class="bottomNav">
                <div class="NavCon">
                    <Nav />
                </div>
            </div>
        </div>
        <div class="content">
            <RouterView></RouterView>
        </div>
    </div>
</template>


<script setup lang="ts">
import Nav from '../components/TradingNavigation.vue'
import Web3 from 'web3';
import { getTraloginState, getloginState } from '@/utils/loginstate';
import router from '@/router';
import { onMounted } from 'vue';
import { web3 } from '@/constract/web3utils'
// 关于以太坊 -------------------------------------------------------------------------
//-------------------------------------------------------------------------------------

onMounted(async () => {
    if(!getTraloginState()){
        router.push('/trading/tralogin')
    }else{
        router.push('/trading/balance')
    }
})
//-------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------

</script>

<style>
* {
    font-family: Helvetica, "Roboto", sans-serif;
}

.allcon {
    display: flex;
    flex-direction: column;
}

.navigation {
    position: fixed;
    width: 15%;
    height: 100%;
}

.content {
    margin-left: 15%;
    width: 85%;
    min-height: 100vh;
    background-color: #EBEEF5;
}

.topNav {
    position: relative;
    background-color: #79bbff;
    height: 10%;
    font-size: 24px;
    margin: auto;
}

.topNav p {
    position: absolute;
    top: 50%;
    margin-top: -12px;
    padding-left: 50%;
    left: -36px;
}

.bottomNav p:nth-child(1) {
    text-align: center;
    font-weight: bold;
    font-size: 20px
}

.NavCon {
    width: 100%;
}
</style>