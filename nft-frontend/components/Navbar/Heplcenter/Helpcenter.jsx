import React from "react";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./Helpcenter.module.css";

const Helpcenter = () => {
    //dynamic array
    const helpCenter = [
      {name:"About",
        link:"about"
      },
      {name:"Contact Us",
        link:"contact-us"
      },
      {name:"Sign UP",
        link:"sign-up"
      },
      {name:"Sign In",
        link:"sign-in"
      },
      {name:"Subscription",
        link:"subscription"
      },
    ]

  return  (
    <div className={Style.box}>
       {helpCenter.map((el)=>(
        <div key={el.link} className={Style.helpCenter}>
          <Link href={`/${el.link}`}>{el.name}</Link>
        </div>
       ))}
    </div>
  )
};

export default Helpcenter;
