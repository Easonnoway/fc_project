<template>
    <div class="radiodiv">
        <el-radio-group v-model="radio">
            <el-radio-button label="公司" />
            <el-radio-button label="审核员" />
        </el-radio-group>
    </div>
    <div class="Con">
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="140px" class="demo-ruleForm">
            <el-form-item label="Account" prop="account">
                <el-input v-model.number="ruleForm.username" />
            </el-form-item>
            <el-form-item label="Password" prop="pass">
                <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Confirm" prop="checkPass">
                <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="plain" @click="submitForm(ruleFormRef)">Submit</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { signupApi } from '@/apis/signup'
const radio = ref('公司')
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import router from '@/router';

const ruleFormRef = ref<FormInstance>()

const checkAccount = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('请输入账号'))
    }
    callback()
}

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        if (ruleForm.checkPass !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('checkPass', () => null)
        }
        callback()
    }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== ruleForm.password) {
        callback(new Error("两次密码必须相同！"))
    } else {
        callback()
    }
}

const ruleForm = reactive({
    password: '',
    checkPass: '',
    username: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
    password: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
    username: [{ validator: checkAccount, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            if (radio.value == "公司") {
                let identity = 0
                await signupApi({
                    username: ruleForm.username,
                    password: ruleForm.password,
                    identity: identity,
                }).then(response => {
                    router.push('/login'),
                    ElMessage({
                        showClose: true,
                        message: '注册成功',
                        type: 'success',
                    })
                })
                    .catch(error => {
                        // 处理请求失败的错误
                        console.error(error);
                    });
            } else {
                let identity = 1
                await signupApi({
                    username: ruleForm.username,
                    password: ruleForm.password,
                    identity: identity,
                }).then(response => {
                    // 处理请求成功的响应
                    router.push('/login'),
                    ElMessage({
                        showClose: true,
                        message: '注册成功',
                        type: 'success',
                    })
                    // console.log(response);
                })
                    .catch(error => {
                        // 处理请求失败的错误
                        // console.log(error);
                    });
            }
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

<style scoped> .Con {
     position: relative;
     right: 40px;
     top: 90px;
 }

 .el-form-item {
     margin-bottom: 40px;
 }

 .radiodiv {
     position: absolute;
     left: 20%;
     top: 10%;
     margin: 0;
 }
</style>