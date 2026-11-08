import React from "react";
import Image from "next/image";
//ALL SOCIAL MEDIA ICON,which i use Sidebar.jsx >
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialYoutube,
  TiSocialTwitter,
  TiSocialInstagram,
  TiArrowSortedDown,
} from "react-icons/ti";
import { RiSendPlaneFill } from "react-icons/ri";

//INTRNAL IMPORT
import Style from "./Footer.module.css";
import images from "../../img";
import { Discover, Helpcenter } from "../Navbar/index";

const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        {/* First section */}
        <div className={Style.footer_box_social}>
          <Image src={images.logo} alt="footer logo" height={100} width={100} />
          <p>
            The World's first and largest digital marketplace for the
            ....collectibles and non-fungible tokens(NFTs).But,sell and store
            ...excluive digital items
          </p>
          <div className={Style.footer_social}>
            <a href="#">
              <TiSocialFacebook />
            </a>
            <a href="#">
              <TiSocialInstagram />
            </a>
            <a href="#">
              <TiSocialYoutube />
            </a>
            <a href="#">
              <TiSocialLinkedin />
            </a>
            <a href="#">
              <TiSocialTwitter />
            </a>
          </div>
        </div>

        {/* second section */}

        <div className={Style.footer_box_discover}>
          <h3>Discover</h3>
          <Discover />
        </div>

        <div className={Style.footer_box_help}>
          <h3>Help Center</h3>
          <Helpcenter />
        </div>
        <div className={Style.subscribe}>
          <h3>Subscribe</h3>

          <div className={Style.subscribe_box}>
            <input type="email" placeholder="Enter your email" />
            <RiSendPlaneFill className={Style.subscribe_box_send} />
          </div>
            <div className={Style.subscribe_box_info}>
              <p>
                Discover ,collect,and sell extraordinary NFTs Openea is the first
                and largest NFT marketplace
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
