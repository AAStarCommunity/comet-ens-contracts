import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
// import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy";
import "hardhat-deploy-ethers";

let real_accounts = undefined;
if (process.env.DEPLOYER_KEY && process.env.OWNER_KEY) {
  real_accounts = [process.env.OWNER_KEY, process.env.DEPLOYER_KEY];
}
const gatewayUrl = 'https://comet-ens-serve.onrender.com/{sender}/{data}.json';

let devGatewayUrl = 'http://localhost:8080/{sender}/{data}.json';
if (process.env.REMOTE_GATEWAY) {
  devGatewayUrl =
    `${process.env.REMOTE_GATEWAY}/{sender}/{data}.json`;
}
console.log('devGatewayUrl', devGatewayUrl);


const config: HardhatUserConfig = {
  solidity: "0.8.10",
  networks: {
    hardhat: {
      throwOnCallFailures: false,
      // @ts-ignore
      gatewayUrl: devGatewayUrl,
    },
    opSep: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_ID}`,
      tags: ['test', 'demo'],
      chainId: 3,
      accounts: real_accounts,
      // @ts-ignore
      gatewayUrl,
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_ID}`,
      tags: ['test', 'demo'],
      chainId: 3,
      accounts: real_accounts,
      // gatewayurl,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_ID}`,
      tags: ['test', 'demo'],
      chainId: 4,
      accounts: real_accounts,
      // gatewayurl,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_ID}`,
      tags: ['test', 'demo'],
      chainId: 5,
      accounts: real_accounts,
      // gatewayurl,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`,
      tags: ['demo'],
      chainId: 1,
      accounts: real_accounts,
      // gatewayurl,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    signer: {
      default: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    },
    deployer: {
      default: 1,
    },
  },
};

export default config;
