/**
 * Web3 Service
 * Manages blockchain interactions and smart contract operations
 */

import { ethers } from 'ethers';
import { NETWORK_CONFIGS, DEFAULT_CHAIN_ID } from '@/config/wallet.config';
import { STORAGE_KEYS, ERROR_CODES, ERROR_MESSAGES } from '@/config/constants';
import {
  Web3ConnectionResult,
  TransactionRequest,
  TransactionReceipt,
  TransactionStatus,
  NetworkInfo,
  Web3Error
} from './types';

class Web3Service {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.Signer | null = null;
  private address: string | null = null;
  private chainId: number | null = null;
  private eventListeners: Map<string, Function[]> = new Map();

  /**
   * Initialize Web3 service
   */
  async initialize(): Promise<void> {
    if (!window.ethereum) {
      console.warn('No Web3 wallet detected');
      return;
    }

    // Check for stored connection
    const storedAddress = localStorage.getItem(STORAGE_KEYS.WEB3_ADDRESS);
    const storedChainId = localStorage.getItem(STORAGE_KEYS.WEB3_CHAIN_ID);

    if (storedAddress && storedChainId) {
      try {
        await this.connect();
      } catch (error) {
        console.error('Failed to restore Web3 connection:', error);
        this.clearStorage();
      }
    }
  }

  /**
   * Connect to Web3 wallet
   */
  async connect(): Promise<Web3ConnectionResult> {
    if (!window.ethereum) {
      throw new Web3Error(
        ERROR_MESSAGES[ERROR_CODES.NO_WALLET_DETECTED],
        ERROR_CODES.NO_WALLET_DETECTED
      );
    }

    try {
      // Create provider
      this.provider = new ethers.BrowserProvider(window.ethereum);

      // Request account access
      const accounts = await this.provider.send('eth_requestAccounts', []);
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }

      this.address = accounts[0];

      // Get network
      const network = await this.provider.getNetwork();
      this.chainId = Number(network.chainId);

      // Verify correct network
      if (this.chainId !== DEFAULT_CHAIN_ID) {
        console.warn(`Wrong network detected: ${this.chainId}, switching to ${DEFAULT_CHAIN_ID}`);
        await this.switchNetwork(DEFAULT_CHAIN_ID);
      }

      // Get signer
      this.signer = await this.provider.getSigner();

      // Store connection state
      localStorage.setItem(STORAGE_KEYS.WEB3_ADDRESS, this.address);
      localStorage.setItem(STORAGE_KEYS.WEB3_CHAIN_ID, this.chainId.toString());
      localStorage.setItem(STORAGE_KEYS.LAST_CONNECTION_TIME, Date.now().toString());

      // Setup event listeners
      this.setupEventListeners();

      console.log('Connected to Web3:', {
        address: this.address,
        chainId: this.chainId
      });

      return {
        address: this.address,
        chainId: this.chainId,
        provider: this.provider,
        signer: this.signer
      };
    } catch (error: any) {
      console.error('Failed to connect to Web3:', error);
      
      // Handle user rejection
      if (error.code === 4001 || error.code === 'ACTION_REJECTED') {
        throw new Web3Error(
          ERROR_MESSAGES[ERROR_CODES.USER_REJECTED],
          ERROR_CODES.USER_REJECTED,
          error
        );
      }

      throw new Web3Error(
        ERROR_MESSAGES[ERROR_CODES.WALLET_CONNECTION_FAILED],
        ERROR_CODES.WALLET_CONNECTION_FAILED,
        error
      );
    }
  }

  /**
   * Disconnect from Web3
   */
  async disconnect(): Promise<void> {
    this.provider = null;
    this.signer = null;
    this.address = null;
    this.chainId = null;

    // Remove event listeners
    this.removeEventListeners();

    // Clear storage
    this.clearStorage();

    console.log('Disconnected from Web3');
  }

  /**
   * Check if Web3 is connected
   */
  isConnected(): boolean {
    return this.provider !== null && this.address !== null;
  }

  /**
   * Get current address
   */
  getAddress(): string | null {
    return this.address;
  }

  /**
   * Get current chain ID
   */
  getChainId(): number | null {
    return this.chainId;
  }

  /**
   * Get provider
   */
  getProvider(): ethers.BrowserProvider | null {
    return this.provider;
  }

  /**
   * Get signer
   */
  getSigner(): ethers.Signer | null {
    return this.signer;
  }

  /**
   * Switch to a different network
   */
  async switchNetwork(chainId: number): Promise<void> {
    if (!this.provider) {
      throw new Web3Error(
        ERROR_MESSAGES[ERROR_CODES.WEB5_NOT_INITIALIZED],
        ERROR_CODES.WEB5_NOT_INITIALIZED
      );
    }

    try {
      await this.provider.send('wallet_switchEthereumChain', [
        { chainId: ethers.toQuantity(chainId) }
      ]);

      this.chainId = chainId;
      localStorage.setItem(STORAGE_KEYS.WEB3_CHAIN_ID, chainId.toString());

      console.log('Switched to network:', chainId);
    } catch (error: any) {
      // Chain not added to wallet (error code 4902)
      if (error.code === 4902) {
        await this.addNetwork(chainId);
      } else if (error.code === 4001) {
        throw new Web3Error(
          ERROR_MESSAGES[ERROR_CODES.USER_REJECTED],
          ERROR_CODES.USER_REJECTED,
          error
        );
      } else {
        throw new Web3Error(
          ERROR_MESSAGES[ERROR_CODES.NETWORK_SWITCH_FAILED],
          ERROR_CODES.NETWORK_SWITCH_FAILED,
          error
        );
      }
    }
  }

  /**
   * Add a network to the wallet
   */
  private async addNetwork(chainId: number): Promise<void> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    const networkConfig = NETWORK_CONFIGS[chainId as keyof typeof NETWORK_CONFIGS];
    
    if (!networkConfig) {
      throw new Error(`Network configuration not found for chain ID ${chainId}`);
    }

    try {
      await this.provider.send('wallet_addEthereumChain', [
        {
          chainId: ethers.toQuantity(chainId),
          chainName: networkConfig.name,
          nativeCurrency: networkConfig.nativeCurrency,
          rpcUrls: networkConfig.rpcUrls,
          blockExplorerUrls: networkConfig.blockExplorerUrls
        }
      ]);

      this.chainId = chainId;
      localStorage.setItem(STORAGE_KEYS.WEB3_CHAIN_ID, chainId.toString());

      console.log('Network added:', networkConfig.name);
    } catch (error) {
      console.error('Failed to add network:', error);
      throw new Web3Error(
        ERROR_MESSAGES[ERROR_CODES.NETWORK_SWITCH_FAILED],
        ERROR_CODES.NETWORK_SWITCH_FAILED,
        error
      );
    }
  }

  /**
   * Get network information
   */
  async getNetworkInfo(): Promise<NetworkInfo> {
    if (!this.provider) {
      throw new Web3Error(
        ERROR_MESSAGES[ERROR_CODES.WEB5_NOT_INITIALIZED],
        ERROR_CODES.WEB5_NOT_INITIALIZED
      );
    }

    const network = await this.provider.getNetwork();
    
    return {
      chainId: Number(network.chainId),
      name: network.name
    };
  }

  /**
   * Get account balance
   */
  async getBalance(address?: string): Promise<bigint> {
    if (!this.provider) {
      throw new Web3Error(
        ERROR_MESSAGES[ERROR_CODES.WEB5_NOT_INITIALIZED],
        ERROR_CODES.WEB5_NOT_INITIALIZED
      );
    }

    const targetAddress = address || this.address;
    if (!targetAddress) {
      throw new Error('No address provided');
    }

    return await this.provider.getBalance(targetAddress);
  }

  /**
   * Send a transaction
   */
  async sendTransaction(tx: TransactionRequest): Promise<TransactionReceipt> {
    if (!this.signer) {
      throw new Web3Error(
        ERROR_MESSAGES[ERROR_CODES.WEB5_NOT_INITIALIZED],
        ERROR_CODES.WEB5_NOT_INITIALIZED
      );
    }

    try {
      const transaction = await this.signer.sendTransaction(tx);
      const receipt = await transaction.wait();

      if (!receipt) {
        throw new Error('Transaction receipt not available');
      }

      return {
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        status: receipt.status === 1 ? 'success' : 'failed',
        gasUsed: receipt.gasUsed
      };
    } catch (error: any) {
      console.error('Transaction failed:', error);

      if (error.code === 'ACTION_REJECTED' || error.code === 4001) {
        throw new Web3Error(
          ERROR_MESSAGES[ERROR_CODES.USER_REJECTED],
          ERROR_CODES.USER_REJECTED,
          error
        );
      }

      if (error.code === 'INSUFFICIENT_FUNDS') {
        throw new Web3Error(
          ERROR_MESSAGES[ERROR_CODES.INSUFFICIENT_FUNDS],
          ERROR_CODES.INSUFFICIENT_FUNDS,
          error
        );
      }

      throw new Web3Error(
        ERROR_MESSAGES[ERROR_CODES.TRANSACTION_FAILED],
        ERROR_CODES.TRANSACTION_FAILED,
        error
      );
    }
  }

  /**
   * Estimate gas for a transaction
   */
  async estimateGas(tx: TransactionRequest): Promise<bigint> {
    if (!this.provider) {
      throw new Web3Error(
        ERROR_MESSAGES[ERROR_CODES.WEB5_NOT_INITIALIZED],
        ERROR_CODES.WEB5_NOT_INITIALIZED
      );
    }

    try {
      return await this.provider.estimateGas(tx);
    } catch (error) {
      console.error('Failed to estimate gas:', error);
      throw new Web3Error(
        'Failed to estimate gas',
        ERROR_CODES.TRANSACTION_FAILED,
        error
      );
    }
  }

  /**
   * Get transaction status
   */
  async getTransactionStatus(txHash: string): Promise<TransactionStatus> {
    if (!this.provider) {
      throw new Web3Error(
        ERROR_MESSAGES[ERROR_CODES.WEB5_NOT_INITIALIZED],
        ERROR_CODES.WEB5_NOT_INITIALIZED
      );
    }

    try {
      const receipt = await this.provider.getTransactionReceipt(txHash);

      if (!receipt) {
        return 'pending';
      }

      const confirmations = await receipt.confirmations();
      if (confirmations < 12) {
        return 'confirming';
      }

      return receipt.status === 1 ? 'success' : 'failed';
    } catch (error) {
      console.error('Failed to get transaction status:', error);
      return 'failed';
    }
  }

  /**
   * Setup event listeners for account and network changes
   */
  private setupEventListeners(): void {
    if (!window.ethereum) return;

    // Account changed
    window.ethereum.on('accountsChanged', this.handleAccountsChanged.bind(this));

    // Chain changed
    window.ethereum.on('chainChanged', this.handleChainChanged.bind(this));

    // Disconnect
    window.ethereum.on('disconnect', this.handleDisconnect.bind(this));
  }

  /**
   * Remove event listeners
   */
  private removeEventListeners(): void {
    if (!window.ethereum) return;

    window.ethereum.removeListener('accountsChanged', this.handleAccountsChanged);
    window.ethereum.removeListener('chainChanged', this.handleChainChanged);
    window.ethereum.removeListener('disconnect', this.handleDisconnect);
  }

  /**
   * Handle account change
   */
  private async handleAccountsChanged(accounts: string[]): Promise<void> {
    console.log('Accounts changed:', accounts);

    if (accounts.length === 0) {
      // User disconnected
      await this.disconnect();
    } else if (accounts[0] !== this.address) {
      // Account switched
      this.address = accounts[0];
      localStorage.setItem(STORAGE_KEYS.WEB3_ADDRESS, this.address);
      
      // Notify listeners
      this.emit('accountChanged', { address: this.address });
    }
  }

  /**
   * Handle chain change
   */
  private handleChainChanged(chainIdHex: string): void {
    const newChainId = parseInt(chainIdHex, 16);
    console.log('Chain changed:', newChainId);

    this.chainId = newChainId;
    localStorage.setItem(STORAGE_KEYS.WEB3_CHAIN_ID, newChainId.toString());

    // Notify listeners
    this.emit('chainChanged', { chainId: newChainId });

    // Reload page to reset state (recommended by MetaMask)
    window.location.reload();
  }

  /**
   * Handle disconnect
   */
  private async handleDisconnect(): Promise<void> {
    console.log('Wallet disconnected');
    await this.disconnect();
    
    // Notify listeners
    this.emit('disconnected', {});
  }

  /**
   * Add event listener
   */
  on(event: string, callback: Function): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  /**
   * Remove event listener
   */
  off(event: string, callback: Function): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  /**
   * Emit event
   */
  private emit(event: string, data: any): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(callback => callback(data));
    }
  }

  /**
   * Clear localStorage
   */
  private clearStorage(): void {
    localStorage.removeItem(STORAGE_KEYS.WEB3_ADDRESS);
    localStorage.removeItem(STORAGE_KEYS.WEB3_CHAIN_ID);
  }
}

// Export singleton instance
export const web3Service = new Web3Service();
export default Web3Service;
