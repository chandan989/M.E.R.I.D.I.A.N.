/**
 * Application Constants
 * Storage keys, error codes, and other constant values
 */

// LocalStorage Keys
export const STORAGE_KEYS = {
  WEB5_DID: 'meridian_web5_did',
  WEB3_ADDRESS: 'meridian_web3_address',
  WEB3_CHAIN_ID: 'meridian_web3_chain_id',
  USER_TYPE: 'meridian_user_type',
  WALLET_CONNECTED: 'meridian_wallet_connected',
  LAST_CONNECTION_TIME: 'meridian_last_connection_time'
} as const;

// Error Codes
export const ERROR_CODES = {
  // Web5 Errors
  WEB5_NOT_INITIALIZED: 'WEB5_NOT_INITIALIZED',
  DID_CREATION_FAILED: 'DID_CREATION_FAILED',
  DID_RESOLUTION_FAILED: 'DID_RESOLUTION_FAILED',
  DWN_WRITE_FAILED: 'DWN_WRITE_FAILED',
  DWN_READ_FAILED: 'DWN_READ_FAILED',
  DWN_QUERY_FAILED: 'DWN_QUERY_FAILED',
  DWN_DELETE_FAILED: 'DWN_DELETE_FAILED',
  PERMISSION_GRANT_FAILED: 'PERMISSION_GRANT_FAILED',
  PERMISSION_REVOKE_FAILED: 'PERMISSION_REVOKE_FAILED',
  
  // Web3 Errors
  NO_WALLET_DETECTED: 'NO_WALLET_DETECTED',
  WALLET_CONNECTION_FAILED: 'WALLET_CONNECTION_FAILED',
  WRONG_NETWORK: 'WRONG_NETWORK',
  NETWORK_SWITCH_FAILED: 'NETWORK_SWITCH_FAILED',
  USER_REJECTED: 'USER_REJECTED',
  INSUFFICIENT_FUNDS: 'INSUFFICIENT_FUNDS',
  TRANSACTION_FAILED: 'TRANSACTION_FAILED',
  CONTRACT_ERROR: 'CONTRACT_ERROR',
  CONTRACT_NOT_FOUND: 'CONTRACT_NOT_FOUND',
  
  // Generic Errors
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR'
} as const;

// User-Friendly Error Messages
export const ERROR_MESSAGES: Record<string, string> = {
  // Web5 Errors
  [ERROR_CODES.WEB5_NOT_INITIALIZED]: 'Please connect your Web5 wallet first',
  [ERROR_CODES.DID_CREATION_FAILED]: 'Failed to create your digital identity. Please try again.',
  [ERROR_CODES.DID_RESOLUTION_FAILED]: 'Failed to resolve digital identity',
  [ERROR_CODES.DWN_WRITE_FAILED]: 'Failed to save data to your personal storage',
  [ERROR_CODES.DWN_READ_FAILED]: 'Failed to read data from storage',
  [ERROR_CODES.DWN_QUERY_FAILED]: 'Failed to query data from storage',
  [ERROR_CODES.DWN_DELETE_FAILED]: 'Failed to delete data from storage',
  [ERROR_CODES.PERMISSION_GRANT_FAILED]: 'Failed to grant access permission',
  [ERROR_CODES.PERMISSION_REVOKE_FAILED]: 'Failed to revoke access permission',
  
  // Web3 Errors
  [ERROR_CODES.NO_WALLET_DETECTED]: 'No Web3 wallet found. Please install MetaMask or another wallet.',
  [ERROR_CODES.WALLET_CONNECTION_FAILED]: 'Failed to connect wallet. Please try again.',
  [ERROR_CODES.WRONG_NETWORK]: 'Please switch to the Creditcoin network',
  [ERROR_CODES.NETWORK_SWITCH_FAILED]: 'Failed to switch network. Please switch manually in your wallet.',
  [ERROR_CODES.USER_REJECTED]: 'Transaction was cancelled',
  [ERROR_CODES.INSUFFICIENT_FUNDS]: 'Insufficient funds to complete this transaction',
  [ERROR_CODES.TRANSACTION_FAILED]: 'Transaction failed. Please try again.',
  [ERROR_CODES.CONTRACT_ERROR]: 'Smart contract operation failed',
  [ERROR_CODES.CONTRACT_NOT_FOUND]: 'Smart contract not found on this network',
  
  // Generic Errors
  [ERROR_CODES.UNKNOWN_ERROR]: 'An unexpected error occurred. Please try again.',
  [ERROR_CODES.NETWORK_ERROR]: 'Network connection error. Please check your internet connection.',
  [ERROR_CODES.TIMEOUT_ERROR]: 'Request timed out. Please try again.',
  [ERROR_CODES.VALIDATION_ERROR]: 'Invalid input. Please check your data and try again.'
};

// Transaction Status
export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  CONFIRMING: 'confirming',
  SUCCESS: 'success',
  FAILED: 'failed'
} as const;

// Permission Scopes
export const PERMISSION_SCOPES = {
  READ: 'Read',
  WRITE: 'Write',
  DELETE: 'Delete'
} as const;

// User Types
export const USER_TYPES = {
  PROVIDER: 'provider',
  BUYER: 'buyer'
} as const;

// Wallet Connection Status
export const CONNECTION_STATUS = {
  DISCONNECTED: 'disconnected',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  ERROR: 'error'
} as const;

// Gas Estimation Buffer (20% extra)
export const GAS_ESTIMATION_BUFFER = 1.2;

// Transaction Confirmation Blocks
export const CONFIRMATION_BLOCKS = 12;

// Retry Configuration
export const RETRY_CONFIG = {
  maxAttempts: 3,
  initialDelayMs: 1000,
  maxDelayMs: 5000,
  backoffMultiplier: 2
};

// File Upload Limits
export const FILE_LIMITS = {
  maxSizeBytes: 100 * 1024 * 1024, // 100MB
  allowedTypes: [
    'text/csv',
    'application/json',
    'text/plain',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ]
};

// DID Format Regex
export const DID_REGEX = /^did:[a-z0-9]+:[a-zA-Z0-9._-]+$/;

// Ethereum Address Regex
export const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

// Truncate Address/DID Display
export const TRUNCATE_CONFIG = {
  start: 6,
  end: 4,
  separator: '...'
};
