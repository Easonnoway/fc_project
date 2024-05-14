/**
 *Submitted for verification at Etherscan.io on 2024-04-03
*/

pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
// SPDX-License-Identifier: MIT

contract CarbonReport{

	string record;
	mapping(address=>string)public records;

  address owner=0x7D8788e5103a91C1E4E692013F59880C36De700b;
  modifier onlyOwner(){
    require(msg.sender==owner,"Only the contract owner can use this function.");
    _;
  }
	
 	function addCarbonReport (
        address recordAddress,
 		string memory record_json
        )
 		 public onlyOwner{
 		 	records[recordAddress]=record_json;
  }

  function addressExists(address recordAddress) internal view returns (bool) {
    return bytes(records[recordAddress]).length > 0;
}

  function getCarbonReport(address recordAddress) public view returns (string memory) {
        if(!addressExists(recordAddress)){
          return "Address does not exists.";
        }
        return records[recordAddress];
  }


}