import Web3 from "web3";
export let web3 = new Web3(
  Web3.givenProvider || "https://rpc-amoy.polygon.technology/"
);
var addressReport = "0x6512beDD41258f29905F688Dc6D1C4e73E318E58";
import abiReport from "@/constract/abi1.json";
import abiTrading from "@/constract/abi2.json";
import { ElMessage } from "element-plus";
import { setenidTouser } from "@/apis/trading";
var addressTrading = "0xf7290f9a83D2463356BEDb1d090f9b8108EC29C6";
export var CarbonReport = new web3.eth.Contract(abiReport, addressReport);
export var CarbonTrading = new web3.eth.Contract(abiTrading, addressTrading);

const AdministratorPrivateKey =
  "0xbf812410bdc799c0be9cc327ab1b7b811a7eb54debe829258c2120f4e1fa41b9";
const AdministratorAddress = "0x7D8788e5103a91C1E4E692013F59880C36De700b";

export const is_matched = (address: string, privatekey: string) => {
  const account = web3.eth.accounts.privateKeyToAccount(privatekey);
  const publicKey = account.address;
  return publicKey === address;
};



export const createUser = async (
  enterprise_type: string,
  address: string,
  report:string,
  carbonCredit: number,
  privateKey: string,
  enid: string
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
    web3.eth.accounts.wallet.add(AdministratorPrivateKey);
    await CarbonReport.methods
      .createUser(enterprise_type, address, report, carbonCredit)
      .send({ from: AdministratorAddress })
      .then(async (res) => {
        ElMessage({
          showClose: true,
          message: "碳报告上链成功",
          type: "success",
        });
        await setenidTouser({ enid: enid });
      })
      .catch((error) => {
        ElMessage({
          showClose: true,
          message: "碳报告上链失败",
          type: "error",
        });
      });
    //移除钱包
    web3.eth.accounts.wallet.remove(AdministratorAddress);
  } catch (error) {
    ElMessage({
      showClose: true,
      message: "私钥格式不对",
      type: "error",
    });
    console.error(error);
    web3.eth.accounts.wallet.remove(AdministratorAddress);
    return;
  }
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
  web3.eth.accounts.wallet.add(AdministratorPrivateKey);
  ElMessage({
    showClose: true,
    message: "操作成功，上链需要5-10秒不等，请不要退出当前页面，耐心等待",
    type: "success",
  });
  await CarbonTrading.methods
    .buyCarbonCredits(buyer, seller, amount)
    .send({ from: AdministratorAddress })
    .then((res) => {
      ElMessage({
        showClose: true,
        message: "交易成功",
        type: "success",
      });
      web3.eth.accounts.wallet.remove(AdministratorAddress);
    })
    .catch((error) => {
      ElMessage({
        showClose: true,
        message: "交易失败",
        type: "error",
      });
    });
  //移除钱包
  web3.eth.accounts.wallet.remove(AdministratorAddress);
};

export const getTransactionsByAccount = async (
  privateKey: string,
  address: string
) => {
  //连接钱包
  try {
    // web3.eth.accounts.wallet.add(privateKey);
    const resultArr = new Array();
    let i = 0
    while (1) {
      const result = await CarbonTrading.methods._transData(i).call();
      console.log(result);
      if(result.buyer == '0x0000000000000000000000000000000000000000'){
        break;
      }
      resultArr.push(result)
      i++
    }
    ElMessage({
      showClose: true,
      message: "获取记录成功",
      type: "success",
    });
    //移除钱包
    // web3.eth.accounts.wallet.remove(address);
    return resultArr;
  } catch (err) {
    ElMessage({
      showClose: true,
      message: "获取交易记录失败",
      type: "error",
    });
    console.error(err);
  }
};

export const getUser = async (privateKey: string, address: string) => {
  try {
    let result = new Array();
    result[0] = await CarbonReport.methods.users(address).call();
    result[1] = await CarbonReport.methods.balanceOf(address).call();
    // result.push(balance)
    console.log(result);
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
