import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const OffchainResolverModule = buildModule("OffchainResolver", (m) => {
    const offchainResolver = m.contract("OffchainResolver", ['https://comet-ens-serve.onrender.com/{sender}/{data}.json', ['0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266']]);

    return { offchainResolver };
});

export default OffchainResolverModule;
