// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import './CarbonReport.sol';

contract CarbonTrading is Ownable,ERC721{
     constructor(address reportAddress,string memory name, string memory symbol)
    Ownable(msg.sender)
    ERC721(name,symbol)
     {
        report = CarbonReport(reportAddress);
    }
    CarbonReport public report;
    mapping(address => bool) public authorizedContracts;

modifier onlyAuthorizedContract() {
    require(msg.sender==owner()||authorizedContracts[msg.sender], "Only authorized contract can call this function");
    _;
}
function addAuthorizedContract(address _contract) public onlyOwner {
    authorizedContracts[_contract] = true;
}

function removeAuthorizedContract(address _contract) public onlyOwner {
    authorizedContracts[_contract] = false;
}

    struct transData{
        uint256 value;
        address seller;
        address buyer;
        uint256 timestamp;
    }
    mapping(uint256=>transData) public _transData;

    struct consumeData{
        uint256 value;
        address user;
        string activity;
        uint256 timestamp;
    }
    mapping (uint256=>consumeData)public _consumeData;

    struct htlcData{
        uint256 value;
        address user;
        uint256 timestamp;
        bool fundOrWithdraw;
    }
    mapping (uint256=>htlcData)public _htlcData;

    using Counters for Counters.Counter;
    Counters.Counter private _transIdCounter;
    function checkid()public view  returns(uint256) {
        return Counters.current(_transIdCounter);
    }
   
    event TransactionTrace(address  buyer, address  seller, uint256 amount);
    event ConsumeTrace(address user,uint256 value);

    function transNftMint(address to,uint256 _value,address _seller)internal {
        uint256 transId = _transIdCounter.current();
        setTransData(_value, _seller,to);
        _mint(to, transId);
        _transIdCounter.increment();
    }
    function consumeNftMint(address _user,uint256 _value,string memory _activity)internal {
        uint256 consumeId =_transIdCounter.current();
        setConsumeData(_value,_user,_activity);
        _mint(_user,consumeId);
        _transIdCounter.increment();
    }
    function htlcNftMint(address _user,uint256 _value,bool state)public onlyAuthorizedContract{
        uint256 htlcId=_transIdCounter.current();
        setHtlcData(_value,_user,state);
        _mint(_user,htlcId);
        _transIdCounter.increment();
    }

    function setTransData(uint256 _value,address _seller,address _buyer)internal  {
        uint256 transId=_transIdCounter.current();
        transData memory newTokenData = transData(_value,_seller,_buyer,block.timestamp);
        _transData[transId]=newTokenData;
    }
    function setConsumeData(uint256 _value,address _user,string memory _activity)internal {
        uint256 consumeId = _transIdCounter.current();
        consumeData memory newConsumeData = consumeData(_value,_user,_activity,block.timestamp);
        _consumeData[consumeId]=newConsumeData;
    }
    function setHtlcData(uint256 _value,address _user,bool state)internal  {
        uint256 htlcId = _transIdCounter.current();
        htlcData memory newHtlcData = htlcData(_value,_user,block.timestamp,state);
        _htlcData[htlcId]=newHtlcData;
    }

    function checkUserRegistered(address _user) internal view returns (bool) {
        (string memory usertype, address userAddress,string memory record) = report.getUserInfo(_user);
        require(userAddress != address(0), "Buyer does not exist");
        return true;
    }

    // 购买碳额度 
    function buyCarbonCredits (address _buyer,address _seller,uint _amount) public onlyOwner {
    require(checkUserRegistered(_buyer), "Buyer must be registered");
    require(checkUserRegistered(_seller), "Buyer must be registered");
    require(creditsBalance(_seller) >= _amount, "Insufficient carbon credit balance");
    report.burn(_seller,_amount);
    transNftMint(_buyer,_amount,_seller);
    report.makeMint(address(this), _amount);
    report.transfer(_buyer, _amount);
    emit TransactionTrace(_buyer, _seller, _amount);
}

    // 使用碳额度
    function consumeCarbonCredits(address _userAddress,uint256 _value,string memory _activity)public onlyOwner{
        require(checkUserRegistered(_userAddress),"User must be registered");
        require(creditsBalance(_userAddress)>=_value,"Insufficient carbon credits balance");
        report.burn(_userAddress, _value);
        consumeNftMint(_userAddress,_value,_activity);
        report.mint(owner(),_value);
        emit  ConsumeTrace(_userAddress,_value);
    }
    
    function creditsBalance(address account) public view returns (uint256) {
        return report.balanceOf(account);
    }

}