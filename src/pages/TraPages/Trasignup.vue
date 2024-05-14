<template>
    <div class="bgc">
        <bgc />
    </div>
    <div>
        <div class="Con">
            <p style="align-content: center; font-size: 26px; font-weight: bold;">注册以太坊授权</p>
            <h4>注意事项：</h4>
            <p>确认注册后将会提供一对公钥私钥，私钥需要您严密存储</p>
            <p>注册后您将可以将你的碳报告上链、获得碳币稳定币来进行交易</p>
            <p>只有碳报告上链后你的账户才会有一定额度碳币</p>
            <p>一旦注册，你的账号会绑定一个公钥账户</p>
            <p>上链操作消耗您在测试网络上的以太币</p>
            <el-button type="primary" @click="createAccount()">确认注册钱包</el-button>
            <div class="pushCon" @click="Signup()">已授权？点击这里</div>
        </div>
        <el-dialog v-model="centerDialogVisible" title="注册成功，请查看自己的公私钥" width="1000" center>
            <h4>注意事项：</h4>
            <P>请牢记您的私钥，不要轻易将私钥让他人知晓</P>
            <p>一但点击确定后，将无法再获得私钥信息</p>
            <p>私钥将是你上链碳报告和碳交易的重要凭证</p>
            
            <el-card>
                <div>公钥：{{ address }}</div>
                <div>私钥：{{ privateKey }}</div>
            </el-card>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="centerDialogVisible = false;router.push('/trading/tralogin')">
                        我已牢记，点击关闭
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import bgc from '@/components/EarthBgc.vue'
const Signup = () => {
    router.push('/trading/tralogin')
}
import { ref } from 'vue'
let radio = ref('公司')
import router from '@/router';
import { ElMessage } from 'element-plus'
import { web3 } from '@/constract/web3utils'
import { setaddressTouser } from '@/apis/trading';

// 关于区块链 -----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
const centerDialogVisible = ref(false)
let address = ref('')
let privateKey = ref('')

const createAccount = async () => {
    const account = await web3.eth.accounts.create();
    address.value = account.address
    privateKey.value = account.privateKey
    centerDialogVisible.value = true
    await setaddressTouser({address:address.value}).then(res => {
        ElMessage({
            showClose: true,
            message: '创建成功',
            type: 'success',
        })
    }).catch(error => {
        ElMessage({
            showClose: true,
            message: '创建失败',
            type: 'error',
        })
    })
}

</script>

<style scoped>
.Con {
    background-color: rgba(188, 215, 242, 0.7);
    /* font-weight: bolder; */
    width: 50%;
    height: 50%;
    position: absolute;
    left: 30%;
    bottom: 30%;
    padding: 30px;
    box-sizing: border-box;
    font-family: Helvetica, "Roboto", sans-serif;
    border-radius: 5%;
    box-shadow: 12px 12px 12px 2px #999;
}

.el-form-item {
    margin-bottom: 40px;
}

.el-form {
    position: absolute;
    top: 30%;
    width: 70%;
}

.pushCon {
    position: absolute;
    bottom: 60px;
    right: 60px;
    font-weight: 400;
    border-bottom: black;
    border-width: 0 0 1px 0;
    padding-bottom: 1px;
    border-style: solid;
}

.pushCon:hover {
    color: white;
    cursor: pointer;
    border-bottom: white;
}

.bgc {
    width: 100%;
    height: 100%;
    position: fixed;
    margin: 0 auto;
    left: 40%;
    top: 15%;
    filter: blur(3px);
}
</style>