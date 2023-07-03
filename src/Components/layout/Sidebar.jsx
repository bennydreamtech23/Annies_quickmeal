import React, { useContext } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { defaultNavItems } from "./defaultNavItems";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { MenuContext } from "../../contexts/MenuContext";

const Sidebar = ({
  logo,
  header,
  collapsed,
  navItems = defaultNavItems,
  shown,
  setCollapsed,
}) => {
  const Icon = collapsed ? BsChevronRight : BsChevronLeft;
  const { siteLogoUrl, siteTitle, siteDescription } = header || {};
  const username = localStorage.getItem("username");
   const { isMenuOpen, toggleMenu } = useContext(MenuContext);

   const handleMenuButtonClick = () => {
     //setShowSidebar((prev) => !prev);
    toggleMenu()
    setCollapsed(isMenuOpen);
   
    console.log(isMenuOpen);
   };

  return (
    <div
      className={classNames({
        "bg-red-900 text-white fixed md:static md:translate-x-0 z-20": true,
        "transition-all duration-300 ease-in-out ": true,
        "w-[300px]": !collapsed,
        "w-16": collapsed,
        "-translate-x-full": !shown,
        "overflow-hidden": true, // Prevent scrolling
      })}
    >
      <div className="top-0 h-screen flex flex-col">
        {/* logo and collapse button */}
        <div
          className={classNames({
            "flex items-center border-b border-b-white transition-none": true,
            "p-4 justify-between": !collapsed,
            "py-4 justify-center": collapsed,
          })}
        >
          {!collapsed && (
            <div className="flex gap-3">
              <img
                className="whitespace-nowrap w-14 h-14"
                src={siteLogoUrl || logo}
              />
              <div>
                <h1 className="font-medium lg:text-lg text-md">
                  {siteTitle || "AnniesQuickMeal"}
                </h1>
                <p className="text-white tracking-tight text-sm">
                  {siteDescription || "I love Cooking"}
                </p>
              </div>
            </div>
          )}
          <button
            className="grid place-content-center hover:bg-red-100 hover:text-black w-10 h-10 rounded-full opacity-0 md:opacity-100"
            onClick={handleMenuButtonClick }
          >
            <Icon className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-grow">
          <ul
            className={classNames({
              "my-2 flex flex-col gap-2 items-stretch": true,
            })}
          >
            {navItems.map((item, index) => {
              return (
                <li
                  key={index}
                  className={classNames({
                    "text-white hover:bg-red-50 hover:text-black flex": true,
                    "transition-colors duration-300": true,
                    "rounded-md p-2 mx-3 gap-4 ": !collapsed,
                    "rounded-full p-2 mx-3 w-10 h-10": collapsed,
                  })}
                >
                  <Link to={item.href} className="flex gap-2">
                    {item.icon} <span>{!collapsed && item.label}</span>
                  </Link>
                </li>
              );
            })}
            {!collapsed && (
              <li className="mt-14 text-white hover:bg-red-500  flex transition-colors duration-300 rounded-md p-2 mx-3 gap-4">
                <div className="flex gap-2">
                  <CgProfile className="text-2xl" />
                  <div className="flex flex-col">
                    <span className="text-white my-0 ">{username}</span>
                    <Link to="/profile" className="text-red-100 text-sm">
                      View Profile
                    </Link>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
