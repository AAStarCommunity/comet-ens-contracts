import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { ethers } from 'hardhat'

const func = async function ({ deployments, getNamedAccounts }: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const signers = await ethers.getSigners();
  const owner = signers[0].address;

  // @ts-ignore
  const registry = await ethers.getContract('ENSRegistry');
  const resolver = await ethers.getContract('OffchainResolver');

  const resolverAddress = await resolver.getAddress();

  // @ts-ignore
  await registry.setSubnodeOwner(
    '0x0000000000000000000000000000000000000000000000000000000000000000',
    ethers.id('eth'),
    owner,
    { from: owner }
  );
  // @ts-ignore
  await registry.setSubnodeOwner(
    ethers.namehash('eth'),
    ethers.id('ethpaymaster'),
    owner,
    { from: owner }
  );
  // @ts-ignore
  await registry.setResolver(
    ethers.namehash('ethpaymaster.eth'),
    resolverAddress,
    { from: owner }
  );

  console.log('set resolver done');
};

func.tags = ['test'];

export default func;
