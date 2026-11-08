 import React from 'react'
 
 //INTERNAL imporrt
 import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  BigNFTSlider,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  FollowerTab,
} from "../components/componentsindex";

 const Home = () => {
   return (
     <div className={Style.homePage}>
       <HeroSection />
       <Service />
       <BigNFTSlider />
       <Title
         heading="New Collections"
         paragraph="Discover the most outstanding NFTs in all topic of life"
       />
       <NFTCard />
       {/* <Title
         heading="Filter By Collection"
         paragraph="Discover the most outstanding NFTs in all topic of life"
       /> */}
       <FollowerTab />
       <Collection />
       <Title
         heading="Feature NFTs"
         paragraph="Discover the most outstanding NFTs in all topic of life"
       />
       <Filter />

       <Title
         heading="Browse by category"
         paragraph="Explore the NFTs in the most featured categorieds."
       />
       <Category />
       <Subscribe />
     </div>
   );
 }
 
 export default Home
 