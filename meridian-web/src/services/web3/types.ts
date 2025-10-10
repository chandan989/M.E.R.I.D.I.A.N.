/**
 * Web3 Service Types
 * Type definitions for blockchain operations
 */

import { ethers } from 'ethers';

// Web3 Connection Result
export interface Web3ConnectionResult {
  address: string;
  chainId: number;
  provider: ethers.BrowserProvider;
  signer: ethers.Signer;
}

// Transaction Request
export interface TransactionRequest {
  to: string;
  data?: string;
  value?: bigint;
  gasLimit?: bigint;
  gasPrice?: bigint;
}

// Transaction Receipt
export interface TransactionReceipt {
  transactionHash: string;
  blockNumber: number;
  status: 'success' | 'failed';
  gasUsed: bigint;
  events?: any[];
}

// Transaction Status
export type TransactionStatus = 'pending' | 'confirming' | 'success' | 'failed';

// Network Info
export interface NetworkInfo {
  chainId: number;
  name: string;
  ensAddress?: string;
}

// Account Change Event
export interface AccountChangeEvent {
  accounts: string[];
}

// Chain Change Event
export interface ChainChangeEvent {
  chainId: string;
}

// Web3 Error
export class Web3Error extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'Web3Error';
  }
}

// Ethereum Window Interface
declare global {
  interface Window {
    ethereum?: any;
  }
}
