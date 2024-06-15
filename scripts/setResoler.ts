import hre, { ethers } from "hardhat";
// const { ethers } = require('hardhat');

import ENSRegistryModule from '../ignition/modules/Ens';
import OffchainResolverModule from '../ignition/modules/OffchainResolver';

async function main() {

  const { ens } = await hre.ignition.deploy(ENSRegistryModule);
  const { offchainResolver } = await hre.ignition.deploy(OffchainResolverModule);
  const ENSRegistry = await ethers.getContractAt('ENSRegistry', await ens.getAddress());
  const signers = await ethers.getSigners();
  const owner = signers[0].address;
  const resolverAddress = await offchainResolver.getAddress();

  await ENSRegistry.setSubnodeOwner(
    '0x0000000000000000000000000000000000000000000000000000000000000000',
    ethers.id('eth'),
    owner,
    { from: owner }
  );
  await ENSRegistry.setSubnodeOwner(
    ethers.namehash('eth'),
    ethers.id('ethpaymaster'),
    owner,
    { from: owner }
  );
  await ENSRegistry.setResolver(
    ethers.namehash('ethpaymaster.eth'),
    resolverAddress,
    { from: owner }
  );
  console.log('ok');

  const o1 = await ENSRegistry.owner(ethers.namehash('ethpaymaster.eth'));
  const o2 = await ENSRegistry.resolver(ethers.namehash('ethpaymaster.eth'));
  console.log(o1, o2);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
