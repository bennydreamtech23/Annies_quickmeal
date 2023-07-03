import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import classNames from "classnames";

const Navbar = ({ header, onMenuButtonClick, logo }) => {
  const { siteLogoUrl, siteTitle, siteDescription, favicon } = header || {};
  return (
    <nav
      className={classNames({
        "bg-white text-zinc-500": true, // colors
        "flex items-center": true, // layout
        "w-screen md:w-full sticky z-10 px-4 shadow-sm h-[73px] top-0 ": true, //positioning & styling
      })}
    >
      <div className="flex gap-3">
        <img
          className="whitespace-nowrap w-14 h-14"
          src={siteLogoUrl || logo}
        />
        <div>
          <h1 className="font-medium lg:text-lg text-md text-black">
            {siteTitle || "AnniesQuickMeal"}
          </h1>
          <p className="text-gray-500 tracking-tight text-sm">
            {siteDescription || "I love Cooking"}
          </p>
        </div>
      </div>
      <div className="flex-grow"></div>
      <button className="md:hidden block lg:hidden" onClick={onMenuButtonClick}>
        <GiHamburgerMenu className="text-3xl" />
      </button>
    </nav>
  );
};

export default Navbar;
