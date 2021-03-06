const HDWalletProvider = require('@truffle/hdwallet-provider');

require('dotenv').config();

module.exports = {
    /**
     * Networks define how you connect to your ethereum client and let you set the
     * defaults web3 uses to send transactions. If you don't specify one truffle
     * will spin up a development blockchain for you on port 9545 when you
     * run `develop` or `test`. You can ask a truffle command to use a specific
     * network from the command line, e.g
     *
     * $ truffle test --network <network-name>
     */

    networks: {
        // Useful for testing. The `development` name is special - truffle uses it by default
        // if it's defined here and no other network is specified at the command line.
        // You should run a client (like ganache-cli, geth or parity) in a separate terminal
        // tab if you use this network and you must also set the `host`, `port` and `network_id`
        // options below to some value.
        //
        development: {
            host: "127.0.0.1",
            port: 22002,
            network_id: "*",
            from: '0x6b92e5374bbc7db1dd4c2fb422d25b1874473953',
            gas: 10000000000,
            // gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
            gasPrice: 1000000000,  // 20 gwei (in wei) (default: 100 gwei)
        },
       injective: {
            provider: function() {
              return new HDWalletProvider(
                process.env.DEPLOYER_PRIVATE_KEY,
                `http://127.0.0.1:1317`
              )
            },
            network_id: 888,
            skipDryRun: true,
            gasPrice: 0,
            gas: 80000000
        },
    },

    // Set default mocha options here, use special reporters etc.
    mocha: {
        // timeout: 100000
    },

    compilers: {
        solc: {
            version: "0.6.0",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200
                },
                evmVersion: "petersburg"
            }
        }
    }
}
