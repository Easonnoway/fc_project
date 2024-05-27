<template>
    
    <div class="Con">
        <el-avatar :size="70" class="mr-3" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="140px"
            class="demo-ruleForm">
            <el-form-item label="账户" prop="account">
                <el-input v-model.number="ruleForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="plain" @click="isShow=true">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
    <Vcode :show="isShow" @success="success" @close="close" @fail="fail" :imgs="[Img]"></Vcode>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import router from '@/router';
import { loginApi } from "@/apis/login"
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { getIdentity, getUsername, setIdentity, setToken, setUsername } from '@/utils/auth'
import { setloginState } from '@/utils/loginstate';
import { setEnid } from '@/utils/constract';
import Img from '@/assets/OIP.jpg'
const ruleFormRef = ref<FormInstance>()
import Vcode from 'vue3-puzzle-vcode'
//验证码模态框是否出现，默认不展示
const isShow = ref(false)
//登录按钮
const login = () => {
  //展现验证码模态框
  isShow.value = true
}
//用户通过了验证
const success = (msg) => {
  isShow.value = false
  submitForm(ruleFormRef.value)
}
//用户点击遮罩层，关闭模态框
const close = () => {
  isShow.value = false
}
//用户验证失败
const fail = () => {
  console.log('验证失败')
}

const checkAccount = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入账号'))
    }
    callback()
}

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    }
    callback()
}

const ruleForm = reactive({
    username: '',
    password: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
    password: [{ validator: validatePass, trigger: 'blur' }],
    username: [{ validator: checkAccount, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            await loginApi(ruleForm)
                .then(response => {
                    if (response?.data !== undefined) {
                        setToken(response.data.data.JWT)
                        setEnid(response.data.data.enid)
                        setUsername(ruleForm.username)
                        ElMessage({
                            showClose: true,
                            message: `${getUsername()}欢迎登录`,
                            type: 'success',
                        })
                        setIdentity(response.data.data.identity.toString())
                        if(response.data.data.identity==0||response.data.data.identity==1){
                            router.push('/')
                        }else{
                            router.push('/manage')
                            console.log(response.data.data)
                        }
                       
                        setloginState("true")
                        // console.log(getIdentity())
                    }
                })
                .catch(error => {
                    ElMessage({
                        showClose: true,
                        message: '用户名不存在或用户名密码错误',
                        type: 'error',
                    })
                });
        } else {
            console.log('error submit!')
            return false
        }
    })
}

</script>

<style scoped>
 .Con {
     position: relative;
     right: 40px;
     top: 120px;
 }

 .el-form-item {
     margin-bottom: 40px;
 }

.el-avatar {
    position: absolute;
    left:55%;
    top:-50%;
}
</style>