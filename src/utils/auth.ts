import Cookies from "js-cookie";
 
const TokenKey = "token";
const UsernameKey = "username";
const IdentityKey = "identity"
 
export function getToken() {
  return Cookies.get(TokenKey); //获取键名为Admin-Token的值
}
 
export function setToken(token: string) { 
  return Cookies.set(TokenKey, token); //设置键名Admin-Token，值为token
}
 
export function removeToken() {
  return Cookies.remove(TokenKey); //移除键名为Admin-Token的值
}

export function getUsername() {
  return Cookies.get(UsernameKey); //获取键名为Admin-Token的值
}
 
export function setUsername(username: string) { 
  return Cookies.set(UsernameKey, username); //设置键名Admin-Token，值为token
}
 
export function removeUsername() {
  return Cookies.remove(UsernameKey); //移除键名为Admin-Token的值
}
export function getIdentity() {
  return Cookies.get(IdentityKey); //获取键名为Admin-Token的值
}
 
export function setIdentity(identity: string) { 
  return Cookies.set(IdentityKey, identity); //设置键名Admin-Token，值为token
}
 
export function removeIdentity() {
  return Cookies.remove(IdentityKey); //移除键名为Admin-Token的值
}