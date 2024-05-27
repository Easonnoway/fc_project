<template>
    <div class="con">
        <div class="hesuan">
            <div class="hesuanCon">
                <p style="font-size: 50px;font-family: Helvetica;font-weight: bold;margin-bottom: 20px;">Carbon
                    accounting
                </p>
                <P style="margin-left:20px;color: #0077ff;">碳核算模块</P>
                <p>碳核算是测量工业活动向地球生物圈直接和间接排放二氧化碳及其当量气体的措施，是指控排企业按照监测计划对碳排放相关参数实施数据收集、统计、记录，并将所有排放相关数据进行计算、累加的一系列活动。</p>
                <el-button @click="accountingJump" class="hsbutton" type="primary" size="mini" plain>企业碳核算</el-button>
            </div>
        </div>
        <div class="jiaoyi">
            <div class="jiaoyiCon">
                <p style="font-size: 50px;font-family: Helvetica;font-weight: bold;margin-bottom: 20px;">Carbon trading
                </p>
                <P style="margin-left:20px;color: #0077ff;">碳交易模块</P>
                <p>把二氧化碳排放权作为一种商品，买方通过向卖方支付一定金额从而获得一定数量的二氧化碳排放权，从而形成了二氧化碳排放权的交易。</p>
                <el-button @click="tradingJump" class="hsbutton" type="primary" size="mini" plain>企业碳交易</el-button>
            </div>
        </div>
        <!-- <div class="jishu">
            <p>核心技术展示</p>
            <el-carousel :interval="4000" type="card" height="40vh">
                <el-carousel-item v-for="item in 6" :key="item">
                    <h3 text="2xl" justify="center">{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { ElMessage } from 'element-plus'
import { getIdentity } from '@/utils/auth';
import { getloginState } from '@/utils/loginstate';
defineProps(['useLoginState'])
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
</script>

<style scoped>
* {
    font-family: "Roboto", sans-serif;
}

.con {
    height: 100%;
    position: relative;
}

.hesuan {
    position: relative;
    height: 60%;
    z-index: 1;
}

.hesuanCon {
    border-radius: 5%;
    box-shadow: 0 0 5px 1px #999;
    position: relative;
    width: 40%;
    height: 80%;
    font-size: 15px;
    line-height: 30px;
    padding: 70px;
    padding-right: 200px;
    padding-bottom: 120px;
    z-index: 1;
    background-color: rgba(236, 245, 255, 0.6);
}

.el-button {
    width: 30%;
    height: 70px;
    font-size: 20px;
}

.jiaoyi {
    height: 60%;
    margin-bottom: 5%;
    width: 60%;
    position: absolute;
    top: 50%;
    right: 0;
    z-index: 2;
}

.jiaoyiCon {
    height: 80%;
    border-radius: 5%;
    position: relative;
    font-size: 15px;
    line-height: 30px;
    padding: 70px 200px 70px 70px;
    z-index: 2;
    box-shadow: 0 0 5px 1px #999;
    background-color: rgba(236, 245, 255, 0.6);
}

.jishu {
    position: absolute;
    top: 120%;
    height: 40vh;
    width: 100%;
}

.jishu p {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>