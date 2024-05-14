import { getToken } from "@/utils/auth";
import { $http } from "./request"; 

// 查询所有记录

export const RecordApi = () => {
    return $http({
        method:"GET",
        url:"/AllCarbonAccounting/get",
        headers: {
            token:getToken()
        },
    })
} 

// 删除记录
export const deleteRecordApi = (recordId:string) => {
    return $http({
        method:"post",
        url:`/AllCarbonAccounting/delete/${recordId}`,
        headers: {
            token:getToken()
        },
    })
} 

export const RecordAuditedApi = () => {
    return $http({
        method:"GET",
        url:"/AllCarbonAccounting/getDataNotAudited",
        headers: {
            token:getToken()
        },
    })
} 

//提交相关接口
export const update = (data:{linked_id:string,is_audited:number}) => {
    return $http({
        method:"PUT",
        url:"/AllCarbonAccounting/submitAll",
        headers: {
            token:getToken(),
        },
        data
    })
} 