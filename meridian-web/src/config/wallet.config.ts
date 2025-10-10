/**
 * Wallet Configuration
 * Contains network configurations, contract addresses, and wallet settings
 */

// Creditcoin Network Configuration
export const CREDITCOIN_MAINNET = 102031;
export const CREDITCOIN_TESTNET = 102032;

// Default network (use testnet for development)
export const DEFAULT_CHAIN_ID = import.meta.env.VITE_CREDITCOIN_CHAIN_ID 
  ? parseInt(import.meta.env.VITE_CREDITCOIN_CHAIN_ID) 
  : CREDITCOIN_TESTNET;

// Network Configurations
export const NETWORK_CONFIGS = {
  [CREDITCOIN_MAINNET]: {
    name: 'Creditcoin Mainnet',
    chainId: CREDITCOIN_MAINNET,
    nativeCurrency: {
      name: 'Creditcoin',
      symbol: 'CTC',
      decimals: 18
    },
    rpcUrls: [
      import.meta.env.VITE_CREDITCOIN_RPC_URL || 'https://rpc.mainnet.creditcoin.network'
    ],
    blockExplorerUrls: [
      import.meta.env.VITE_BLOCK_EXPLORER_URL || 'https://explorer.creditcoin.network'
    ]
  },
  [CREDITCOIN_TESTNET]: {
    name: 'Creditcoin Testnet',
    chainId: CREDITCOIN_TESTNET,
    nativeCurrency: {
      name: 'Test Creditcoin',
      symbol: 'tCTC',
      decimals: 18
    },
    rpcUrls: [
      import.meta.env.VITE_CREDITCOIN_RPC_URL || 'https://rpc.testnet.creditcoin.network'
    ],
    blockExplorerUrls: [
      import.meta.env.VITE_BLOCK_EXPLORER_URL || 'https://testnet-explorer.creditcoin.network'
    ]
  }
};

// Web5 Configuration
export const WEB5_CONFIG = {
  dwnEndpoints: import.meta.env.VITE_WEB5_DWN_ENDPOINTS?.split(',') || [
    'https://dwn.tbddev.org/beta'
  ],
  techPreview: {
    dwnEndpoints: import.meta.env.VITE_WEB5_DWN_ENDPOINTS?.split(',') || [
      'https://dwn.tbddev.org/beta'
    ]
  },
  // Sync interval in milliseconds (5 minutes)
  syncInterval: 5 * 60 * 1000
};

// Smart Contract Addresses
export const CONTRACT_ADDRESSES = {
  [CREDITCOIN_MAINNET]: {
    dataLicense: import.meta.env.VITE_DATA_LICENSE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000'
  },
  [CREDITCOIN_TESTNET]: {
    dataLicense: import.meta.env.VITE_DATA_LICENSE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000'
  }
};

// Get contract address for current network
export const getContractAddress = (chainId: number, contractName: 'dataLicense'): string => {
  const addresses = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES];
  if (!addresses) {
    throw new Error(`No contract addresses configured for chain ID ${chainId}`);
  }
  return addresses[contractName];
};

// Wallet Connection Settings
export const WALLET_SETTINGS = {
  autoConnect: true,
  reconnectDelay: 3000,
  maxReconnectAttempts: 3
};

// DWN Schema URLs
export const DWN_SCHEMAS = {
  dataset: 'https://meridian.io/schemas/dataset',
  permission: 'https://meridian.io/schemas/permission',
  metadata: 'https://meridian.io/schemas/metadata'
};

// Permission Settings
export const PERMISSION_SETTINGS = {
  defaultExpiryMinutes: 30,
  maxExpiryDays: 365,
  aiAnalysisExpiryMinutes: 30
};
