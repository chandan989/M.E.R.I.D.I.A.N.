/**
 * React Hook for Meridian Smart Contracts
 * Provides easy access to contract methods with React state management
 */

import { useState, useCallback, useEffect } from 'react';
import { meridianContracts, Listing, NFTMetadata } from '@/services/contracts/MeridianContracts';
import { web3Service } from '@/services/web3';
import { toast } from 'sonner';

export function useContracts() {
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState<number>(0);
  const [totalSupply, setTotalSupply] = useState<number>(0);

  // Refresh balance
  const refreshBalance = useCallback(async () => {
    try {
      const address = web3Service.getAddress();
      if (address) {
        const bal = await meridianContracts.getBalance(address);
        setBalance(bal);
      }
    } catch (error) {
      console.error('Failed to refresh balance:', error);
    }
  }, []);

  // List a dataset
  const listDataset = useCallback(async (datasetId: string, price: string) => {
    setIsLoading(true);
    try {
      const txHash = await meridianContracts.listDataset(datasetId, price);
      toast.success('Dataset listed successfully!', {
        description: `Transaction: ${txHash.slice(0, 10)}...`,
        action: {
          label: 'View',
          onClick: () => window.open(meridianContracts.getTransactionUrl(txHash), '_blank')
        }
      });
      return txHash;
    } catch (error: any) {
      console.error('Failed to list dataset:', error);
      toast.error('Failed to list dataset', {
        description: error.message
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Buy a license
  const buyLicense = useCallback(async (datasetId: string) => {
    setIsLoading(true);
    try {
      const result = await meridianContracts.buyLicense(datasetId);
      toast.success('License purchased successfully!', {
        description: `Token ID: ${result.tokenId || 'N/A'}`,
        action: {
          label: 'View Transaction',
          onClick: () => window.open(meridianContracts.getTransactionUrl(result.txHash), '_blank')
        }
      });
      await refreshBalance();
      return result;
    } catch (error: any) {
      console.error('Failed to buy license:', error);
      toast.error('Failed to purchase license', {
        description: error.message
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [refreshBalance]);

  // Get listing details
  const getListing = useCallback(async (datasetId: string): Promise<Listing | null> => {
    try {
      return await meridianContracts.getListing(datasetId);
    } catch (error) {
      console.error('Failed to get listing:', error);
      return null;
    }
  }, []);

  // Get NFT details
  const getNFTDetails = useCallback(async (tokenId: number): Promise<NFTMetadata | null> => {
    try {
      return await meridianContracts.getNFTDetails(tokenId);
    } catch (error) {
      console.error('Failed to get NFT details:', error);
      return null;
    }
  }, []);

  // Refresh total supply
  const refreshTotalSupply = useCallback(async () => {
    try {
      const supply = await meridianContracts.getTotalSupply();
      setTotalSupply(supply);
    } catch (error) {
      console.error('Failed to refresh total supply:', error);
    }
  }, []);

  // Initialize
  useEffect(() => {
    if (web3Service.isConnected()) {
      refreshBalance();
      refreshTotalSupply();
    }
  }, [refreshBalance, refreshTotalSupply]);

  return {
    // State
    isLoading,
    balance,
    totalSupply,

    // Methods
    listDataset,
    buyLicense,
    getListing,
    getNFTDetails,
    refreshBalance,
    refreshTotalSupply,

    // Utils
    formatPrice: meridianContracts.formatPrice.bind(meridianContracts),
    parsePrice: meridianContracts.parsePrice.bind(meridianContracts),
    getTransactionUrl: meridianContracts.getTransactionUrl.bind(meridianContracts),
    getAddressUrl: meridianContracts.getAddressUrl.bind(meridianContracts),
    getContractAddresses: meridianContracts.getContractAddresses.bind(meridianContracts)
  };
}

export default useContracts;


