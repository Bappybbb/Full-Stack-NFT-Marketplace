import React from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";

//INTERNAL component
import Style from "./DaysComponent.module.css";
import images from "../../../img";

const DaysComponent = () => {
  return (
    <div className={Style.deysComponent}>
      <div className={Style.deysComponent_box}>
        <div className={Style.deysComponent_box_img}>
          <Image
            src={images.creatorbackground1}
            className={Style.deysComponent_box_img_img}
            alt="profile background"
            width={500}
            height={300}
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className={Style.deysComponent_box_profile}>
          <Image
            src={images.creatorbackground2}
            alt="profile"
            width={200}
            height={200}
            className={Style.deysComponent_box_img_1}
            style={{ objectFit: "cover" }}
          />
          <Image
            src={images.creatorbackground2}
            alt="profile"
            width={200}
            height={200}
            className={Style.deysComponent_box_img_2}
            style={{ objectFit: "cover" }}
          />
          <Image
            src={images.creatorbackground2}
            alt="profile"
            width={200}
            height={200}
            className={Style.deysComponent_box_img_3}
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className={Style.deysComponent_box_title}>
          <h2>Amazing Collection</h2>
          <div className={Style.deysComponent_box_title_info}>
            <div className={Style.deysComponent_box_title_profile}>
              <Image
                src={images.user1}
                alt="profile"
                width={30}
                height={30}
                style={{ objectFit: "cover" }}
                className={Style.deysComponent_box_title_info_profile_img}
              />
              <p>
                Creator{" "}
                <span>
                  Shoaib Bhai
                  <small>
                    <MdVerified />
                  </small>
                </span>
              </p>
            </div>

            <div className={Style.deysComponent_box_title_info_price}>
              <small>1.255 ETH</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaysComponent;
