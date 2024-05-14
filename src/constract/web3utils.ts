import Web3 from "web3";
export let web3 = new Web3(Web3.givenProvider || "https://rpc2.sepolia.org");
var addressReport = "0x75390129F1eC89cB8C4f28827e7B16d1980FF21e";
import abiReport from "@/constract/abi1.json";
import abiTrading from "@/constract/abi2.json";
import { ElMessage } from "element-plus";
import { setenidTouser } from "@/apis/trading";
var addressTrading = "0xfDFf3b0fe0697ca7f678d98b9D9f0c630a886859";
export var CarbonReport = new web3.eth.Contract(abiReport, addressReport);
export var CarbonTrading = new web3.eth.Contract(abiTrading, addressTrading);

export const is_matched = (address: string, privatekey: string) => {
  const account = web3.eth.accounts.privateKeyToAccount(privatekey);
  const publicKey = account.address;
  return publicKey === address;
};

export const addCarbonReport = async (
  privateKey: string,
  address: string,
  ReportData: string
) => {
  //连接钱包
  try {
    if (!is_matched(address, privateKey)) {
      ElMessage({
        showClose: true,
        message: "私钥错误",
        type: "error",
      });
      return;
    }
    web3.eth.accounts.wallet.add(privateKey);
    await CarbonReport.methods
      .addCarbonReport(address, ReportData)
      .send({ from: address })
      .then((res) => {
        ElMessage({
          showClose: true,
          message: "碳报告上链成功",
          type: "success",
        });
        web3.eth.accounts.wallet.remove(address);
      })
      .catch((error) => {
        ElMessage({
          showClose: true,
          message: "碳报告上链失败",
          type: "error",
        });
      });
    //移除钱包
  } catch (error) {
    ElMessage({
      showClose: true,
      message: "私钥格式不对",
      type: "error",
    });
    console.error(error)
    web3.eth.accounts.wallet.remove(address);
    return;
  }
};

export const createUser = async (
  enterprise_type: string,
  address: string,
  carbonCredit: number,
  stableCoin: number,
  privateKey: string,
  enid:string,
) => {
  //连接钱包
  try {
    if (!is_matched(address, privateKey)) {
      ElMessage({
        showClose: true,
        message: "私钥错误",
        type: "error",
      });
      return;
    }
    web3.eth.accounts.wallet.add(privateKey);
    await CarbonTrading.methods
      .createUser(enterprise_type, address, carbonCredit, stableCoin)
      .send({ from: address })
      .then(async (res) => {
        ElMessage({
          showClose: true,
          message: "用户创建成功",
          type: "success",
        });
        await setenidTouser({enid:enid}) 
      })
      .catch((error) => {
        ElMessage({
          showClose: true,
          message: "用户创建失败",
          type: "error",
        });
      });
    //移除钱包
    web3.eth.accounts.wallet.remove(address);
  } catch (error) {
    ElMessage({
      showClose: true,
      message: "私钥格式不对",
      type: "error",
    });
    console.error(error)
    web3.eth.accounts.wallet.remove(address);
    return;
  }
};

// 交易信息上链
export const createTransaction = async (
  operator: string,
  privateKey: string,
  buyer: string,
  seller: string,
  amount: number,
  price: number
) => {
  //连接钱包
  if (!is_matched(operator, privateKey)) {
    ElMessage({
      showClose: true,
      message: "私钥错误",
      type: "error",
    });
  }
  web3.eth.accounts.wallet.add(privateKey);
  await CarbonTrading.methods
    .createTransaction(buyer, seller, amount, price)
    .send({ from: operator })
    .then((res) => {
      ElMessage({
        showClose: true,
        message: "交易数据上链成功",
        type: "success",
      });
    })
    .catch(error=> {
      ElMessage({
        showClose: true,
        message: "交易数据上链失败",
        type: "error",
      });
      console.error(error)
    });
  //移除钱包
  web3.eth.accounts.wallet.remove(operator);
};

// 进行碳币和稳定币交易
export const buyCarbonCredits = async (
  operator: string,
  privateKey: string,
  buyer: string,
  seller: string,
  amount: number,
  price: number
) => {
  //连接钱包
  if (!is_matched(operator, privateKey)) {
    ElMessage({
      showClose: true,
      message: "私钥错误",
      type: "error",
    });
  }
  web3.eth.accounts.wallet.add(privateKey);
  await CarbonTrading.methods
    .buyCarbonCredits(buyer, seller, amount, price)
    .send({ from: operator })
    .then((res) => {
      ElMessage({
        showClose: true,
        message: "交易成功",
        type: "success",
      });
    })
    .catch((error) => {
      ElMessage({
        showClose: true,
        message: "交易失败",
        type: "error",
      });
    });
  //移除钱包
  web3.eth.accounts.wallet.remove(operator);
};

export const getTransactionsByAccount = async (
  privateKey: string,
  address: string
) => {
  //连接钱包
  try {
    // web3.eth.accounts.wallet.add(privateKey);
    const result = await CarbonTrading.methods.getTransactionsByAccount(address).call()
        ElMessage({
          showClose: true,
          message: "获取记录成功",
          type: "success",
        });
    //移除钱包
    // web3.eth.accounts.wallet.remove(address);
    return result
  } catch(err) {
    ElMessage({
      showClose: true,
      message: "获取交易记录失败",
      type: "error",
    });
    console.error(err)
  }
};

export const getUser = async (privateKey: string, address: string) => {
  console.log(CarbonTrading)
  try {
    const result = await CarbonTrading.methods.getUser(address).call();
    ElMessage({
      showClose: true,
      message: "获取个人信息成功",
      type: "success",
    });
    return result;
  } catch (error) {
    ElMessage({
      showClose: true,
      message: "获取个人信息失败，检查是否有碳报告上链",
      type: "error",
    });
    console.error(error);
  }
};
