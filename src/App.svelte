<script>
  import Upload from "./Upload.svelte";
  import ViewImage from "./ViewImage.svelte";

  var Web3 = require('web3');
  var web3 = window.web3;
  var bs58 = require('bs58');

  let etherGram;
  const ethergramABI = require("./ethergram_abi.js");
  const scAddress = "0x9aa9c91c79e22882139f59a322173eb349783484";

  let imagesFromSC = [];

  let pages = {
    postImage: true,
    viewImage: false
  };

  const setPage = key => {
    for (let page in pages) {
      pages[page] = false;
    }
    pages[key] = true;
  };

  const uploadToSC = async (e) => {
    const ipfsHash = e.detail.path;
    //convert ipfsHash to bytes32 to fit the SC
	  const hashToSend = "0x" + bs58.decode(ipfsHash).slice(2).toString('hex');
    etherGram.methods.upload(hashToSend).send({from: '0x519Ff9BEFa4127688900C31922350103aA5495e6'});
  }

  const getPostsFromSC = async (e) => {
    e.preventDefault()
    const result = await etherGram.methods.getAllPosts().call({from: '0x519Ff9BEFa4127688900C31922350103aA5495e6'});
    for (let i=0; i < result.length; i++) {
      //default ipfs values for first 2 bytes: function: 0x12=sha2, size: 0x20=256 bits
      //cut the "0x" off
      const hex = "1220" + result[i].slice(2)
      const hashBytes = Buffer.from(hex, 'hex');
      imagesFromSC.push(bs58.encode(hashBytes));
    }
    setPage("viewImage");
  }

  const getClapCountFromSC = async (imageHash) => {
    etherGram.methods.getClapCount(imageHash).call({from: '0x519Ff9BEFa4127688900C31922350103aA5495e6'})
  }

  function startApp() {
	  etherGram = new web3.eth.Contract(ethergramABI,scAddress);
  }

  window.addEventListener('load', function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    console.log("Use MetaMask as provider");
    web3 = new Web3(web3.currentProvider);
          
    } else {
      console.log("Error! There is no provider to use!!!");
    }

    // Now you can start your app & access web3js freely:
    startApp()
  })


</script>

<style>
	h1 {
		color: rgb(59, 70, 168);
	}
</style>

<h1>Picture board DApp by Jason</h1>

{#if pages.postImage}
<Upload 
	on:upload={uploadToSC}
  on:viewImage={getPostsFromSC}
/>

{:else if pages.viewImage}
<ViewImage {imagesFromSC}/>

{/if}