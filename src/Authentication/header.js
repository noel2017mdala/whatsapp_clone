import React from "react";
import logo1 from "./icons/whatsapp2.png";
const Header = () => {
  return (
    <header className="bg-main sm:h-32 md:h-44 ">
      <div
        className="
            flex flex-row
            pt-9
            sm:items-center sm:justify-center
            md:items-start md:justify-start md:pl-12
          "
      >
        <div className="basis-1/4">
          <img src={logo1} alt="whatsapp web" width="45" height="10" />
        </div>
        <div className="basis-1/4 text-white ml-4 sm:text-xl md:text-2xl uppercase">
          whatsapp web
        </div>
      </div>
    </header>
  );
};

export default Header;
