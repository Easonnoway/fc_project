pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
import "./SafeMath.sol";
// SPDX-License-Identifier: MIT
contract CarbonTrading {
    using SafeMath for uint256;
    struct Transaction {
        address buyer;
        address seller;
        uint256 amount;
        uint256 price;
    }
    mapping(address => Transaction[]) public accountTransactions;//根据用户交易地址找到该用户参与的所有交易

    struct User {
        string  enterprise_type;
        address carbonAccount;
        int256 carbonCredit;
        uint256 stableCoin;
    } 
    mapping(address=>User) public users;//通过用户地址找到该用户
    event TransactionTrace(address  buyer, address  seller, uint256 amount, uint256 price);//记录交易信息的事件

//存储交易信息的函数
    function createTransaction (address _buyer, address _seller, uint256 _amount,uint256 _price) public  {
        Transaction memory newTransaction = Transaction({
            buyer: _buyer,
            seller: _seller,
            amount: _amount,
            price:_price
        });
        //存储交易信息到数组中
        accountTransactions[_buyer].push(newTransaction);
        accountTransactions[_seller].push(newTransaction);
    }
    //创建用户的函数
    function createUser (string memory _enterprise_type,address _carbonAccount, int256 _carbonCredit, uint256 _stableCoin) public {
        require(users[_carbonAccount].carbonAccount == address(0), "User already exists");//判断账户是否已经存在
        
        User memory newUser = User(_enterprise_type,_carbonAccount, _carbonCredit, _stableCoin);//储存账户信息
        users[_carbonAccount] = newUser;
    }
    
    //购买碳币的函数 ，传入买家和卖家的结构体，交易数额和价格
    function buyCarbonCredits (address _buyer,address _seller,uint _amount,uint _price) public {
    // 检查买家和卖家的合法性
    require(users[_buyer].carbonAccount != address(0), "Buyer does not exist");
    require(users[_seller].carbonAccount != address(0), "Seller does not exist");

    // 确保买家具有足够的稳定币余额
    require(users[_buyer].stableCoin >= _amount.mul(_price), "Insufficient stable coin balance");
    // 确保卖家具有足够的碳币余额
    require(users[_seller].carbonCredit >= int(_amount), "Insufficient carbon credit balance");

    // 计算交易金额
    uint256 totalPrice = _amount.mul(_price);

    // 更新买家和卖家的碳币和稳定币余额
    users[_buyer].stableCoin = users[_buyer].stableCoin.sub(totalPrice);
    users[_buyer].carbonCredit +=int(_amount) ;
    users[_seller].stableCoin = users[_seller].stableCoin.add(totalPrice);
    users[_seller].carbonCredit -= int(_amount);
    //触发交易事件
    emit TransactionTrace(_buyer, _seller, _amount, _price);
    // 交易完成
}

    function getTransactionsByAccount(address _account) public view returns (Transaction[] memory) {
        require(accountTransactions[_account].length > 0, "No transactions found for the account");
        return accountTransactions[_account];
}


    function getUser(address _carbonAccount) public view returns (string memory, address, int, uint) {
        User memory user = users[_carbonAccount];//根据地址查询账户的信息
        require(user.carbonAccount != address(0), "User does not exist");
        
        return (user.enterprise_type,user.carbonAccount, user.carbonCredit, user.stableCoin);
    }

    
}