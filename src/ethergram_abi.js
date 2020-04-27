var ethergramABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "getAllPosts",
		"outputs": [
			{
				"name": "",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
				"name": "_imageHash",
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
		"constant": true,
		"inputs": [
			{
				"name": "_uploader",
				"type": "address"
			}
		],
		"name": "getPostsByUploader",
		"outputs": [
			{
				"name": "",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_imageHash",
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
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "uploader",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "ipfsHash",
				"type": "bytes32"
			}
		],
		"name": "LogUpload",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "clapper",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "ipfsHash",
				"type": "bytes32"
			}
		],
		"name": "LogClap",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "commenter",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "imageHash",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "commentHash",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "LogComment",
		"type": "event"
	}
]

module.exports = ethergramABI;