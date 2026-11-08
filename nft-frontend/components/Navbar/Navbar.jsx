import React, { useState } from "react";
import Image from "next/image";
//---------IMPORT ICON
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuRight } from "react-icons/cg";

//-----INTERNAL  IMPORT
import Style from "./Navbar.module.css";
import { Discover, Helpcenter, Notification, Profile, Sidebar } from "./index";
import { Button } from "../componentsindex";
import images from "../../img";

const NavBar = () => {
  //---useState Component
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const toggleMenu = (menu) => {
    setDiscover(menu === "discover" ? !discover : false);
    setHelp(menu === "help" ? !help : false);
    setNotification(false);
    setProfile(false);
  };

  const openNotification = () => {
    if (!notification) {
      setNotification(true);
      setDiscover(false);
      setHelp(false);
      setProfile(false);
    } else {
      setNotification(false);
    }
  };

  const openProfile = () => {
    if (!profile) {
      setProfile(true);
      setHelp(false);
      setDiscover(false);
      setNotification(false);
    } else {
      setProfile(false);
    }
  };

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        {/* LEFT */}
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            <Image
              src={images.logo}
              alt="NFT_MARKET_PLACE"
              width={100}
              height={100}
            />
          </div>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type="search" placeholder="Search NFT" aria-label="Search NFTs" />
              <BsSearch aria-hidden="true" className={Style.search_icon} />
            </div>
          </div>
        </div>
        {/* //END of left section */}

        {/*Start RIGHT */}
        <div className={Style.navbar_container_right}>
          {/* discover component 1 */}
          <div className={Style.navbar_container_right_discover}>
            {/* Discover Menu */}
            <button
              type="button"
              onClick={() => toggleMenu("discover")}
              aria-expanded={discover}
            >
              Discover
            </button>
            {/* Dynamic block */}
            {discover && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover />
              </div>
            )}
          </div>
          {/*help component 2 */}
          <div className={Style.navbar_container_right_help}>
            <button
              type="button"
              onClick={() => toggleMenu("help")}
              aria-expanded={help}
            >
              Help Center
            </button>
            {help && (
              <div className={Style.navbar_container_right_help_box}>
                <Helpcenter />
              </div>
            )}
          </div>
          {/* Notification component 3 */}
          <div className={Style.navbar_container_right_notify}>
            <button
              type="button"
              className={Style.notify}
              onClick={openNotification}
              aria-label="Notifications"
              aria-expanded={notification}
            >
              <MdNotifications aria-hidden="true" />
            </button>
            {notification && <Notification />}
          </div>
          {/* Create Button Section component 4 */}
          <div className={Style.navbar_container_right_button}>
            <Button btnName="Create" handleClick={() => {}} />
          </div>
          {/* // User Profile */}
          <div className={Style.navbar_container_right_profile_box}>
            <button
              type="button"
              className={Style.navbar_container_right_profile_button}
              onClick={openProfile}
              aria-label="Profile"
              aria-expanded={profile}
            >
              <Image
                src={images.user1}
                alt="profile"
                width={40}
                height={40}
                className={Style.navbar_container_right_profile}
              />
            </button>
            {profile && <Profile />}
          </div>
          {/* MENU Button component 5 */}
          <div className={Style.navbar_container_right_menuBtn}>
            <button
              type="button"
              className={Style.menuButton}
              onClick={() => setOpenSideMenu((isOpen) => !isOpen)}
              aria-label={openSideMenu ? "Close menu" : "Open menu"}
              aria-expanded={openSideMenu}
            >
              <CgMenuRight aria-hidden="true" className={Style.menuIcon} />
            </button>
          </div>
        </div>
      </div>
      {/* SIDEBAR component */}
      {openSideMenu && (
        <div className={Style.Sidebar}>
          <Sidebar setOpenSideMenu={setOpenSideMenu} />
        </div>
      )}
    </div>
  );
};

export default NavBar;
