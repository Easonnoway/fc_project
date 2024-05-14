import { $http } from "./request"; 

//登录

export const loginApi = (data:{username : string; password : string}) => {
    return $http({
        method:"POST",
        url:"/user/login",
        data,
    })
} 