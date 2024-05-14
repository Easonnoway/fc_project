import Cookies from "js-cookie";

const loginState = "loginState";
const TraloginState = "TraloginState";

export function getloginState() {
  return Cookies.get(loginState); //获取键名为Admin-Token的值
}

export function setloginState(token: string) {
  return Cookies.set(loginState, token); //设置键名Admin-Token，值为token
}

export function removeloginState() {
  return Cookies.remove(loginState); //移除键名为Admin-Token的值
}

export function getTraloginState() {
  return Cookies.get(TraloginState); //获取键名为Admin-Token的值
}

export function setTraloginState(token: string) {
  return Cookies.set(TraloginState, token); //设置键名Admin-Token，值为token
}

export function removeTraloginState() {
  return Cookies.remove(TraloginState); //移除键名为Admin-Token的值
}
