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
                    <el-popconfirm width="220" @confirm="PassEdit(scope.$index, scope.row)" confirm-button-text="确定"
                        cancel-button-text="取消" icon-color="#626AEF" title="你确定执行此操作吗？">
                        <template #reference>
                            <el-button size="small" type="success">审核通过</el-button>
                        </template>
                    </el-popconfirm>
                    <el-popconfirm width="220" @confirm="NotPassEdit(scope.$index, scope.row)" confirm-button-text="确定"
                        cancel-button-text="取消" icon-color="#626AEF" title="你确定执行此操作吗？">
                        <template #reference>
                            <el-button size="small" type="danger">审核不通过</el-button>
                        </template>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import { RecordApi, RecordAuditedApi, deleteRecordApi } from '@/apis/Record';
import bundleID from '@/hooks/useBinding';
import { onMounted, reactive, toRaw } from 'vue';
import { getUsername } from '@/utils/auth';
import router from '@/router';
import { useRecordStore } from '@/store/RecordState';
import { passAuditOrNot } from '@/apis/auditapi';
import { ElMessage } from 'element-plus';

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
}

let tableData: Record[] = reactive([

])

const PassEdit = async (index: number, row: Record) => {
    // console.log(index, row)
    // console.log(tableData)
    await passAuditOrNot({
        linked_id: row.id,
        is_audited: 3
    }).then(response => {
        ElMessage({
            showClose: true,
            message: '操作成功',
            type: 'success',
        })
    }).catch(error => {

    })
}

const NotPassEdit = async (index: number, row: Record) => {
    await passAuditOrNot({
        linked_id: row.id,
        is_audited: 2
    }).then(response => {
        ElMessage({
            showClose: true,
            message: '操作成功',
            type: 'success',
        })
    }).catch(error => {

    })
}

const checkDetail = (index: number, row: Record) => {
    router.push({
        path: '/auditdetail',
        query: {
            id: row.id,
            enid: row.enid
        }
    });
}

onMounted(async () => {
    await RecordAuditedApi().then((response) => {

        RecordState.detailData = response?.data.data
        console.log(response?.data.data)
        const Arraydata = bundleID(response?.data.data)
        console.log(Arraydata)

        for (const key in Arraydata) {
            const value = Arraydata[key];
            detailData.push(value)
            // 将数组中每一个id值的数据加入到recordState中的store中
            // 目的是在详情中可以取出来
            // console.log(value);
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
            const obj = {
                username: username,
                enid: enid,
                CO2Value: CO2value,
                time: value[0].create_time,
                id: value[0].linked_id,
                is_audited: value[0].is_audited,
            }
            tableData.push(obj)
        }
        // console.log(tableData)
        // console.log(detailData)
    })
        .catch(error => {
            // 处理请求失败的错误 
            // console.error(error);
        });
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