// import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func = async function func({ getNamedAccounts, deployments, network }: HardhatRuntimeEnvironment) {
    const { deploy } = deployments;
    const { deployer, signer } = await getNamedAccounts();
    // @ts-ignore
    if (!network.config?.gatewayurl) {
        throw ("gatewayurl is missing on hardhat.config.js");
    }
    await deploy('OffchainResolver', {
        from: deployer,
        // @ts-ignore
        args: ['http://localhost:8080/{sender}/{data}.json', [signer]],
        log: true,
    });
};
func.tags = ['test', 'demo'];

export default func;


