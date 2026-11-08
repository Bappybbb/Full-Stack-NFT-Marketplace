// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";



contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds; //এ পর্যন্ত কতগুলো NFT বানানো হয়েছে (প্রতিটা নতুন NFT এর ID হবে ১, ২, ৩...
    Counters.Counter private _itemsSold; //_itemsSold: কতগুলো বিক্রি হয়েছে
    address payable owner;
    uint256 listingPrice =0.0015 ether;//NFT লিস্ট করতে হলে এই fee দিতে হবে। এটা মালিক পাবে।
    mapping (uint256 => MarketItem) private idMarketItem; //token ID দিলে সেই NFT এর পুরো তথ্য (MarketItem) পাওয়া যায়।

//প্রতিটা NFT এর জন্য এই ৫টা তথ্য রাখা হয়
    struct MarketItem {
        uint256 tokenId; //: NFT এর নম্বর
        address payable seller; //কে বিক্রি করছে
        address payable owner;  //এখন কার কাছে আছে (লিস্ট থাকলে address(this), মানে contract নিজে)
        uint256 price;
        bool sold;  //বিক্রি হয়েছে কিনা
    }
     //নতুন NFT লিস্ট হলে blockchain এ একটা নোট থেকে যায়, যেটা frontend শুনতে পারে।
    event idMarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    ); 
    //Modifier হলো একটা পাহারাদার। যে ফাংশনে এটা লাগানো, সেখানে ঢোকার আগে চেক করে: কল করছে কে (msg.sender)? মালিক না হলে থামিয়ে error দেয়। _; মানে "চেক পাশ হলে এবার আসল ফাংশন চালাও"।
   modifier onlyOwner() {
      require(msg.sender == owner,
      "only owner of the marketplace can chage the listing price"
      );
      _;
   }



  constructor()ERC721("NFT Metaverse token","MYNFT"){
        owner = payable(msg.sender);   //owner = payable(msg.sender): যে deploy করছে সে-ই দোকানের মালিক।
  }

 
  //this function allowed me as a owner to charge higher or lower price set in the contract list,where price will be change,that's why we use payable
  //token er price list kora hocce ,শুধু মালিক এই fee বদলাতে পারে (onlyOwner এর কারণে)।
  function updateListingPrice(uint256 _listingPrice) public payable onlyOwner{
    listingPrice = _listingPrice;
  }


   //check listingPrice,,anybody can check & view listingPrice
    //যে কেউ বর্তমান fee দেখতে পারে। view মানে শুধু পড়ে, কিছু বদলায় না, তাই gas লাগে না।
  function getListingPrice()public view returns(uint256) {
     return listingPrice;
  }
 

   //Let create,"CREATE NFT TOKEN FUNCTION"
   //when someone upload tokenURI,that's have a specific id,where return value uint256 is token id
   //payable কারণ listing fee পাঠাতে হবে।
  function createToken(string memory _tokenURI,uint256 price) public payable returns(uint256){
     _tokenIds.increment();//first we create token id
     uint256 newTokenId = _tokenIds.current();//second of we are getting current token id,where currect token id will be assign as a new token id
  
      _mint(msg.sender, newTokenId);   //_mint: NFT তৈরি করে কলারের wallet এ দাও।
      _setTokenURI(newTokenId, _tokenURI);  //standard of> _setTokenURI(uint256 tokenId, string memory _tokenURI) 
    
      //this function is not coming from openzeppelin,we are just create and pass to data
       createMarketItem(newTokenId, price); //এবার দোকানে লিস্ট করে দাও token tar, আর ID ফেরত দাও।
        return newTokenId;
   }

  
  
 
     //CREATE MARKET ITEMS
     //দুটো শর্ত: দাম শূন্য হতে পারবে না, আর পাঠানো ETH ঠিক listing fee এর সমান হতে হবে। শর্ত না মিললে পুরো লেনদেন বাতিল।
     //Mapping এ এই NFT এর তথ্য সেভ করা হলো।
 function createMarketItem(uint256 tokenId,uint256 price)private {
    require(price > 0,"Price must be at least 1");
    require(msg.value == listingPrice,"Price must be equal to listing price");
   
     idMarketItem[tokenId] = MarketItem(
     tokenId,
     payable(msg.sender),  //// seller = যে লিস্ট করছে
     payable(address(this)),  // owner = contract নিজে
     price,
     false      // এখনো বিক্রি হয়নি
     );
        //NFT টা বিক্রেতার wallet থেকে contract এর কাছে সরিয়ে দেওয়া হলো (দোকানের তাকে রাখা হলো)।
     _transfer(msg.sender, address(this), tokenId);  //openzeppelin>>function _transfer(address from, address to, uint256 tokenId)
   
     emit idMarketItemCreated(tokenId, msg.sender, address(this), price, false);  //Event ছাড়া হলো।
  }




  //FUNCTION FOR RESALE TOKEN
  //thi function allow to user that to send their NFT
  //when anyone call this fun ,he/she pass 2 value 
  //by tokenId ,we are mapping the data,and check that who is the owner of NFTs
 //শুধু এখনকার মালিকই resell করতে পারবে, আর fee দিতে হবে।
 function reSellToken(uint256 tokenId ,uint256 price)public payable {
    require(idMarketItem[tokenId].owner == msg.sender ,"Only item owner can perform the operation");
    require(msg.value == listingPrice,"Price must be equal to listing price"); //listingPrice = 0.0015 ether;
    //বিক্রি হয়নি, নতুন দাম, নতুন বিক্রেতা, আর মালিক আবার contract।
    idMarketItem[tokenId].sold = false;
    idMarketItem[tokenId].price = price;
    idMarketItem[tokenId].seller = payable(msg.sender);
    idMarketItem[tokenId].owner = payable(address(this));
    
    _itemsSold.decrement(); //when somebody resell that token will be decreases
   //বিক্রিত সংখ্যা ১ কমাও (কারণ আবার unsold হলো), আর NFT contract এ জমা দাও।
   _transfer(msg.sender, address(this), tokenId); 
 
 }
 


   
    //FUNCTION CREATE MARKET SALE
    //THIS function allow to create sale
    //createMarketSale: কেনা 
 function createMarketSale(uint256 tokenId)public payable {
  //NFT এর দাম নাও, ক্রেতাকে ঠিক সেই পরিমাণ ETH পাঠাতে হবে।
    uint256 price = idMarketItem[tokenId].price;
    require(msg.value ==price ,"Please submit the asking price in order to complete the purches");

    //নতুন মালিক = ক্রেতা, sold = true, বিক্রিত সংখ্যা ১ বাড়াও।
    idMarketItem[tokenId].owner=payable(msg.sender);
    idMarketItem[tokenId].sold = true;
   _itemsSold.increment();
    //NFT contract থেকে ক্রেতার wallet এ যাচ্ছে।
    _transfer(address(this), msg.sender, tokenId);
  
   //টাকার ভাগ: দোকানের মালিক পায় listing fee, বিক্রেতা পায় NFT এর দাম।
    payable(owner).transfer(listingPrice);
    payable(idMarketItem[tokenId].seller).transfer(msg.value);
 }
 
 


    ///  এই তিনটা frontend এ তালিকা দেখানোর জন্য। সবগুলো একই ধাঁচে কাজ করে: প্রথম লুপে গোনে কয়টা মিলেছে, তারপর সেই মাপের array বানায়, দ্বিতীয় লুপে মিলে যাওয়া আইটেমগুলো array তে ভরে ফেরত দেয়। (Solidity তে memory array এর সাইজ আগে থেকে জানা লাগে, তাই দুই ধাপ।)
  //////////////////////////////////////////////////////////////////////////////////////
  //i + 1 কেন? কারণ token ID শুরু হয় ১ থেকে, কিন্তু লুপ শুরু হয় ০ থেকে।



  //GETTING UNSOLD NFT DATA
  //দোকানে বিক্রির জন্য থাকা সব NFT
  //কোন শর্তে >>  owner == address(this)
 function fetchMarketItem()public view returns(MarketItem[] memory) {
     uint256 itemCount = _tokenIds.current();
   uint256 unSoldItemCount =_tokenIds.current()  -  _itemsSold.current();
   uint256 currentIndex = 0;

   MarketItem[] memory items = new MarketItem[](unSoldItemCount);
   for (uint256 i = 0; i < itemCount; i++) {
       if(idMarketItem[i+1].owner == address(this)){  //
         uint256 currentId = i + 1;

         MarketItem storage currentItem = idMarketItem[currentId];
         items[currentIndex] = currentItem;
         currentIndex += 1;
       }
   }
   return items;
 }
  
  


  //PURCHASE ITEM
  //আমি যেগুলো কিনেছি/আমার কাছে আছে
  // কোন শর্তে  > owner == msg.sender
  function fetchMyNFT()public view returns(MarketItem[] memory){
    uint256 totalCount = _tokenIds.current();
    uint256 itemCount = 0;
    uint256 currentIndex =0;

    for (uint256 i = 0; i <totalCount; i++) {
      if (idMarketItem[i +1].owner == msg.sender) {
         itemCount  +=1;
      }
    }

    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint256 i = 0; i < totalCount; i++) {
      if (idMarketItem[i +1].owner == msg.sender) {
         uint256 curentId  = i + 1;
         MarketItem storage currentItem = idMarketItem[curentId];
         items[currentIndex] = currentItem;
         currentIndex  += 1;
      }
    }
    return items;
  }
   

   //SINGLE USER ITEMS
   //আমি যেগুলো লিস্ট করেছি
   //কোন শর্তে>> seller == msg.sender
  function fetchItemsListed()public view returns(MarketItem[]memory) {
    uint256 totalCount = _tokenIds.current();
    uint256 itemCount =0;
    uint256 currentIndex = 0;

     for (uint256 i = 0; i < totalCount ;  i++) {
      if (idMarketItem[i+1].seller == msg.sender) {
         itemCount += 1;
      }
     }
     MarketItem[] memory items = new MarketItem[](itemCount);
     for (  uint256 i= 0;  i < totalCount; i++) {
       if (idMarketItem[ i + 1].seller ==msg.sender) {
         uint256 currentId = i + 1;

         MarketItem storage currentItem = idMarketItem[currentId];
         items[currentIndex] = currentItem;
         currentIndex +=  1;
       }
     }
     return items;
  } 

}