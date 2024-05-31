// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonToken is ERC20, Ownable{
  constructor(
    string memory _name, 
    string memory _symbol
  ) 
    ERC20(_name, _symbol) 
    Ownable(msg.sender)
  {
    _mint(msg.sender, 10000);
  }
  
}


