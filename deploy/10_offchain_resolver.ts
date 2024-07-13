import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async function ({ getNamedAccounts, deployments, network }: HardhatRuntimeEnvironment) {
    const { deploy } = deployments;
    const { deployer, signer } = await getNamedAccounts();
    // @ts-ignore
    if (!network.config?.gatewayUrl) {
        throw ("gatewayurl is missing on hardhat.config.ts");
    }
    console.log(deployer, signer);

    await deploy('OffchainResolver', {
        from: deployer,
        // @ts-ignore
        args: [network.config?.gatewayUrl, [signer]],
        log: true,
    });
};
func.tags = ['test', 'demo'];

export default func;


