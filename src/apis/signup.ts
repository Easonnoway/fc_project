import { $http } from "./request"; 

//注册

export const signupApi = (data:{username : string; password : string; identity : number}) => {
    return $http({
        method:"POST",
        url:"/user/register",
        data,
    })
} 