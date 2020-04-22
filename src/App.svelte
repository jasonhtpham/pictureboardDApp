<script>
import Upload from "./Upload.svelte";
import ViewImage from "./ViewImage.svelte";
import ethergramABI from "./ethergram_abi.js"
var bs58 = require('bs58');

var Web3 = require('web3');
var web3 = window.web3;

const IPFS = require('ipfs');

export let fileHash;
export let postCaption;

let etherGram;

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

const upload = (e) => {
	fileHash = e.detail.path;
	const hashToSend = "0x" + bs58.decode(fileHash).slice(2).toString('hex');

	etherGram.methods.upload(hashToSend).send({from: '0x519Ff9BEFa4127688900C31922350103aA5495e6'})
	setPage("viewImage");
}

const caption = (e) => {
	postCaption = e.detail;
}


function startApp() {
	etherGram = new web3.eth.Contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "_ipfsHash",
				"type": "bytes32"
			}
		],
		"name": "upload",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_ipfsHash",
				"type": "bytes32"
			}
		],
		"name": "clap",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_imageHash",
				"type": "bytes32"
			},
			{
				"name": "_commentHash",
				"type": "bytes32"
			}
		],
		"name": "comment",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_ipfsHash",
				"type": "bytes32"
			}
		],
		"name": "getClapCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_uploader",
				"type": "address"
			}
		],
		"name": "getUploads",
		"outputs": [
			{
				"name": "",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_ipfsHash",
				"type": "bytes32"
			}
		],
		"name": "getComments",
		"outputs": [
			{
				"name": "",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
],'0x9ae84b20be52230a1c31b87201edd94dbeea1682');
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
	on:upload={upload} 
	on:caption={caption}/>

{:else if pages.viewImage}
<ViewImage {fileHash} {postCaption} />

{/if}