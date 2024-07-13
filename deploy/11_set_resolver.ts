import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { ethers } from 'hardhat'

const func = async function ({ deployments, getNamedAccounts }: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const signers = await ethers.getSigners();
  let owner = '0x9AA1F980345586B816997a19af045552Aa085AdF' || signers[0].address;

  const { deployer, signer } = await getNamedAccounts();
  owner = signer;
  console.log(deployer, signer, 'get some args');

  // @ts-ignore
  const registry = await ethers.getContractAt('ENSRegistry', '0x22E1C82Ea3Fbdf9Ec45fB91c5CF8111A54a51E8F');
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
    "0x316a40C21E6Ee5a8Bf0fB0793B427c03a6986E3e",
    { from: owner }
  );

  console.log('set resolver done');
};

func.tags = ['test'];

export default func;
