import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig } from "axios";
import { ElLoading, ElMessage } from "element-plus";
export const httpInstance = axios.create();

export type BkResponse = {
  data: any;
  code: number;
  message: string;
};

//设置请求路径
httpInstance.defaults.baseURL = "http://8.137.105.46:8080";

//设置响应拦截器
export const $http = async (config: AxiosRequestConfig) => {
  const loadingInstance = ElLoading.service();
  try {
    const res = await httpInstance<BkResponse>(config);
    if (res.status = 200){
      loadingInstance.close()
    }
    return res;
  } catch (err) {
    if (err instanceof AxiosError) {
      ElMessage.error("网络错误");
    }
  } finally {
  }
};

//设置响应拦截器
