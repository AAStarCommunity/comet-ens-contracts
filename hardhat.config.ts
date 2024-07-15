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

const config: HardhatUserConfig = {
  solidity: "0.8.10",
  networks: {
    hardhat: {
      throwOnCallFailures: false,
      // @ts-ignore
      gatewayUrl: devGatewayUrl,
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${'9ebd8833fbb643bb9edb66487d06f546' || process.env.INFURA_ID}`,
      tags: ['test', 'demo'],
      chainId: 11155111,
      accounts: real_accounts,
      // @ts-ignore
      gatewayUrl,
    },
    opSepolia: {
      url: `https://optimism-sepolia.infura.io/v3/${'9ebd8833fbb643bb9edb66487d06f546' || process.env.INFURA_ID}`,
      tags: ['test', 'demo'],
      chainId: 11155420,
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
    apiKey: 'Q9DZBIZYGE36XNX5UFQR64S1X1H34YUZY4' || process.env.ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    signer: {
      default: '0xC9A6a1eBfB39BDd16c48f105c4b2A653E30acfD8',
    },
    deployer: {
      default: 1,
    },
  },
};

export default config;
