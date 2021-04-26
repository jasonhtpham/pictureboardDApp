<script>
  import Upload from "./Upload.svelte";
  import ViewImage from "./ViewImage.svelte";
  import Uploading from "./Uploading.svelte";

  var Web3 = require('web3');
  var web3 = window.web3;
  var bs58 = require('bs58');

  let etherGram;
  const ethergramABI = require("./ethergram_abi.js");
  const scAddress = "0x9aa9c91c79e22882139f59a322173eb349783484";
  let callerAddress;

  var postsFromSC = [];

  let pages = {
    postImage: true,
    viewImage: false,
    uploading: false
  };

  const setPage = key => {
    for (let page in pages) {
      pages[page] = false;
    }
    pages[key] = true;
  };

  const hashToBytes32 = (hash) => {
    return "0x" + bs58.decode(hash).slice(2).toString('hex');
  }

  const uploadToSC = async (e) => {
    const ipfsHash = e.detail.path;
    //convert ipfsHash to bytes32 to fit the SC
	  const hashToSend = hashToBytes32(ipfsHash);
    etherGram.methods.upload(hashToSend).send({from: callerAddress});
    getPostsFromSC(e);
  }

  const clap = (e) => {
    e.preventDefault()
    const imageHash = hashToBytes32(e.detail);
    etherGram.methods.clap(imageHash).send({from: callerAddress})
  }

  const comment = (e) => {
    const commentHash = web3.utils.asciiToHex(e.detail.elements[0].value);
    const imageHash = hashToBytes32(e.detail.name);
    etherGram.methods.comment(imageHash, commentHash).send({from: callerAddress});
  }

  const getPostsFromSC = async (e) => {
    e.preventDefault()
    setPage("uploading");
    const result = await etherGram.methods.getAllPosts().call({from: callerAddress});
    for (let i=0; i < result.length; i++) {
      //default ipfs values for first 2 bytes: function: 0x12=sha2, size: 0x20=256 bits
      //cut the "0x" off
      const hex = "1220" + result[i].slice(2);
      const hashBytes = Buffer.from(hex, 'hex');
      const image = bs58.encode(hashBytes);

      const clapCounts = await getClapCountFromSC(result[i]);
      const comments = await getComment(result[i]);

      postsFromSC.push({
        image: image,
        clapCounts: clapCounts,
        comment: comments
      });
    }
    
    setPage("viewImage");
  }

  const getClapCountFromSC = async (imageHash) => {
    return etherGram.methods.getClapCount(imageHash).call({from: callerAddress})
  }

  const getComment = async (imageHash) => {
    const result = await etherGram.methods.getComments(imageHash).call({from: callerAddress})
    var processedComments=[];
    result.forEach(commentHash => {
      processedComments.push(web3.utils.toAscii(commentHash));
    });
    return processedComments;
  }

  function startApp() {
    etherGram = new web3.eth.Contract(ethergramABI,scAddress);
  }

  window.addEventListener('load', async function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      console.log("Use MetaMask as provider");
      web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log("Error! There is no provider to use!!!");
    }

    // Now you can start your app & access web3js freely:
    startApp()

    var accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    // web3.eth.getAccounts(console.log);

    callerAddress = accounts[0];

    var accountInterval = setInterval(async function() {
      let accounts = await web3.eth.getAccounts();
      if (accounts[0] !== callerAddress) {
        callerAddress = accounts[0];
      }
    }, 100);

  })


</script>

<style>
	h1 {
		color: white;
    font-size: 80px;
    text-align: center;
    background-color: #31b3ca
	}
</style>


<h1 class="title">Picture board DApp by Jason</h1>


{#if pages.postImage}
<Upload 
	on:upload={uploadToSC}
  on:viewImage={getPostsFromSC}
/>

{:else if pages.uploading}
<Uploading/>

{:else if pages.viewImage}
<ViewImage on:clap={clap} on:comment={comment} {postsFromSC} />

{/if}