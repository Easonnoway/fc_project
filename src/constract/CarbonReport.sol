// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract CarbonReport is ERC20,Ownable{
  constructor(string memory _name, string memory _symbol)
Ownable(msg.sender)
ERC20(_name,_symbol)
{
  _mint(msg.sender, 10000);
  createUser('Token Pool', msg.sender,'',0);
}
mapping(address => bool) public authorizedContracts;

modifier onlyAuthorizedContract() {
    require(msg.sender==owner()||authorizedContracts[msg.sender], "Only authorized contract can call this function");
    _;
}
function addAuthorizedContract(address _contract) external  onlyOwner {
    authorizedContracts[_contract] = true;
}

function removeAuthorizedContract(address _contract) external  onlyOwner {
    authorizedContracts[_contract] = false;
}

struct User {
        string  enterprise_type;
        address carbonAccount;
        string record;
    } 
     mapping(address=>User) public users;
  function getUserInfo(address _user) public view returns (string memory, address,string memory) {
    return (users[_user].enterprise_type,users[_user].carbonAccount,users[_user].record);
}
    function burn(address from,uint256 value)public  onlyAuthorizedContract{
       _burn(from, value);
    }
     function mint(address to, uint256 amount) public   onlyAuthorizedContract{
        _mint(to, amount);
    }
    function makeMint(address to,uint256 amount)public onlyAuthorizedContract{
      _burn(owner(), amount);
      _mint(to, amount);
    }
    
    // 创建用户 
    function createUser (string memory _enterprise_type,address _carbonAccount,string memory record_json,uint256 initialCarbonCredits) public onlyOwner{
        require(users[_carbonAccount].carbonAccount == address(0), "User already exists");
        User memory newUser = User(_enterprise_type,_carbonAccount,record_json);
        users[_carbonAccount] = newUser;
        makeMint(_carbonAccount, initialCarbonCredits);
    }
 
}