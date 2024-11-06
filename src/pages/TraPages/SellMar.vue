<template>
    <el-card class="con">
        <div class="title">出售市场</div>
        <el-table :data="tableData" stripe height="75vh" style="width: 100%;" size="large" :key="itemKey">
            <el-table-column prop="username" label="售出企业" width="150" />
            <el-table-column prop="enid" label="企业类型" width="150" />
            <el-table-column prop="number_of_carbon_coins" label="售出碳币量" width="150" sortable />
            <el-table-column prop="price_of_carbon_coin" label="碳币单价" width="150" sortable />
            <el-table-column prop="total_price" label="售出总价" width="150" sortable>
            </el-table-column>
            <el-table-column prop="time" label="上传时间" sortable />
            <el-table-column align="right">
                <template #default="scope">
                    <el-button size="small" type="primary"
                        @click="checkdescription(scope.$index, scope.row)">查看详情</el-button>
                    <el-popconfirm width="220" @confirm="handleEdit(scope.$index, scope.row)" confirm-button-text="确定"
                        cancel-button-text="取消" icon-color="#626AEF" title="你确定要购买">
                        <template #reference>
                            <el-button size="small" type="success">购买</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000" />
    </el-card>
    <el-dialog v-model="centerDialogVisible" title="Warning" width="500" center>
        <span>
            {{ TempDescription }}
        </span>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="centerDialogVisible = false">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="dialogFormVisible" title="请输入私钥获取个人信息" width="500">
        <el-form-item label="输入私钥" label-width="100">
            <el-input v-model="privatKey_input" autocomplete="off" />
        </el-form-item>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="uptoChain()">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { deleteMessage, getMarket1 } from '@/apis/trading';
import { buyCarbonCredits } from '@/constract/web3utils';
import { getAddress } from '@/utils/constract';
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue'
const itemKey = Math.random()
let TempDescription = ref('')
const centerDialogVisible = ref(false)
const dialogFormVisible = ref(false)
let privatKey_input = ref('')

interface TraMessage {
    username: string;
    enid: string;
    isAnonymity: boolean;
    number_of_carbon_coins: number;
    price_of_carbon_coin: number;
    retention_time: number;
    total_price: number;
    time: string;
    status: number;
    id: string
    description: string;
    address: string;
    keyId: string
}

let temprow = {} as TraMessage

const checkdescription = (index: number, row: TraMessage) => {
    TempDescription.value = row.description
    centerDialogVisible.value = true
}

const handleEdit = (index: number, row: TraMessage) => {
    temprow = row
    dialogFormVisible.value = true
}

const uptoChain = async () => {
    try {
        await buyCarbonCredits(
            getAddress()!,
            privatKey_input.value,
            getAddress()!,
            temprow.address,
            temprow.number_of_carbon_coins,
            temprow.price_of_carbon_coin
        )
        // await deleteMessage({ keyId: temprow.keyId })
    } catch (error) {
        console.error(error)
    }
}

let tableData: TraMessage[] = reactive([])

const getData = async () => {
    await getMarket1().then(res => {
        let alldata = res?.data.data;
        console.log()
        alldata.forEach((element: TraMessage) => {
            let obj = {
                username: element.username,
                enid: element.enid,
                isAnonymity: element.isAnonymity,
                number_of_carbon_coins: element.number_of_carbon_coins,
                price_of_carbon_coin: element.price_of_carbon_coin,
                retention_time: element.retention_time, // 假设 retention_time 是一个数字，默认为 0
                total_price: element.total_price,
                time: element.time, // 假设 time 是一个字符串，默认为空字符串
                status: element.status, // 假设 status 是一个数字，默认为 0
                id: element.id, // 假设 element.id 是数据中的唯一标识符
                description: element.description,
                address: element.address,
                keyId: element.keyId
            };
            tableData.push(obj); // 将 obj 对象添加到 tableData 数组中
        });
        console.log(tableData);
    });
}

onMounted(() => {
    getData()
    // console.log(tableData)
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