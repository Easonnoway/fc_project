<template>
    <div class="bgc">
        <bgc />
    </div>
    <div>
        <div class="Con">
            <p style="align-content: center; font-size: 26px;">请先进行以太坊授权登录</p>
            <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="140px"
                class="demo-ruleForm">
                <el-form-item label="账户address" prop="account">
                    <el-input v-model="ruleForm.address" />
                </el-form-item>
                <el-form-item>
                    <el-button type="plain" @click="submitForm(ruleFormRef)">Submit</el-button>
                </el-form-item>
            </el-form>
            <div class="pushCon" @click="Signup()">还未在以太坊上授权注册？点击这里</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import bgc from '@/components/EarthBgc.vue'
import { reactive, ref } from 'vue'
let radio = ref('公司')
import router from '@/router';
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { getIdentity, setIdentity, setToken, setUsername } from '@/utils/auth'
import { setTraloginState, setloginState } from '@/utils/loginstate';
import { getEnid, setAddress } from '@/utils/constract'
import { cheackaddressTouser } from '@/apis/trading';
import { web3 } from '@/constract/web3utils';

const Signup = () => {
    console.log(getEnid())
    if(getEnid() !== 'null'){
        ElMessage({
            showClose: true,
            message: '该账号已绑定过以太坊账户',
            type: 'warning',
        })
    }else{
        router.push('/trading/trasignup')
    }
}
    

const ruleFormRef = ref<FormInstance>()

let loginindex = 0
// 0未验证 1已验证未登录 2已登录

const onLogin = () => {
    web3.eth.accounts.wallet.add
}

const checkAccount = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入账号'))
    }
    callback()
}

const ruleForm = reactive({
    address: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
    address: [{ validator: checkAccount, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            await cheackaddressTouser({address:ruleForm.address})
                .then(res => {
                    ElMessage({
                        showClose: true,
                        message: '地址与该账号匹配,登录成功',
                        type: 'success',
                    })
                    setTraloginState('true')
                    setAddress(ruleForm.address)
                    router.push('/trading/balance')
                }).catch(error => {
                    ElMessage({
                        showClose: true,
                        message: '地址与该账号不匹配',
                        type: 'error',
                    })
                })
        } else {
            ElMessage({
                showClose: true,
                message: '格式错误',
                type: 'error',
            })
        }
    })
}

</script>

<style scoped>
.Con {
    background-color: rgba(188, 215, 242, 0.7);
    font-weight: bolder;
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