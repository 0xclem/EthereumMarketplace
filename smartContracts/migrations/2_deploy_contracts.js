var PictureContract = artifacts.require('./PictureContract.sol');

module.exports = function(deployer) {
  deployer.deploy(PictureContract);
};
