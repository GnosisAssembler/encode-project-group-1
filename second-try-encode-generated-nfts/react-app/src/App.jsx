import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import EncodeNFT from './utils/EncodeNFT.json';

const TWITTER_HANDLE = 'Encode Team #1: Alex, Panos, Devon, Marlo';
const TWITTER_LINK = `${TWITTER_HANDLE}`;
const OPENSEA_LINK = 'https://rinkeby.rarible.com/collection/0x313280f997e526ee7313ccb439651c91841a3b12/items';
const TOTAL_MINT_COUNT = 20;

''
// I moved the contract address to the top for easy access.
const CONTRACT_ADDRESS = "0x313280F997E526Ee7313ccb439651c91841a3b12";

const App = () => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [minting,setMinting]=useState(false)
    const [nftAmount,setNftAmount]=useState(8)
    
    const checkIfWalletIsConnected = async () => {
      const { ethereum } = window;

      if (!ethereum) {
          console.log("Make sure you have metamask!");
          return;
      } else {
          console.log("We have the ethereum object", ethereum);

      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
					setCurrentAccount(account)
          
          
          // Setup listener! This is for the case where a user comes to our site
          // and ALREADY had their wallet connected + authorized.
          setupEventListener()
      } else {
          console.log("No authorized account found")
      }

      let chainId = await ethereum.request({ method: 'eth_chainId' });
console.log("Connected to chain " + chainId);

// String, hex code of the chainId of the Rinkebey test network
const rinkebyChainId = "0x4"; 
if (chainId !== rinkebyChainId) {
	alert("You are not connected to the Rinkeby Test Network!");
}
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);

      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
      setupEventListener() 
    } catch (error) {
      console.log(error)
    }
  }

  // Setup our listener.
  const setupEventListener = async () => {
    // Most of this looks the same as our function askContractToMintNft
  
    try {
      const { ethereum } = window;

      if (ethereum) {
        // Same stuff again
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, EncodeNFT.abi, signer);


        // THIS IS THE MAGIC SAUCE.
        // This will essentially "capture" our event when our contract throws it.
        // If you're familiar with webhooks, it's very similar to that!
        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
        });

        console.log("Setup event listener!")
      

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const askContractToMintNft = async () => {
    
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, EncodeNFT.abi, signer);

        console.log("Going to pop wallet now to pay gas...")
        let nftTxn = await connectedContract.makeAnEpicNFT();

        console.log("Mining...please wait.")
        setMinting(true)
        await nftTxn.wait();
        console.log(nftTxn);
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
        setNftAmount(nftAmount+1);
       setMinting(false)  //set NFT amount
        let realAmount=await connectedContract.getTotalNFTsMintedSoFar()
        console.log(realAmount.toString())
        setNftAmount(nftAmount+1)
      } else {
        setMinting(false)
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      setMinting(false)
      console.log(error)
    }
  }

const refreshAmount=async()=>{
  try{
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, EncodeNFT.abi, signer);
      let realAmount=await connectedContract.getTotalNFTsMintedSoFar()
        console.log(realAmount.toString())
        setNftAmount(nftAmount.toNumber() + 1)
      }
      }catch(error){
         console.log(error)
      }
}

  useEffect(() => {
    checkIfWalletIsConnected();
    refreshAmount()
  }, [])

  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      💰 Connect to Wallet
    </button>
  );

  const renderMintUI = () => (
    <button onClick={askContractToMintNft} className="cta-button connect-wallet-button">
     {!minting?"🚀 Mint NFT":"Minting.....✅"}
    </button>
  )

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Group 1 NFT Collection</p>
          <p className="sub-text">
            Randomized NFTs that describe the Encode BitDAO Bootcamp Experience
          </p>
        {currentAccount === "" ?"":   <p className="sub-text">{nftAmount}/{TOTAL_MINT_COUNT} NFTs minted so far</p>}
          {currentAccount === "" ? renderNotConnectedContainer() : renderMintUI()}
          <p><a  className="footer-text"href="https://testnets.opensea.io/collection/squarenft-irj37x3pzz"> 🌟 View Collection on Rarible</a></p>
        </div>
        <div className="footer-container">
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{` ${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;