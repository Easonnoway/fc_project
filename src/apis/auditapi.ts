
import { getToken } from "@/utils/auth";
import { $http } from "./request";

// 审核员选择通过或者不通过

export const passAuditOrNot = (data:{linked_id:string,is_audited:number}) => {
    return $http({
        method:"PUT",
        data,
        url:"/AllCarbonAccounting/passAuditOrNot",
        headers: {
            token:getToken()
        },
    })
} 

export const getdatas = (data:{}) => {
    return $http({
        method:"GET",
        data,
        url:"",
        headers: {
            token:getToken()
        },
    })
} 
