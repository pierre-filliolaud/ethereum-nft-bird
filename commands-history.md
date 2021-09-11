npm install -g truffle
truffle init
npm init
npm install @openzeppelin/contracts@3.4.1
npm install @openzeppelin/test-helpers
npm install

truffle compile
truffle migrate

truffle console
contract = await Bird.deployed()
contract
contract.address

contract.mint('#cscscs')
totalSupply = await contract.totalSupply()
