require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.26",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10000
      },
      evmVersion: "cancun",
      viaIR: true
    }
  },
  networks: {
    // Local Hardhat network for development
    hardhat: {
      chainId: 1337
    },
    
    // Creditcoin Testnet configuration
    "creditcoin-testnet": {
      url: "https://rpc.cc3-testnet.creditcoin.network",
      accounts: ["1e8d32fa33366b326512ff8da6fc1b30aadef05ca7a45c8402699e7bd3a128fb"],
      chainId: 102031,
      timeout: 60000
    },
    
    // Alternative testnet configs to try
    "creditcoin-testnet-alt": {
      url: "https://testnet-rpc.creditcoin.org",
      accounts: ["1e8d32fa33366b326512ff8da6fc1b30aadef05ca7a45c8402699e7bd3a128fb"],
      chainId: 102031,
      timeout: 60000
    },
    
    // Creditcoin Mainnet configuration
    "creditcoin-mainnet": {
      url: process.env.CREDITCOIN_MAINNET_RPC || "https://rpc.mainnet.creditcoin.network",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 102030, // Example - verify actual Creditcoin mainnet chain ID
      gasPrice: "auto"
    }
  },
  etherscan: {
    // For contract verification
    apiKey: {
      creditcoinTestnet: process.env.CREDITCOIN_API_KEY || "",
      creditcoinMainnet: process.env.CREDITCOIN_API_KEY || ""
    },
    customChains: [
      {
        network: "creditcoinTestnet",
        chainId: 102031,
        urls: {
          apiURL: "https://explorer-api.testnet.creditcoin.network/api",
          browserURL: "https://explorer.testnet.creditcoin.network"
        }
      }
    ]
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};

