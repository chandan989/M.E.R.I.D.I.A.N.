/**
 * React Hook for Web3/MetaMask Connection
 * Manages wallet connection state and provides connection methods
 */

import { useState, useEffect, useCallback } from 'react';
import { web3Service } from '@/services/web3';
import { toast } from 'sonner';
import { ethers } from 'ethers';

export function useWeb3() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [isConnecting, setIsConnecting] = useState(false);

  // Initialize connection state
  useEffect(() => {
    const checkConnection = async () => {
      try {
        await web3Service.initialize();
        const connected = web3Service.isConnected();
        setIsConnected(connected);
        
        if (connected) {
          setAddress(web3Service.getAddress());
          setChainId(web3Service.getChainId());
          await refreshBalance();
        }
      } catch (error) {
        console.error('Failed to initialize web3:', error);
      }
    };

    checkConnection();
  }, []);

  // Refresh balance
  const refreshBalance = useCallback(async () => {
    try {
      const address = web3Service.getAddress();
      if (address) {
        const bal = await web3Service.getBalance(address);
        setBalance(ethers.formatEther(bal));
      }
    } catch (error) {
      console.error('Failed to refresh balance:', error);
    }
  }, []);

  // Connect to MetaMask
  const connect = useCallback(async () => {
    if (!window.ethereum) {
      toast.error('MetaMask not detected', {
        description: 'Please install MetaMask to use this feature'
      });
      return false;
    }

    setIsConnecting(true);
    try {
      const result = await web3Service.connect();
      setIsConnected(true);
      setAddress(result.address);
      setChainId(result.chainId);
      
      await refreshBalance();

      toast.success('Wallet connected!', {
        description: `Connected to ${result.address.slice(0, 6)}...${result.address.slice(-4)}`
      });

      return true;
    } catch (error: any) {
      console.error('Failed to connect wallet:', error);
      
      if (error.code !== 4001) { // Don't show error if user rejected
        toast.error('Failed to connect wallet', {
          description: error.message || 'Please try again'
        });
      }
      
      return false;
    } finally {
      setIsConnecting(false);
    }
  }, [refreshBalance]);

  // Disconnect wallet
  const disconnect = useCallback(async () => {
    try {
      await web3Service.disconnect();
      setIsConnected(false);
      setAddress(null);
      setChainId(null);
      setBalance('0');
      
      toast.info('Wallet disconnected');
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  }, []);

  // Switch network
  const switchNetwork = useCallback(async (targetChainId: number) => {
    try {
      await web3Service.switchNetwork(targetChainId);
      setChainId(targetChainId);
      
      toast.success('Network switched successfully');
      return true;
    } catch (error: any) {
      console.error('Failed to switch network:', error);
      
      if (error.code !== 4001) {
        toast.error('Failed to switch network', {
          description: error.message || 'Please try again'
        });
      }
      
      return false;
    }
  }, []);

  // Listen to account changes
  useEffect(() => {
    const handleAccountChanged = ({ address: newAddress }: { address: string }) => {
      setAddress(newAddress);
      refreshBalance();
      toast.info('Account changed', {
        description: `Switched to ${newAddress.slice(0, 6)}...${newAddress.slice(-4)}`
      });
    };

    const handleChainChanged = ({ chainId: newChainId }: { chainId: number }) => {
      setChainId(newChainId);
    };

    const handleDisconnected = () => {
      setIsConnected(false);
      setAddress(null);
      setChainId(null);
      setBalance('0');
    };

    web3Service.on('accountChanged', handleAccountChanged);
    web3Service.on('chainChanged', handleChainChanged);
    web3Service.on('disconnected', handleDisconnected);

    return () => {
      web3Service.off('accountChanged', handleAccountChanged);
      web3Service.off('chainChanged', handleChainChanged);
      web3Service.off('disconnected', handleDisconnected);
    };
  }, [refreshBalance]);

  return {
    // State
    isConnected,
    address,
    chainId,
    balance,
    isConnecting,

    // Methods
    connect,
    disconnect,
    switchNetwork,
    refreshBalance,

    // Utils
    hasMetaMask: !!window.ethereum,
    shortAddress: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : null
  };
}

export default useWeb3;


