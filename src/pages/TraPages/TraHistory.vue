<template>
    <el-card class="con">
        <div class="title">历史记录</div>
        <el-table :data="tableData" stripe height="75vh" style="width: 100%;" size="large" :key="itemKey">
            <el-table-column prop="buyer" label="售出企业" width="180" />
            <el-table-column prop="seller" label="购买企业" width="180" />=
            <el-table-column prop="amount" label="求购碳币量" width="220" sortable />
            <el-table-column prop="price" label="碳币单价" width="220" sortable />
            <el-table-column prop="dealtime" label="上传时间" sortable />
            <el-table-column align="right">
            </el-table-column>
        </el-table>
        <el-pagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000" />
    </el-card>
    <el-dialog v-model="dialogFormVisible" title="请输入私钥获取个人信息" width="500">
        <el-form-item label="输入私钥" label-width="100">
            <el-input v-model="privatKey_input" autocomplete="off" />
        </el-form-item>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false; router.push('/trading')">取消</el-button>
                <el-button type="primary" @click="">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import router from '@/router'
import { getTransactionsByAccount } from '@/constract/web3utils';
import { getAddress } from '@/utils/constract';
import { ElMessage } from 'element-plus';

let tableData = reactive([
] as TraMessage[])
const itemKey = Math.random()
let privatKey_input = ref("")

const dialogFormVisible = ref(false)

interface TraMessage {
    buyer: string,
    seller: string,
    price: number,
    amount: string,
    dealtime: string
}

const getData = async () => {
    let alldata = await getTransactionsByAccount(privatKey_input.value, getAddress()!)
    if (Array.isArray(alldata) == true) {
        alldata.forEach(ele => {
            let obj = {
                buyer: ele[0],
                seller: ele[1],
                price: ele[2],
                amount: ele[3],
                dealtime: '123',
            }
            tableData.push(obj)
        })
    }
}
onMounted(() => {
    getData()
})

</script>

<style scoped>
.con {
    width: 90%;
    height: 90vh;
    margin: 0 auto;
    height: 500;
    position: relative;
    margin-top: 5vh;
}

.title {
    align-content: center;
    font-family: bold;
    margin-bottom: 10px;
}

.el-table {
    height: 80%;
}

.el-pagination {
    margin: 0 auto;
    padding: 0 auto;
}
</style>