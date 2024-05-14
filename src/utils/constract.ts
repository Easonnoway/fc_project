import Cookies from "js-cookie";

const address = "address";
const enid = 'enid'

export function getAddress() {
  return Cookies.get(address); //获取键名为Admin-Token的值
}

export function setAddress(token: string) {
  return Cookies.set(address, token); //设置键名Admin-Token，值为token
}

export function removeAddress() {
  return Cookies.remove(address); //移除键名为Admin-Token的值
}

export function getEnid() {
  return Cookies.get(enid); //获取键名为Admin-Token的值
}

export function setEnid(token: string) {
  return Cookies.set(enid, token); //设置键名Admin-Token，值为token
}

export function removeEnid() {
  return Cookies.remove(enid); //移除键名为Admin-Token的值
}