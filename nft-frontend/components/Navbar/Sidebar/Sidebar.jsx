import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { GrClose } from "react-icons/gr";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialYoutube,
  TiSocialTwitter,
  TiSocialInstagram,
  TiArrowSortedDown,
} from "react-icons/ti";

//----internal import
import Style from "./Sidebar.module.css";
import images from "../../../img";
import Button from "../../Button/Button";

const Sidebar = ({ setOpenSideMenu }) => {
  //discover the helpcenter menu
  //useState
  const [openDiscover, setOpenDiscover] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);

  //-----discover navigation Menu
  const discover = [
    { name: "Collection", link: "collection" },
    { name: "Search", link: "search" },
    { name: "Author Profile", link: "author-profile" },
    { name: "NFT Details", link: "NFT-details" },
    { name: "Account Setting", link: "account-setting" },
    { name: "Connect Wallet", link: "connect-wallet" },
    { name: "Blog", link: "blog" },
  ];

  //----Help center
  //dynamic array
  const helpCenter = [
    { name: "About", link: "about" },
    { name: "Contact Us", link: "contact-us" },
    { name: "Sign UP", link: "sign-up" },
    { name: "Sign In", link: "sign-in" },
    { name: "Subscription", link: "subscription" },
  ];

  const closeSideBar = () => {
    setOpenSideMenu(false);
  };

  const openDiscoverMenu = () => {
    if (!openDiscover) {
      setOpenDiscover(true);
    } else {
      setOpenDiscover(false);
    }
  };

  const openHelpMenu = () => {
    if (!openHelp) {
      setOpenHelp(true);
    } else {
      setOpenHelp(false);
    }
  };

  return (
    <div className={Style.sideBar}>
      <button
        type="button"
        className={Style.sideBar_closeBtn}
        onClick={closeSideBar}
        aria-label="Close menu"
      >
        <GrClose />
      </button>

      <div className={Style.sideBar_box}>
        <Image src={images.logo} alt="logo" width={150} height={150} />
        <p>
          Discover the most outstanding articles on all topics of NFT * your own
          stories and share them
        </p>
        <div className={Style.sideBar_social}>
          <a href="#">
            <TiSocialYoutube />
          </a>
          <a href="#">
            <TiSocialInstagram />
          </a>
          <a href="#">
            <TiSocialLinkedin />
          </a>
          <a href="#">
            <TiSocialTwitter />
          </a>
          <a href="#">
            <TiSocialFacebook />
          </a>
        </div>
      </div>

      <div className={Style.sideBar_menu}>
        <div>
          <button
            type="button"
            className={Style.sideBar_menu_box}
            onClick={() => openDiscoverMenu()}
            aria-expanded={openDiscover}
          >
            <p>Discover</p>
            <TiArrowSortedDown />
          </button>
          {openDiscover && (
            <div className={Style.sideBar_discover}>
              {discover.map((el, i) => (
                <p key={i + 1}>
                  <Link href={`/${el.link}`}>{el.name}</Link>
                </p>
              ))}
            </div>
          )}
        </div>

        <div>
          <button
            type="button"
            className={Style.sideBar_menu_box}
            onClick={() => openHelpMenu()}
            aria-expanded={openHelp}
          >
            <p>Help Center</p>
            <TiArrowSortedDown />
          </button>
          {openHelp && (
            <div className={Style.sideBar_discover}>
              {helpCenter.map((el, i) => (
                <p key={i + 1}>
                  <Link href={`/${el.link}`}>{el.name}</Link>
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={Style.sideBar_button}>
        <Button btnName="Create" handleClick={()=>{}} />
        <Button btnName="Connect Wallet"  handleClick={()=>{}} />
      </div>
    </div>
  );
};

export default Sidebar;
