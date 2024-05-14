<template>
    <div class="radiodiv">
        <el-radio-group v-model="radio">
            <el-radio-button label="公司" />
            <el-radio-button label="审核员" />
        </el-radio-group>
    </div>
    <div class="Con">
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="140px"
            class="demo-ruleForm">
            <el-form-item label="Account" prop="account">
                <el-input v-model.number="ruleForm.username" />
            </el-form-item>
            <el-form-item label="Password" prop="pass">
                <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="plain" @click="submitForm(ruleFormRef)">Submit</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
let radio = ref('公司')
import router from '@/router';
import { loginApi } from "@/apis/login"
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { getIdentity, setIdentity, setToken, setUsername } from '@/utils/auth'
import { setloginState } from '@/utils/loginstate';
import { setEnid } from '@/utils/constract';

const ruleFormRef = ref<FormInstance>()

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
                        ElMessage({
                            showClose: true,
                            message: '登录成功',
                            type: 'success',
                        })
                        console.log(response);
                        setUsername(ruleForm.username)
                        setIdentity(response.data.data.identity.toString())
                        router.push('/')
                        setloginState("true")
                        console.log(getIdentity())
                    }
                })
                .catch(error => {
                    ElMessage({
                        showClose: true,
                        message: '登录失败',
                        type: 'error',
                    })
                    console.error(error);
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

 .radiodiv {
     position: absolute;
     left: 20%;
     top: 15%;
     margin: 0;
 }
</style>