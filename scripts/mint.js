// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/MetaToken.sol/Project1.json");

const tokenAddress = "0x93bFDcd6DBE880ACe5B91B8Cea6780E77520EA42"; // place your erc20 contract address here
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0x0e93A15b8e41D004EF3941C1E1ACDa024B68638C"; // place your public address for your wallet here

const nftjson=["ipfs://QmTyHzJtTY7wkK3EPtuZBAfuQWfHpFA9QyiCbvJSURbzg6" , "ipfs://QmV49KzKNrUmeeMf2zP4QjqvrynsmJUzVTqvbUyeWPup2o" , "ipfs://QmQB97uuuhrXHdFykaBm4oz7vzhcynfPNW3saNcDzcZqAq" , "ipfs://QmNrampxD9K4N8uQAdTyVxDd3E9B33VNqNT4hvrzBQNtXM" , "ipfs://Qmb7SzwxZktWACtToWjoadPMThqwbUBKnSbXNqpF1TYaPF"]
async function main() {

  const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);
  
  for(let i=0;i<nftjson.length;i++){
    const tx = await token.mint(walletAddress,i,nftjson[i]);
    await tx.wait();
  }


  console.log("You now have: " + await token.balanceOf(walletAddress) + " tokens");
  }  
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
