//INTRNAL IMPORT
import Style from "./Button..module.css";
import React from "react";

const Button = ({btnName, handleClick}) => {
  return (
    <div className={Style.box}>
      <button className={Style.button} onClick={()=>handleClick()}>
        {btnName}
      </button>
    </div>
  )
};

export default Button;
