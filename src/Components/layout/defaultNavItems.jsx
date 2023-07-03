import React from "react";
import { AiFillHome } from "react-icons/ai";

import { BsCartCheckFill, BsCart4 } from "react-icons/bs";
import { MdMiscellaneousServices } from "react-icons/md";
export const defaultNavItems = [
  {
    label: "Home",
    href: "/",
    icon: <AiFillHome className="w-6 h-6" />,
  },
  {
    label: "Services",
    href: "/services",
    icon: <MdMiscellaneousServices className="w-6 h-6" />,
  },
  {
    label: "Orders",
    href: "/order",
    icon: <BsCartCheckFill className="w-6 h-6" />,
  },
  {
    label: "Cart",
    href: "/cart",
    icon: <BsCart4 className="w-6 h-6" />,
  },
];
