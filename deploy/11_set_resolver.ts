import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { ethers } from 'hardhat'

const func = async function ({ deployments }: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const signers = await ethers.getSigners();
  const owner = signers[0].address;
  // @ts-ignore
  const registry = await ethers.getContractAt('ENSRegistry', '0x5FbDB2315678afecb367f032d93F642f64180aa3');
  // @ts-ignore
  // const resolver = await ethers.getContractAt('OffchainResolver', '0x8464135c8F25Da09e49BC8782676a84730C318bC');
  await registry.setSubnodeOwner(
    '0x0000000000000000000000000000000000000000000000000000000000000000',
    ethers.id('eth'),
    owner,
    { from: owner }
  );
  await registry.setSubnodeOwner(
    ethers.namehash('eth'),
    ethers.id('ethpaymaster'),
    owner,
    { from: owner }
  );
  await registry.setResolver(
    ethers.namehash('ethpaymaster.eth'),
    "0x8464135c8F25Da09e49BC8782676a84730C318bC",
    { from: owner }
  );
};

func.tags = ['test'];

export default func;
