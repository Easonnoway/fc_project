import { $http } from "./request";
import { getToken } from "@/utils/auth";

export const getuserApi = (data: {

}) => {
    return $http({
        headers: {
            token: getToken(),
        },
        method: "GET",
        url: "/Admin/getUserDataNotPage",
        data,
    });
};