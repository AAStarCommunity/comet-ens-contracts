import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ENSRegistryModule = buildModule("ENSRegistryModule", (m) => {
    const ens = m.contract("ENSRegistry");
    return { ens };
});

export default ENSRegistryModule;
