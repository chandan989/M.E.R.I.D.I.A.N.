// Smart Contract Configuration for M.E.R.I.D.I.A.N.
// This file will be auto-generated after contract deployment
// For development, these are placeholder addresses

// 🎉 LIVE ON CREDITCOIN TESTNET!
// Deployed: October 12, 2025

export const CONTRACT_ADDRESSES = {
  MeridianNFT: import.meta.env.VITE_CONTRACT_NFT || "0x8146A9122F805c8cCf0881564289Fd10678f7De6",
  MeridianMarket: import.meta.env.VITE_CONTRACT_MARKET || "0x3C55823414683725Ee1ae7258E63406bef16A875"
};

export const NETWORK_CONFIG = {
  name: import.meta.env.VITE_NETWORK_NAME || "creditcoin-testnet",
  chainId: parseInt(import.meta.env.VITE_CHAIN_ID || "102031"),
  rpcUrl: import.meta.env.VITE_RPC_URL || "https://rpc.cc3-testnet.creditcoin.network",
  blockExplorer: import.meta.env.VITE_BLOCK_EXPLORER || "https://explorer.cc3-testnet.creditcoin.network"
};

// Platform fee in basis points (250 = 2.5%)
export const PLATFORM_FEE_BPS = 250;

// ABI fragments for contract interactions
export const LICENSE_NFT_ABI = [
  "function mintLicense(address buyer, string memory datasetId, address provider, string memory dwnEndpoint, string memory providerDID, uint256 price, uint256 expiryTimestamp, string memory metadataURI, string memory dataSchema, uint256 qualityScore) public returns (uint256)",
  "function isLicenseValid(uint256 tokenId) public view returns (bool)",
  "function hasValidAccess(address user, string memory datasetId) public view returns (bool)",
  "function getLicenseDetails(uint256 tokenId) public view returns (tuple(string datasetId, address provider, string dwnEndpoint, string providerDID, uint256 price, uint256 expiryTimestamp, bool isActive, string dataSchema, uint256 qualityScore))",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function totalLicenses() public view returns (uint256)",
  "event LicenseMinted(uint256 indexed tokenId, address indexed buyer, address indexed provider, string datasetId, uint256 price)"
];

export const MARKETPLACE_ABI = [
  "function listDataset(string memory datasetId, uint256 price, string memory dwnEndpoint, string memory providerDID, string memory metadataURI, string memory dataSchema, uint256 qualityScore, uint256 expiryDuration) public",
  "function purchaseLicense(string memory datasetId) public payable",
  "function updatePrice(string memory datasetId, uint256 newPrice) public",
  "function removeListing(string memory datasetId) public",
  "function getActiveListings() public view returns (tuple(string datasetId, address provider, uint256 price, string dwnEndpoint, string providerDID, string metadataURI, string dataSchema, uint256 qualityScore, uint256 expiryDuration, bool isActive, uint256 totalSales, uint256 createdAt)[])",
  "function listings(string memory datasetId) public view returns (tuple(string datasetId, address provider, uint256 price, string dwnEndpoint, string providerDID, string metadataURI, string dataSchema, uint256 qualityScore, uint256 expiryDuration, bool isActive, uint256 totalSales, uint256 createdAt))",
  "function getMarketplaceStats() public view returns (uint256 totalDatasets, uint256 activeListings, uint256 totalSales, uint256 platformFeesCollected)",
  "event DatasetListed(string indexed datasetId, address indexed provider, uint256 price, uint256 qualityScore)",
  "event DatasetPurchased(string indexed datasetId, address indexed buyer, address indexed provider, uint256 price, uint256 tokenId)"
];

export const FRACTIONAL_ABI = [
  "function createPool(string memory datasetId, address provider, uint256 totalPrice, uint256 totalFractions, uint256 expiryDuration, string memory metadataURI, string memory dwnEndpoint, string memory providerDID, string memory dataSchema, uint256 qualityScore) public returns (uint256)",
  "function purchaseFractions(uint256 poolId, uint256 fractions) public payable",
  "function hasFractionalAccess(uint256 poolId, address user) public view returns (bool)",
  "function getPoolDetails(uint256 poolId) public view returns (string memory datasetId, uint256 totalPrice, uint256 totalFractions, uint256 fractionsSold, uint256 pricePerFraction, bool isActive, bool isFullyFunded, uint256 licenseMinted)",
  "function getUserFractions(uint256 poolId, address user) public view returns (uint256)",
  "function getActivePools() public view returns (uint256[])",
  "event PoolCreated(uint256 indexed poolId, string indexed datasetId, uint256 totalPrice, uint256 totalFractions, uint256 pricePerFraction)",
  "event FractionPurchased(uint256 indexed poolId, address indexed buyer, uint256 fractions, uint256 amount)"
];

// Helper function to check if contracts are deployed
export function areContractsDeployed(): boolean {
  return CONTRACT_ADDRESSES.DataLicenseNFT !== "0x0000000000000000000000000000000000000000" &&
         CONTRACT_ADDRESSES.MeridianMarketplace !== "0x0000000000000000000000000000000000000000" &&
         CONTRACT_ADDRESSES.FractionalLicense !== "0x0000000000000000000000000000000000000000";
}

// Helper to get contract address by name
export function getContractAddress(contractName: keyof typeof CONTRACT_ADDRESSES): string {
  return CONTRACT_ADDRESSES[contractName];
}

