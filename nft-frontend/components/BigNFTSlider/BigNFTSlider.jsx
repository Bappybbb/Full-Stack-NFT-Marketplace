import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AiFillFire, AiFillHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import { TbArrowBigLeftLine, TbArrowBigRightLine } from "react-icons/tb";

//INTERNAL IMPORT
import Style from "./BigNFTSlider.module.css";
import images from "../../img";
import Button from "../Button/Button";

const BigNFTSlider = () => {
  const sliderData = [
    {
      title: "Hi NFT",
      id: 1,
      name: "Bappy Hasan",
      collection: "Home",
      price: "0003435644 ETH",
      like: 243,
      image: images.user1,
      nftImage: images.nft_image_1,
      time: { days: 23, hours: 10, minutes: 11, seconds: 45 },
    },
    {
      title: "Hello NFT",
      id: 2,
      name: "Raisa Akther",
      collection: "Home",
      price: "0003435644 ETH",
      like: 243,
      image: images.user2,
      nftImage: images.nft_image_2,
      time: { days: 3, hours: 5, minutes: 40, seconds: 10 },
    },
    {
      title: "Big NFT",
      id: 3,
      name: "Sadia Islam",
      collection: "Office",
      price: "0444644 ETH",
      like: 243,
      image: images.user3,
      nftImage: images.nft_image_3,
      time: { days: 10, hours: 2, minutes: 15, seconds: 30 },
    },
  ];

  const [idNumber, setIdNumber] = useState(0);
  const activeItem = sliderData[idNumber];

  // Prev / Next handlers with wrapping
  const handlePrev = () => {
    setIdNumber((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIdNumber((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={Style.bigNFTSlider}>
      <div className={Style.bigNFTSlider_box}>
        {/* ============ LEFT SECTION ============ */}
        <div className={Style.bigNFTSlider_box_left}>
          <h2>{activeItem.title}</h2>

          {/* Creator section */}
          <div className={Style.bigNFTSlider_box_left_creator}>
            <div className={Style.bigNFTSlider_box_left_creator_profile}>
              <Image
                src={activeItem.image}
                alt="creator"
                width={80}
                height={80}
                className={Style.bigNFTSlider_box_left_creator_profile_img}
              />
              <div className={Style.bigNFTSlider_box_left_creator_profile_info}>
                <p>Creator</p>
                <h4>
                  {activeItem.name} <MdVerified />
                </h4>
              </div>
            </div>

            <div className={Style.bigNFTSlider_box_left_creator_collection}>
              <AiFillFire
                className={Style.bigNFTSlider_box_left_creator_collection_icon}
              />
              <div
                className={Style.bigNFTSlider_box_left_creator_collection_info}
              >
                <p>Collection</p>
                <h4>{activeItem.collection}</h4>
              </div>
            </div>
          </div>

          {/* Bidding box */}
          <div className={Style.bigNFTSlider_box_left_bidding_box}>
            <small>Current Bid</small>

            <div className={Style.bigNFTSlider_box_left_bidding_box_auction}>
              <MdTimer
                className={Style.bigNFTSlider_box_left_bidding_box_icon}
              />
              <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>
                <div
                  className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
                >
                  <p>{activeItem.time.days}</p>
                  <span>Days</span>
                </div>
                <div
                  className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
                >
                  <p>{activeItem.time.hours}</p>
                  <span>Hours</span>
                </div>
                <div
                  className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
                >
                  <p>{activeItem.time.minutes}</p>
                  <span>Mins</span>
                </div>
                <div
                  className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
                >
                  <p>{activeItem.time.seconds}</p>
                  <span>Secs</span>
                </div>
              </div>
            </div>

            <h3>{activeItem.price}</h3>
          </div>

          {/* Buttons */}
          <div className={Style.bigNFTSlider_box_left_button}>
            <Button btnName="Place Bid" handleClick={() => {}} />
            <Button btnName="View" handleClick={() => {}} />
          </div>

          {/* Slider arrows */}
          <div className={Style.bigNFTSlider_box_left_sliderBtn}>
            <TbArrowBigLeftLine
              className={Style.bigNFTSlider_box_left_sliderBtn_icon}
              onClick={handlePrev}
            />
            <TbArrowBigRightLine
              className={Style.bigNFTSlider_box_left_sliderBtn_icon}
              onClick={handleNext}
            />
          </div>
        </div>

        {/* ============ RIGHT SECTION ============ */}
        <div className={Style.bigNFTSlider_box_right}>
          <div className={Style.bigNFTSlider_box_right_box}>
            <Image
              src={activeItem.nftImage}
              alt="NFT"
              width={800}
              height={800}
              className={Style.bigNFTSlider_box_right_box_img}
            />
            <div className={Style.bigNFTSlider_box_right_box_like}>
              <AiFillHeart />
              <span>{activeItem.like}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigNFTSlider;
