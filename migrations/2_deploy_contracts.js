const Bird = artifacts.require("Bird");

module.exports = function (deployer) {
  deployer.then(async () => {
    this.bird = await deployer.deploy(Bird);
    console.log(Bird.address)
  });
};
