// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MeridianNFT
 * @dev Minimal Data License NFT for M.E.R.I.D.I.A.N Hackathon MVP
 */
contract MeridianNFT is ERC721, Ownable {
    uint256 private _tokenIds;
    
    mapping(uint256 => string) public datasetIds;
    mapping(uint256 => address) public providers;
    
    event LicenseMinted(uint256 tokenId, address buyer, address provider, string datasetId);
    
    constructor() ERC721("MERIDIAN License", "MDL") Ownable(msg.sender) {}
    
    function mint(address to, string memory datasetId, address provider) public returns (uint256) {
        _tokenIds++;
        uint256 tokenId = _tokenIds;
        
        _safeMint(to, tokenId);
        datasetIds[tokenId] = datasetId;
        providers[tokenId] = provider;
        
        emit LicenseMinted(tokenId, to, provider, datasetId);
        return tokenId;
    }
    
    function totalSupply() public view returns (uint256) {
        return _tokenIds;
    }
}

