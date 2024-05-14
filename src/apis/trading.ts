import { $http } from "./request";
import { getToken } from "@/utils/auth";

export const addMessage = (data: {
  status: number;
  number_of_carbon_coins: number;
  retention_time: number;
  isAnonymity: boolean;
  description: string;
  price_of_carbon_coin: number;
  enid: string;
  keyId: string;
}) => {
  return $http({
    headers: {
      token: getToken(),
    },
    method: "POST",
    url: "/CarbonTrading/add",
    data,
  });
};

export const getMarket1 = () => {
  return $http({
    headers: {
      token: getToken(),
    },
    method: "GET",
    url: "/CarbonTrading/tradingMarket/1",
  });
};

export const getMarket2 = () => {
  return $http({
    headers: {
      token: getToken(),
    },
    method: "GET",
    url: "/CarbonTrading/tradingMarket/2",
  });
};

export const setaddressTouser = (data: { address: string }) => {
  return $http({
    headers: {
      token: getToken(),
    },
    method: "PUT",
    url: "/user/setCarbonTradingData",
    data,
  });
};

export const cheackaddressTouser = (data: { address: string }) => {
  return $http({
    headers: {
      token: getToken(),
    },
    method: "POST",
    url: "/user/checkAddress",
    data,
  });
};

export const setenidTouser = (data: { enid: string }) => {
  return $http({
    headers: {
      token: getToken(),
    },
    method: "PUT",
    url: "/user/setCarbonTradingData",
    data,
  });
};

export const deleteMessage = (data: { keyId: string }) => {
  return $http({
    headers: {
      token: getToken(),
    },
    method: "POST",
    url: "/user/deleteMessage",
    data,
  });
};
