// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./MeridianNFT.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MeridianMarket
 * @dev Minimal Marketplace for M.E.R.I.D.I.A.N Hackathon MVP
 */
contract MeridianMarket is ReentrancyGuard, Ownable {
    MeridianNFT public nft;
    
    uint256 public feePercent = 25; // 2.5% (divide by 1000)
    uint256 public totalFees;
    
    struct Listing {
        address provider;
        uint256 price;
        bool active;
    }
    
    mapping(string => Listing) public listings;
    
    event Listed(string datasetId, address provider, uint256 price);
    event Purchased(string datasetId, address buyer, uint256 tokenId);
    
    constructor(address _nft) Ownable(msg.sender) {
        nft = MeridianNFT(_nft);
    }
    
    function list(string memory datasetId, uint256 price) public {
        require(price > 0, "Invalid price");
        listings[datasetId] = Listing(msg.sender, price, true);
        emit Listed(datasetId, msg.sender, price);
    }
    
    function buy(string memory datasetId) public payable nonReentrant {
        Listing memory listing = listings[datasetId];
        require(listing.active, "Not listed");
        require(msg.value >= listing.price, "Not enough");
        
        uint256 fee = (listing.price * feePercent) / 1000;
        uint256 payment = listing.price - fee;
        
        uint256 tokenId = nft.mint(msg.sender, datasetId, listing.provider);
        
        payable(listing.provider).transfer(payment);
        totalFees += fee;
        
        if (msg.value > listing.price) {
            payable(msg.sender).transfer(msg.value - listing.price);
        }
        
        emit Purchased(datasetId, msg.sender, tokenId);
    }
    
    function withdraw() public onlyOwner {
        uint256 amount = totalFees;
        totalFees = 0;
        payable(owner()).transfer(amount);
    }
}

