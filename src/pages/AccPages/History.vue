<template>
    <div class="table">
        <el-table :data="tableData" stripe height="100vh" style="width: 100%;" size="large" :key="itemKey">
            <el-table-column prop="username" label="上传用户名" width="180" />
            <el-table-column prop="enid" label="企业类型" width="180" />
            <el-table-column prop="CO2Value" label="二氧化碳排放量" width="220" />
            <el-table-column prop="time" label="上传时间" sortable />
            <el-table-column align="right">
                <template #default="scope">
                    <el-button size="small" type="primary"
                        @click="checkDetail(scope.$index, scope.row)">查看详情</el-button>
                    <el-button size="small" type="success" v-show="scope.row.is_audited != 0"
                        @click="BeforeuploadReporttoChain(scope.$index, scope.row)">查看审核进度</el-button>
                    <el-popconfirm width="220" @confirm="handleEdit(scope.$index, scope.row)" confirm-button-text="确定"
                        cancel-button-text="取消" icon-color="#626AEF" title="你确定要提交这个记录到审核员吗">
                        <template #reference>
                            <el-button size="small" type="success" v-show="scope.row.is_audited == 0">提交至审核员</el-button>
                        </template>
                    </el-popconfirm>
                    <el-popconfirm width="220" @confirm="handleDelete(scope.$index, scope.row)" confirm-button-text="确定"
                        cancel-button-text="取消" icon-color="#626AEF" title="你确定要删除这个记录吗">
                        <template #reference>
                            <el-button size="small" type="danger">删除此记录</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="dialogFormVisible" title="确认本人交易" width="800">
        <div>
            <h4>审核进度</h4>
            <el-steps style="max-width: 600px" :space="200" v-show="temprow.is_audited !== 2"
                :active="temprow.is_audited" sh-status="success" align-center>
                <el-step title="上传成功" />
                <el-step title="审核中" />
                <el-step title="审核通过" />
            </el-steps>
            <p v-show="temprow.is_audited == 2">审核未通过，请删除该记录后重新上传</p>
        </div>
        <div v-if="temprow.is_audited == 3">
            <el-form-item label="输入私钥" label-width="100" style="margin-top: 50px;">
                <el-input v-model="privatKey_input" autocomplete="off" />
            </el-form-item>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="uploadReporttoChain(tempindex, temprow)"
                    v-if="temprow.is_audited == 3">
                    确定上链
                </el-button>
                <el-button type="primary" @click="dialogFormVisible = false" v-else="">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>

import { RecordApi, deleteRecordApi, update, } from '@/apis/Record';
import bundleID from '@/hooks/useBinding';
import { onMounted, reactive, ref, toRaw } from 'vue';
import { getUsername } from '@/utils/auth';
import router from '@/router';
import { useRecordStore } from '@/store/RecordState';
import { ElLoading, ElMessage } from 'element-plus';
import { addCarbonReport, createUser } from '@/constract/web3utils';
import { getTraloginState } from '@/utils/loginstate';
import { getAddress } from '@/utils/constract';
import { setenidTouser } from '@/apis/trading';

let dialogFormVisible = ref(false)

let privatKey_input = ref('')

const RecordState = useRecordStore()
const itemKey = Math.random()

const username = getUsername()

let detailData: any[] = []

interface Record {
    username: string | undefined
    enid: string
    CO2Value: number
    time: string
    id: string
    is_audited: number
    carbonCoin: number
}

let tableData: Record[] = reactive([])

let tempindex = ref(0)
let temprow = ref({} as Record)

const BeforeuploadReporttoChain = (index: number, row: Record) => {
    tempindex.value = index
    temprow.value = row
    dialogFormVisible.value = true
}

const uploadReporttoChain = async (index: number, row: Record) => {
    // console.log(row, index)
    if (!getTraloginState()) {
        router.push('/trading/trasignup')
        ElMessage({
            showClose: true,
            message: '请先登录自己的以太坊钱包账户',
            type: 'warning',
        })
        return
    }
    // console.log(useRecordStore().detailData)
    // console.log(uploadData)
    const detailDatas = useRecordStore().detailData
    // console.log(detailDatas)
    const fossilData = ref([] as any[])
    const biomass = ref([] as any[])
    const electricity = ref([] as any[])
    const process = ref([] as any[])
    const process_ceramic = ref([] as any[])
    const desulfurization = ref([] as any[])
    const information = ref([] as any[])
    detailDatas.biomass_blended_fuel.forEach((item) => {
        if ((item.linked_id) == row.id) {
            biomass.value.push(item)
        }
    })
    detailDatas.electricity_and_heat.forEach((item) => {
        if ((item.linked_id) == row.id) {
            electricity.value.push(item)
        }
    })
    detailDatas.fossil_fuel.forEach((item) => {
        // console.log(item.linked_id)
        // console.log(itemId.value)
        if ((item.linked_id) == row.id) {
            fossilData.value.push(item)
        }
    })
    detailDatas.industrial_process.forEach((item) => {
        if ((item.linked_id) == row.id) {
            process.value.push(item)
        }
    })
    detailDatas.industrial_process_ceramic.forEach((item) => {
        if ((item.linked_id) == row.id) {
            process_ceramic.value.push(item)
        }
    })
    detailDatas.desulfurization.forEach((item) => {
        if ((item.linked_id) == row.id) {
            desulfurization.value.push(item)
        }
    })
    detailDatas.information.forEach((item) => {
        if ((item.linked_id) == row.id) {
            information.value.push(item)
        }
    })
    // console.log(fossilData, biomass, electricity, process, process_ceramic, desulfurization , information)
    let data = {
        fossilData, biomass, electricity, process, process_ceramic, desulfurization, information
    }
    let jsonData = JSON.stringify(data)
    try {
        await addCarbonReport(privatKey_input.value, getAddress()!, jsonData)
        await createUser(row.enid, getAddress()!, 100, 100, privatKey_input.value, row.enid)
    } catch (error) {
        ElMessage({
            showClose:true,
            type:"error"
        })
    }
    // console.log(jsonData)
    // console.log(typeof(jsonData))
    // console.log(metacoin.methods.getCarbonReportData().call())
    // console.log(row.enid, getAddress()!, row.carbonCoin, 100, privatKey_input.value)
    // createUser(row.enid, getAddress()!, 100, 100, privatKey_input.value)
}

const handleEdit = async (index: number, row: Record) => {
    await update(
        {
            linked_id: row.id,
            is_audited: 1
        }).then(Response => {
            ElMessage({
                showClose: true,
                message: '提交成功',
                type: 'success',
            })
        })
}

const handleDelete = async (index: number, row: Record) => {

    tableData = tableData.filter((ele) => ele.id !== row.id);
    // console.log(tableData)
    await deleteRecordApi(row.id)
        .then(Response => {
            ElMessage({
                showClose: true,
                message: '删除成功',
                type: 'success',
            })
        }).catch(error => {
        }
        ).finally(() => {

            tableData = tableData.filter((ele) => ele.id !== row.id);
            // console.log(tableData)

        })
    router.go(0)
}

const checkDetail = (index: number, row: Record) => {
    console.log(row)
    router.push({
        path: '/accounting/details',
        query: {
            id: row.id,
            enid: row.enid
        }
    });
}

const getdata = (async () => {
    await RecordApi().then(response => {
        RecordState.detailData = response?.data.data
        console.log(response?.data.data)
        const Arraydata = bundleID(response?.data.data)
        console.log(Arraydata)

        for (const key in Arraydata) {
            const value = Arraydata[key];

            detailData.push(value)
            // 将数组中每一个id值的数据加入到recordState中的store中
            // 目的是在详情中可以取出来
            // console.log("value", value);
            let enid = ''
            switch (value[0].enterprise_id) {
                case 'Aviation':
                    enid = '民航企业'
                    break;
                case 'Electric':
                    enid = '发电企业'
                    break;
                case 'Ceramics':
                    enid = '陶瓷企业'
                    break;
                case 'Glass':
                    enid = '平板玻璃企业'
                    break;
            }
            let CO2value = 0
            value.forEach((ele, index) => {
                if (index < value.length - 1) {
                    CO2value += ele.carbon_emissions
                }
            })
            console.log(value.reduce((sum, obj) => {
                    // 如果 carbon_emissions 为有效值（不为 null），则累加到总和中
                    if (obj.carbon_emissions !== undefined) {
                        console.log(sum)
                        return sum + obj.carbon_emissions;
                    }
                    return sum;
                }, 0))
                console.log(value[value.length - 1].annual_ce_quota)
            const obj = {
                username: username,
                enid: enid,
                CO2Value: CO2value,
                time: value[0].create_time,
                id: value[0].linked_id,
                is_audited: value[0].is_audited,
                carbonCoin: value[value.length - 1].annual_ce_quota - value.reduce((sum, obj) => {
                    // 如果 carbon_emissions 为有效值（不为 null），则累加到总和中
                    if (obj.carbon_emissions !== undefined) {
                        // console.log(sum)
                        return sum + obj.carbon_emissions;
                    }
                    return sum;
                }, 0)
            }
            tableData.push(obj)
        }
    })
        .catch(error => {
            // 处理请求失败的错误 
            // console.error(error);
        });
})

onMounted(() => {
    // console.log(detailData)
    getdata()
    // console.log(detailData)
})
</script>


<style>
.table {
    width: 100%;
    box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    margin-right: 80px;
}
</style>