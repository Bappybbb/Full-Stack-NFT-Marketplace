import React from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Subscribe.module.css";
import images from "../../img";

const Subscribe = () => {
  return (
    <div className={Style.subscribe}>
      <div className={Style.subscribe_box}>
        <div className={Style.subscribe_box_left}>
          <h2>Never miss a drop</h2>
          {/* Fixed "abour" to "about" */}
          <p>
            Subscribe to our super-exclusive drop list and be the first to know
            about upcoming drops
          </p>
          <div className={Style.subscribe_box_left_box}>
            <span>01</span>
            <small>get more discount</small>
          </div>
          <div className={Style.subscribe_box_left_box}>
            <span>02</span>
            <small>get premium magazines</small>
          </div>
          <div className={Style.subscribe_box_left_input}>
            {/* Fixed "nter" to "Enter" */}
            <input type="email" placeholder="Enter your email" />
            <RiSendPlaneFill className={Style.subscribe_box_left_input_icon} />
          </div>
        </div>

        <div className={Style.subscribe_box_right}>
          <Image
            src={images.update}
            alt="get update"
            height={600}
            width={800}
            className={
              Style.subscribe_box_right_img
            } /* Added class for sizing */
          />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
