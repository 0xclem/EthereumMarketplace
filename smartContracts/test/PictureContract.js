var PictureContract = artifacts.require('PictureContract');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
let pictureContractInstance;
contract('PictureContract', function(accounts) {
  beforeEach('setup contract for each test', async function() {
    pictureContractInstance = await PictureContract.deployed();
    const owner = await pictureContractInstance.owner();
  });

  it('should get all the contract pictures', async function() {
    const [
      addrs,
      available,
      price,
    ] = await pictureContractInstance.getPictureItems();
    expect(addrs.length).to.be.equal(10);
    expect(available.length).to.be.equal(10);
    expect(price.length).to.be.equal(10);
  });

  it('should get all a specific contract picture', async function() {
    const [
      addr,
      available,
      price,
    ] = await pictureContractInstance.getPictureItem(0);
    expect(addr).to.be.equal(accounts[0]);
    expect(available).to.be.equal(true);
    expect(price.toNumber()).to.be.equal(10);
  });

  it('should put a picture for sale', async function() {
    const tx = await pictureContractInstance.putPictureItemUpForSale(9, 10, {
      from: accounts[0],
    });
    const [
      addr,
      available,
      price,
    ] = await pictureContractInstance.getPictureItem(9);
    expect(available).to.be.equal(true);
    expect(price.toNumber()).to.be.equal(10);
  });

  it('should remove a picture from market', async function() {
    const tx = await pictureContractInstance.removeFromMarket(0);
    const [
      addr,
      available,
      price,
    ] = await pictureContractInstance.getPictureItem(0);
    expect(available).to.be.false;
  });
  it('should buy a picture and transfer the ownership', async function() {
    const tx = await pictureContractInstance.buyPictureItem(4, {
      from: accounts[1],
      value: 40,
    });
    const [
      addr,
      available,
      price,
    ] = await pictureContractInstance.getPictureItem(4);
    expect(addr).to.be.equal(accounts[1]);
  });
  it('withdraw funds', async function() {
    const tx = await pictureContractInstance.buyPictureItem(2, {
      from: accounts[1],
      value: 4000000,
    });
    const tx2 = await pictureContractInstance.withdrawFunds({
      from: accounts[0],
    });
  });
});
