import classNames from "classnames";
import React, { useState, useEffect } from "react";
import Navbar from "./ShopHeader";
import Sidebar from "./Sidebar";
import { Helmet } from "react-helmet";
import { HEADER_FOOTER_ENDPOINT } from "../../utils/constants/endpoints";
import logo from "../../assets/logo.jpg";
const Layout = (props) => {
  const [header, setHeader] = useState([]);
  const [collapsed, setSidebarCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  //api integration
  const url = HEADER_FOOTER_ENDPOINT;

  const fetchInfo = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => setHeader(data?.data?.header || {}));
  };

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  const { siteLogoUrl, siteTitle, siteDescription, favicon } = header || {};
  const handleMenuButtonClick = () => {
    setShowSidebar((prev) => !prev);
  };
  return (
    <>
      <Helmet>
        <title>{siteTitle || "AnniesQuickMeal"}</title>
        <meta name="keywords" content="HTML,CSS,JavaScript" />
        <meta name="description" content={siteDescription} />
        <link rel="icon" type="image/svg+xml" href={favicon || logo} />
      </Helmet>

      <div
        className={classNames({
          "grid bg-white min-h-screen": true,
          "grid-cols-sidebar": !collapsed,
          "grid-cols-sidebar-collapsed": collapsed,
          "transition-[grid-template-columns] duration-300 ease-in-out": true,
        })}
      >
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setSidebarCollapsed}
          shown={showSidebar}
          header={header}
          logo={logo}
        />
        <div className="">
          <Navbar
            onMenuButtonClick={handleMenuButtonClick}
            header={header}
            logo={logo}
          />
          <div showSidebar={showSidebar}>{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
