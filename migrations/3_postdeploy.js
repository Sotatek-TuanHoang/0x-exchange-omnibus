const Exchange = artifacts.require('Exchange');
const LibAssetData = artifacts.require('LibAssetData');
const LibDydxBalance = artifacts.require('LibDydxBalance');
const LibOrderTransferSimulation = artifacts.require('LibOrderTransferSimulation');
const LibTransactionDecoder = artifacts.require('LibTransactionDecoder');
const DevUtils = artifacts.require('DevUtils');

const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'

module.exports = async (deployer, network, accounts) => {
    const txDefaults = { from: '0x6b92e5374bbc7db1dd4c2fb422d25b1874473953', overwrite: false }

    await deployer.deploy(LibAssetData, txDefaults);
    deployer.link(LibAssetData, LibDydxBalance);
    await deployer.deploy(LibDydxBalance, txDefaults);
    await deployer.deploy(LibOrderTransferSimulation, txDefaults);
    await deployer.deploy(LibTransactionDecoder, txDefaults);

    deployer.link(LibAssetData, DevUtils);
    deployer.link(LibDydxBalance, DevUtils);
    deployer.link(LibOrderTransferSimulation, DevUtils);
    deployer.link(LibTransactionDecoder, DevUtils);

    await deployer.deploy(DevUtils, Exchange.address, NULL_ADDRESS, NULL_ADDRESS, txDefaults);
    const devUtils = new DevUtils.web3.eth.Contract(DevUtils.abi, DevUtils.address);

    const contractAddresses = {
        devUtils: DevUtils.address,
    };

    console.log("DevUtils Address", contractAddresses);
};
