require('@nomiclabs/hardhat-waffle');
require('dotenv').config();
require("@nomiclabs/hardhat-etherscan");


const { STAGING_ALCHEMY_KEY, PRIVATE_KEY, PROD_ALCHEMY_KEY, ETHERSCAN_API } = process.env;


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.0',
  networks: {
    rinkeby: {
      url: STAGING_ALCHEMY_KEY,
      accounts: [PRIVATE_KEY],
    },
    mainnet: {
      chainId: 1,
      url: PROD_ALCHEMY_KEY,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API
  }
};