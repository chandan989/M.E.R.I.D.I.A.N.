const hre = require("hardhat");

async function main() {
  console.log("\n🚀 Deploying M.E.R.I.D.I.A.N. Contracts...\n");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);
  console.log("Balance:", hre.ethers.formatEther(await hre.ethers.provider.getBalance(deployer.address)), "\n");

  // Deploy NFT
  const NFT = await hre.ethers.getContractFactory("MeridianNFT");
  const nft = await NFT.deploy();
  await nft.waitForDeployment();
  const nftAddr = await nft.getAddress();
  console.log("✅ MeridianNFT:", nftAddr);

  // Deploy Market
  const Market = await hre.ethers.getContractFactory("MeridianMarket");
  const market = await Market.deploy(nftAddr);
  await market.waitForDeployment();
  const marketAddr = await market.getAddress();
  console.log("✅ MeridianMarket:", marketAddr);

  console.log("\n📋 Deployment Complete!");
  console.log("NFT:", nftAddr);
  console.log("Market:", marketAddr);
  console.log("\n");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

