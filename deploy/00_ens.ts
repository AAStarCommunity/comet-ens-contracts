import { ethers } from 'hardhat';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

async function func(hre: HardhatRuntimeEnvironment) {
    const { deployments } = hre;
    const { deploy } = deployments;
    const signers = await ethers.getSigners();
    const owner = signers[0].address;
    await deploy('ENSRegistry', {
        from: owner,
        args: [],
        log: true,
    });
};

func.id = 'ens'
func.tags = ['test'];

export default func;
