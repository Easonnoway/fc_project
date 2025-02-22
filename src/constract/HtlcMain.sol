// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import './CarbonToken.sol';
contract HtlcAmoy is Ownable {
    CarbonToken public token;
    constructor(address tokenAddress)
    Ownable(msg.sender)
    {
    token= CarbonToken(tokenAddress);
    }
    uint256 public lockTime=7 days;
    using Counters for Counters.Counter;
    Counters.Counter private htlcIdCounter;

    function checkid()public view  returns(uint256) {
        return Counters.current(htlcIdCounter);
    }
    
    struct SwapInfo {
        uint256 startTime;
        string secret;
        bytes32 hash;
        address sender;
        address recipient;
        uint256 amount;
        bool completed;
    }

    mapping(uint256 => SwapInfo) public swaps;

    function createSwap(
        bytes32 _hash,
        address _recipient,
        uint256 _amount
    ) external returns(uint256 id){
        uint256 id = htlcIdCounter.current();
        require(swaps[id].startTime == 0, "Swap already exists");
        require(_recipient != address(0), "Invalid recipient");
        require(_amount > 0, "Amount must be greater than 0");

        swaps[id] = SwapInfo({
            startTime: block.timestamp,
            secret: '',
            hash: _hash,
            sender: msg.sender,
            recipient: _recipient,
            amount: _amount,
            completed: false
        });
        
        fund();
        htlcIdCounter.increment();
        return id;
    }

    function fund() internal {
        uint256 id = htlcIdCounter.current();
        SwapInfo storage swap = swaps[id];
        require(swap.startTime > 0, "Swap does not exist");
        require(!swap.completed, "Swap already completed");
        token.transferFrom(msg.sender, address(this), swap.amount);
    }

    function withdraw(uint256 id, string memory _secret) external {
        SwapInfo storage swap = swaps[id];
        require(swap.startTime > 0, "Swap does not exist");
        require(!swap.completed, "Swap already completed");
        require(swap.hash == keccak256(abi.encodePacked(_secret)), "Invalid secret");
        swap.secret = _secret;
        swap.completed = true;
        token.transfer(swap.recipient, swap.amount);
    }

    function refund(uint256 id) external {
        SwapInfo storage swap = swaps[id];
        require(swap.startTime > 0, "Swap does not exist");
        require(!swap.completed, "Swap already completed");
        require(block.timestamp > swap.startTime + lockTime, "Lock time not expired");
        require(msg.sender==swap.sender,"Invalid sender");
        swap.completed = true;
        token.transfer(swap.sender, swap.amount);
    }

    function resetSwap(uint256 id) external onlyOwner {
        SwapInfo storage swap = swaps[id];
        require(swap.startTime > 0, "Swap does not exist");
        require(swap.completed, "Swap is not completed");
        delete swaps[id];
    }
    
}