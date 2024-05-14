<template>
    <el-card class="con">
        <p>发布交易信息</p>

        <el-form :model="form" label-width="auto" style="max-width: 600px">
            <el-form-item label="请选择消息类型" v-model="form.type">
                <el-radio v-model="form.type" label="1">售出碳币</el-radio>
                <el-radio v-model="form.type" label="2">求购碳币</el-radio>
            </el-form-item>
            <el-form-item :label="label1">
                <el-input v-model="form.count" />
            </el-form-item>
            <el-form-item label="碳币单价">
                <el-input v-model="form.UnitPrice" />
            </el-form-item>
            <el-form-item label="总金额">
                {{ TotalPrice }}
            </el-form-item>
            <el-form-item label="保留时长">
                <el-select v-model="form.time" placeholder="请选择">
                    <el-option label="三天" value="3" />
                    <el-option label="七天" value="7" />
                    <el-option label="三十天" value="30" />
                </el-select>
            </el-form-item>
            <el-form-item label="是否匿名">
                <el-switch v-model="form.is_HideName" />
            </el-form-item>
            <el-form-item label="详细发布描述">
                <el-input v-model="form.detail" type="textarea" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="dialogFormVisible = true">发布</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-dialog v-model="dialogFormVisible" title="确认本人交易" width="500">
        <el-form-item label="输入私钥" label-width="100">
            <el-input v-model="privatKey_input" autocomplete="off" />
        </el-form-item>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消发布 </el-button>
                <el-button type="primary" @click="onSubmit()">
                    确定交易
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
// import { numericToNumber } from 'echarts/types/src/util/number.js';
import { computed, reactive, ref } from 'vue'
import { addMessage } from '@/apis/trading'
import { ElMessage } from 'element-plus';
import { is_matched } from '@/constract/web3utils';
import { getAddress, getEnid } from '@/utils/constract';
import { nanoid } from 'nanoid';

const dialogFormVisible = ref(false)
let privatKey_input = ref("")
// do not use same name with ref
let form = reactive({
    time: '',
    is_HideName: false,
    type: 'sell',
    UnitPrice: '',
    count: '',
    detail: ''
})

const onSubmit = async () => {
    try {
        if (!is_matched(getAddress()!, privatKey_input.value)) {
            ElMessage({
                showClose: true,
                message: "私钥错误",
                type: "error",
            });
            return
        }
        dialogFormVisible.value = false
        console.log('submit!')
        await addMessage({
            status: parseFloat(form.type),
            number_of_carbon_coins: parseFloat(form.count),
            retention_time: parseFloat(form.time),
            isAnonymity: form.is_HideName,
            description: form.detail,
            price_of_carbon_coin: parseFloat(form.UnitPrice),
            enid: getEnid()!,
            keyId: nanoid(20)
        }).then(res => {
            ElMessage({
                showClose: true,
                message: '发布成功',
                type: 'success',
            })
            form = {
                time: '',
                is_HideName: false,
                type: 'sell',
                UnitPrice: '',
                count: '',
                detail: ''
            }
        }).catch(error => {
            ElMessage({
                showClose: true,
                message: '发布失败',
                type: 'success',
            })
        })
    } catch (error) {
        ElMessage({
            showClose: true,
            message: "私钥格式错误",
            type: "error",
        });
    }

}

const label1 = computed(() => {
    return form.type == 'sell' ? '售出碳币数量' : "求购碳币数量"
})

let TotalPrice = computed(() => {
    return parseFloat(form.UnitPrice) * parseFloat(form.count) || 0
})

</script>

<style scoped>
.con {
    width: 80%;
    margin: 0 auto;
    height: 500;
    position: relative;
    margin-top: 15vh;
}

.el-form {
    margin: 0 auto;
    font-size: 60vh;
}
</style>