import React, { useState } from "react";
import {
  FaFilter,
  FaAngleDown,
  FaAngleUp,
  FaWallet,
  FaMusic,
  FaVideo,
  FaUserAlt,
  FaImages,
} from "react-icons/fa";
import { AiFillCloseCircle, AiFillCodepenCircle } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { TiTick } from "react-icons/ti";

// Internal import
import Style from "./Filter.module.css";

const CATEGORIES = ["NFTs", "Arts", "Musics", "Sports", "Photography"];

const MEDIA_TYPES = [
  { key: "image", label: "Images", Icon: FaImages },
  { key: "video", label: "Videos", Icon: FaVideo },
  { key: "music", label: "Musics", Icon: FaMusic },
];

const Filter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState("NFTs");
  const [media, setMedia] = useState({ image: true, video: true, music: true });

  const toggleMedia = (key) =>
    setMedia((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className={Style.filter}>
      <div className={Style.filter_box}>
        <div className={Style.filter_box_left}>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className={
                activeCategory === category ? Style.category_active : undefined
              }
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={Style.filter_box_right}>
          <button
            type="button"
            className={Style.filter_box_right_box}
            aria-expanded={isFilterOpen}
            aria-controls="filter-items"
            onClick={() => setIsFilterOpen((prev) => !prev)}
          >
            <FaFilter />
            <span>Filter</span>
            {isFilterOpen ? <FaAngleUp /> : <FaAngleDown />}
          </button>
        </div>
      </div>

      {isFilterOpen && (
        <div id="filter-items" className={Style.filter_box_items}>
          <div className={Style.filter_box_items_box}>
            <div className={Style.filter_box_items_box_item}>
              <FaWallet />
              <span>10 ETH</span>
              <AiFillCodepenCircle />
            </div>
          </div>

          {MEDIA_TYPES.map(({ key, label, Icon }) => (
            <div key={key} className={Style.filter_box_items_box}>
              <button
                type="button"
                className={Style.filter_box_items_box_item_trans}
                aria-pressed={media[key]}
                onClick={() => toggleMedia(key)}
              >
                <Icon />
                <small>{label}</small>
                {media[key] ? <AiFillCloseCircle /> : <TiTick />}
              </button>
            </div>
          ))}

          <div className={Style.filter_box_items_box}>
            <div className={Style.filter_box_items_box_item}>
              <FaUserAlt />
              <span>Verified</span>
              <MdVerified />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
