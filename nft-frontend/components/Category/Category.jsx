import React from "react";
import Image from "next/image";
import { BsCircleFill } from "react-icons/bs";

//Internal import
import Style from "./Category.module.css";
import images from "../../img";

const Category = () => {
  // Fixed typo: CategoriyArray -> CategoryArray
  const CategoryArray = [1, 2, 3, 4, 5, 6];

  return (
    <div className={Style.box_category}>
      <div className={Style.category}>
        {CategoryArray.map((el, i) => (
          // Fixed: key={1+1} theke key={i} kora hoyeche
          <div className={Style.category_box} key={i}>
            <Image
              src={images.creatorbackground1}
              className={Style.category_box_img}
              alt="Background image"
              width={350}
              height={150}
              objectFit="cover"
            />

            <div className={Style.category_box_title}>
              <span>
                <BsCircleFill />
              </span>
              <div className={Style.category_box_title_info}>
                <h4>Entertainment</h4> {/* Fixed typo */}
                <small>1995 NFTS</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
