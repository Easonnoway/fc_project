import { $http } from "./request";
import { getToken } from "@/utils/auth";

export const changestatusApi = (data: {
    id: number;
    status: number;
}) => {
    return $http({
        headers: {
            token: getToken(),
        },
        method: "PUT",
        url: "/Admin/modifyUserState",
        data,
    });
};