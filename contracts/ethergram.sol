pragma solidity >=0.4.0;

import "./etherpostinterface.sol";

contract EtherGram is EtherPostInterface {
    
    mapping (address => bytes32[]) posts;
    
    mapping (bytes32 => address) posterOf;
    
    mapping (bytes32 => uint) clapCount;
    
    mapping (bytes32 => bytes32[]) comments;
    
    bytes32[] allPosts;
    
    //Chech if the post exists
    modifier postExist(bytes32 _ipfsHash) {
        require(posterOf[_ipfsHash] != address(0));
        _;
    }
    
    //Check if the post is new (not exists)
    modifier newPost(bytes32 _ipfsHash) {
        require(posterOf[_ipfsHash] == address(0));
        _;
    }
    
    function upload(bytes32 _ipfsHash) public newPost(_ipfsHash) {
        
        posts[msg.sender].push(_ipfsHash);
        posterOf[_ipfsHash] = msg.sender;
        allPosts.push(_ipfsHash);
        
        emit LogUpload(msg.sender, _ipfsHash);
    }
    
    function getAllPosts() public view returns(bytes32[] memory){
        return allPosts;
    }
    
    function getPostsByUploader(address _uploader) public view returns(bytes32[] memory){
        return posts[_uploader];
    }
    
    function clap(bytes32 _ipfsHash) public postExist(_ipfsHash) {
        clapCount[_ipfsHash]++;
        emit LogClap(msg.sender, _ipfsHash);
    }
    
    function getClapCount(bytes32 _imageHash) public postExist(_imageHash) returns(uint) {
        return clapCount[_imageHash];
    }
    
    function comment(bytes32 _imageHash, bytes32 _commentHash) public postExist(_imageHash) {
        comments[_imageHash].push(_commentHash);
        emit LogComment(msg.sender, _imageHash, _commentHash, now);
    }
    
    function getComments(bytes32 _imageHash) public postExist(_imageHash) returns(bytes32[] memory) {
        return comments[_imageHash];
    }
      
}