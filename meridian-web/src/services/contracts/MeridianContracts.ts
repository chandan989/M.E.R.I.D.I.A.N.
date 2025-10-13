/**
 * Meridian Smart Contract Service
 * Handles interactions with deployed contracts on Creditcoin
 */

import { ethers } from 'ethers';
import { CONTRACT_ADDRESSES, NETWORK_CONFIG } from '@/config/contracts';
import { web3Service } from '@/services/web3';

// Contract ABIs
const MERIDIAN_NFT_ABI = [
  "function mint(address to, string memory datasetId, address provider) returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function datasetIds(uint256 tokenId) view returns (string)",
  "function providers(uint256 tokenId) view returns (address)",
  "function totalSupply() view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
  "event LicenseMinted(uint256 tokenId, address buyer, address provider, string datasetId)"
];

const MERIDIAN_MARKET_ABI = [
  "function list(string memory datasetId, uint256 price)",
  "function buy(string memory datasetId) payable",
  "function listings(string memory datasetId) view returns (address provider, uint256 price, bool active)",
  "function withdraw()",
  "function feePercent() view returns (uint256)",
  "function totalFees() view returns (uint256)",
  "event Listed(string datasetId, address provider, uint256 price)",
  "event Purchased(string datasetId, address buyer, uint256 tokenId)"
];

export interface Listing {
  provider: string;
  price: bigint;
  active: boolean;
}

export interface NFTMetadata {
  tokenId: number;
  datasetId: string;
  provider: string;
  owner: string;
}

class MeridianContractsService {
  /**
   * Get NFT contract instance
   */
  private getNFTContract(signerOrProvider?: ethers.Signer | ethers.Provider) {
    const provider = signerOrProvider || web3Service.getProvider();
    if (!provider) {
      throw new Error('Web3 provider not initialized');
    }

    return new ethers.Contract(
      CONTRACT_ADDRESSES.MeridianNFT,
      MERIDIAN_NFT_ABI,
      signerOrProvider || provider
    );
  }

  /**
   * Get Market contract instance
   */
  private getMarketContract(signerOrProvider?: ethers.Signer | ethers.Provider) {
    const provider = signerOrProvider || web3Service.getProvider();
    if (!provider) {
      throw new Error('Web3 provider not initialized');
    }

    return new ethers.Contract(
      CONTRACT_ADDRESSES.MeridianMarket,
      MERIDIAN_MARKET_ABI,
      signerOrProvider || provider
    );
  }

  /**
   * List a dataset on the marketplace
   */
  async listDataset(datasetId: string, priceInEther: string): Promise<string> {
    const signer = web3Service.getSigner();
    if (!signer) {
      throw new Error('Wallet not connected');
    }

    try {
      const market = this.getMarketContract(signer);
      const priceWei = ethers.parseEther(priceInEther);

      console.log('Listing dataset:', { datasetId, price: priceInEther });

      const tx = await market.list(datasetId, priceWei);
      const receipt = await tx.wait();

      console.log('Dataset listed successfully:', receipt.hash);
      return receipt.hash;
    } catch (error: any) {
      console.error('Failed to list dataset:', error);
      
      if (error.code === 'ACTION_REJECTED') {
        throw new Error('Transaction rejected by user');
      }
      
      throw new Error(error.message || 'Failed to list dataset');
    }
  }

  /**
   * Buy a data license from marketplace
   */
  async buyLicense(datasetId: string): Promise<{ txHash: string; tokenId?: number }> {
    const signer = web3Service.getSigner();
    if (!signer) {
      throw new Error('Wallet not connected');
    }

    try {
      const market = this.getMarketContract(signer);
      
      // Get listing to know the price
      const listing = await this.getListing(datasetId);
      if (!listing.active) {
        throw new Error('Dataset not listed');
      }

      console.log('Buying license:', { datasetId, price: ethers.formatEther(listing.price) });

      const tx = await market.buy(datasetId, { value: listing.price });
      const receipt = await tx.wait();

      // Parse events to get token ID
      const purchasedEvent = receipt.logs
        .map((log: any) => {
          try {
            return market.interface.parseLog(log);
          } catch {
            return null;
          }
        })
        .find((event: any) => event?.name === 'Purchased');

      const tokenId = purchasedEvent?.args?.tokenId ? Number(purchasedEvent.args.tokenId) : undefined;

      console.log('License purchased:', { txHash: receipt.hash, tokenId });
      
      return { 
        txHash: receipt.hash,
        tokenId
      };
    } catch (error: any) {
      console.error('Failed to buy license:', error);
      
      if (error.code === 'ACTION_REJECTED') {
        throw new Error('Transaction rejected by user');
      }
      
      if (error.code === 'INSUFFICIENT_FUNDS') {
        throw new Error('Insufficient funds for purchase');
      }
      
      throw new Error(error.message || 'Failed to buy license');
    }
  }

  /**
   * Get listing details
   */
  async getListing(datasetId: string): Promise<Listing> {
    try {
      const market = this.getMarketContract();
      const result = await market.listings(datasetId);
      
      return {
        provider: result[0],
        price: result[1],
        active: result[2]
      };
    } catch (error) {
      console.error('Failed to get listing:', error);
      throw new Error('Failed to fetch listing details');
    }
  }

  /**
   * Get user's NFT balance
   */
  async getBalance(address?: string): Promise<number> {
    try {
      const nft = this.getNFTContract();
      const targetAddress = address || web3Service.getAddress();
      
      if (!targetAddress) {
        throw new Error('No address provided');
      }

      const balance = await nft.balanceOf(targetAddress);
      return Number(balance);
    } catch (error) {
      console.error('Failed to get balance:', error);
      return 0;
    }
  }

  /**
   * Get user's owned NFTs
   */
  async getUserNFTs(address?: string): Promise<NFTMetadata[]> {
    try {
      const nft = this.getNFTContract();
      const targetAddress = address || web3Service.getAddress();
      
      if (!targetAddress) {
        throw new Error('No address provided');
      }

      const balance = await this.getBalance(targetAddress);
      const nfts: NFTMetadata[] = [];

      // Note: This requires ERC721Enumerable extension which we don't have in minimal version
      // For now, we'll need to track token IDs differently or query events
      // Alternative: Listen to transfer events or maintain an indexer

      console.log(`User ${targetAddress} has ${balance} NFTs`);
      
      return nfts;
    } catch (error) {
      console.error('Failed to get user NFTs:', error);
      return [];
    }
  }

  /**
   * Get NFT details by token ID
   */
  async getNFTDetails(tokenId: number): Promise<NFTMetadata> {
    try {
      const nft = this.getNFTContract();
      
      const [owner, datasetId, provider] = await Promise.all([
        nft.ownerOf(tokenId),
        nft.datasetIds(tokenId),
        nft.providers(tokenId)
      ]);

      return {
        tokenId,
        datasetId,
        provider,
        owner
      };
    } catch (error) {
      console.error('Failed to get NFT details:', error);
      throw new Error('Failed to fetch NFT details');
    }
  }

  /**
   * Get total NFTs minted
   */
  async getTotalSupply(): Promise<number> {
    try {
      const nft = this.getNFTContract();
      const total = await nft.totalSupply();
      return Number(total);
    } catch (error) {
      console.error('Failed to get total supply:', error);
      return 0;
    }
  }

  /**
   * Get platform fee percentage
   */
  async getPlatformFee(): Promise<number> {
    try {
      const market = this.getMarketContract();
      const feeBps = await market.feePercent();
      return Number(feeBps) / 10; // Convert to percentage (25 = 2.5%)
    } catch (error) {
      console.error('Failed to get platform fee:', error);
      return 2.5; // Default
    }
  }

  /**
   * Get accumulated platform fees
   */
  async getTotalFees(): Promise<string> {
    try {
      const market = this.getMarketContract();
      const fees = await market.totalFees();
      return ethers.formatEther(fees);
    } catch (error) {
      console.error('Failed to get total fees:', error);
      return '0';
    }
  }

  /**
   * Withdraw platform fees (owner only)
   */
  async withdrawFees(): Promise<string> {
    const signer = web3Service.getSigner();
    if (!signer) {
      throw new Error('Wallet not connected');
    }

    try {
      const market = this.getMarketContract(signer);
      const tx = await market.withdraw();
      const receipt = await tx.wait();

      console.log('Fees withdrawn:', receipt.hash);
      return receipt.hash;
    } catch (error: any) {
      console.error('Failed to withdraw fees:', error);
      
      if (error.code === 'ACTION_REJECTED') {
        throw new Error('Transaction rejected by user');
      }
      
      throw new Error(error.message || 'Failed to withdraw fees');
    }
  }

  /**
   * Check if user owns a license for a dataset
   */
  async userOwnsLicense(datasetId: string, userAddress?: string): Promise<boolean> {
    try {
      // In a full implementation, we'd check if user owns an NFT with this datasetId
      // For now, this is a placeholder that would need event indexing or enumeration
      const address = userAddress || web3Service.getAddress();
      if (!address) return false;

      // This would require either:
      // 1. Event indexing to track all minted licenses
      // 2. ERC721Enumerable extension
      // 3. Backend API to track ownership

      const balance = await this.getBalance(address);
      return balance > 0; // Simplified check
    } catch (error) {
      console.error('Failed to check license ownership:', error);
      return false;
    }
  }

  /**
   * Format price for display
   */
  formatPrice(priceWei: bigint): string {
    return ethers.formatEther(priceWei);
  }

  /**
   * Parse price from ether string
   */
  parsePrice(priceEther: string): bigint {
    return ethers.parseEther(priceEther);
  }

  /**
   * Get contract addresses
   */
  getContractAddresses() {
    return CONTRACT_ADDRESSES;
  }

  /**
   * Get block explorer URL for transaction
   */
  getTransactionUrl(txHash: string): string {
    return `${NETWORK_CONFIG.blockExplorer}/tx/${txHash}`;
  }

  /**
   * Get block explorer URL for address
   */
  getAddressUrl(address: string): string {
    return `${NETWORK_CONFIG.blockExplorer}/address/${address}`;
  }
}

// Export singleton instance
export const meridianContracts = new MeridianContractsService();
export default MeridianContractsService;

