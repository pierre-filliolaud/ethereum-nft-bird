// Based on https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.5.1/test/examples/SimpleToken.test.js

const { expect } = require('chai');

// Import utilities from Test Helpers
const { BN, expectEvent, expectRevert, constants } = require('@openzeppelin/test-helpers');

const Bird = artifacts.require('./Bird.sol')

contract('Bird', (accounts) => {

  before(async () => {
    this.bird = await Bird.deployed()
  });

  it('deploys successfully', async () => {
    const address = await this.bird.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })
})