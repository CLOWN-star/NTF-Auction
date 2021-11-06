pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTAuction is ERC721URIStorage{
    string public NFTName;
    string public NFTSymbol;
    uint256 public number;
    mapping(uint256 => NFT) public allNFT;// use allNFT to save nftinfo
    mapping(uint256 => bool) public IDused;//use this to log which name has been uesd
    mapping(uint256 => mapping(uint256 =>  address payable)) public priowner;
    constructor() ERC721("NFT ART", "NACZR") {
         NFTName = "NFT ART";
         NFTSymbol = "NACZR";
    }
    
    struct NFT{
        uint256 ID;
        string name;
        string description;
        string URI;
        address payable minter;
        address payable owner;
        address payable bidder;
        uint256 nowprice;
        uint256 endtime;
        uint256 saletimes;
        bool onsale;
        bool claim;
        
    }
    
    
    
    function  mintNFT(string memory NFTname, string memory NFTtokenURI, string memory NFTdesc) public{
         number++;
         uint256 _tokenId = number;
         require(!IDused[_tokenId],"ID used");
         IDused[_tokenId] = true;
         
         _mint(msg.sender, _tokenId);
         _setTokenURI(_tokenId, NFTtokenURI);//mint and set URI
         
         NFT memory newNFT = NFT(
            number,
            NFTname,
            NFTdesc,
            NFTtokenURI,
            payable(msg.sender),
            payable(msg.sender),
            payable(address(0)),
            0,
            block.timestamp,
            0,
            false,
            false
           
        );
        allNFT[number] = newNFT;
        priowner[_tokenId][0] = payable(msg.sender);
     }
     
     function  startAuction(uint256  _tokenID, uint256 startpirce , uint256 time)  public returns (bool ){
         require(msg.sender == ownerOf(_tokenID),"Not owner");
         NFT memory nft = allNFT[_tokenID];
         nft.nowprice = startpirce;
         nft.endtime = block.timestamp + time;
         nft.onsale = true;
         nft.claim = false;
         allNFT[_tokenID] = nft;
         return true;
     }
     
     function  bidNFT(uint256  _tokenID, uint256 price)  public returns (bool ){
         require(msg.sender != ownerOf(_tokenID),"Cant owner");
         NFT memory nft = allNFT[_tokenID];
         require(block.timestamp < nft.endtime,"Auction ended");
         require(price > nft.nowprice,"Money not enough");
         nft.nowprice = price;
         nft.bidder = payable(msg.sender);
         allNFT[_tokenID] = nft;
         return true;
     }
     
     function endAuction(uint256  _tokenID) public returns (bool){
         NFT memory nft = allNFT[_tokenID];
          require(block.timestamp > nft.endtime,"Auction not ended");
          nft.onsale = false;
          allNFT[_tokenID] = nft;
          return true;
     }
     
     function claimNFT(uint256  _tokenID) public payable returns (bool){
         NFT memory nft = allNFT[_tokenID];
          require(nft.onsale == false,"NFT on sale");
          require(nft.claim != true,"Already claim");
          require(msg.sender == nft.bidder,"Not yours");
            nft.saletimes++;
           _transfer(nft.owner, msg.sender, _tokenID);
           
           payable(nft.owner).transfer(msg.value);
           
           nft.owner = payable(msg.sender);
           priowner[_tokenID][nft.saletimes] = payable(msg.sender);
           nft.bidder = payable(address(0));
           nft.nowprice = 0;
           nft.onsale = false;
           nft.claim = true;
           allNFT[_tokenID] = nft;
           
          return true;
     }
     
     
        function getprice(uint256 _tokenID) public view returns  (uint) {
         return allNFT[_tokenID].nowprice;
        }
    
        function getminter(uint256 _tokenID) public view returns  (address) {
         return allNFT[_tokenID].minter;
        }
        
        function getowner(uint256 _tokenID) public view returns  (address) {
         return allNFT[_tokenID].owner;
        }
        
        function getdesc(uint256 _tokenID) public view returns  (string memory) {
         return allNFT[_tokenID].description;
        }
        
        function isend(uint256 _tokenID) public view returns  (bool) {
         return allNFT[_tokenID].onsale;
        }
        
         function bidman(uint256 _tokenID) public view returns  (address ) {
         return allNFT[_tokenID].bidder;
        }
        
        function lefttime(uint256 _tokenID) public view returns  (uint) {
            uint m  = block.timestamp;
            uint t = allNFT[_tokenID].endtime - m;
            return t;
        }

        function gettime() public view returns  (uint) {
            return block.timestamp;
        }
        
         function getownertime(uint256 _tokenID,uint256 times) public view returns  (address) {
            return priowner[_tokenID][times];
        }

        function getnum(address owner) public view returns  (uint) {
            return balanceOf(owner);
        }
        
}