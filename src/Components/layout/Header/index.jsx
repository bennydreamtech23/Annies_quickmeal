import { HEADER_FOOTER_ENDPOINT } from "../../../utils/constants/endpoints";
import logo from "../../../assets/logo.jpg";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { NavLink, useNavigate } from "react-router-dom";
const Header = () => {
  const [header, setHeader] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const url = HEADER_FOOTER_ENDPOINT;
  const navigate = useNavigate();

  const shopLink = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/shop");
    } else {
      navigate("/login");
    }
  };
  const fetchInfo = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => setHeader(data?.data?.header || {}));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const { siteLogoUrl, siteTitle, siteDescription, favicon } = header || {};

  return (
    <header>
      <Helmet>
        <title>{siteTitle || "AnniesQuickMeal"}</title>
        <meta name="keywords" content="HTML,CSS,JavaScript" />
        <meta name="description" content={siteDescription} />
        <link rel="icon" type="image/svg+xml" href={favicon || logo} />
      </Helmet>

      <div className="bg-black text-white">
        <nav className="flex items-center justify-between flex-wrap  container mx-auto py-5 px-5 lg:px-0">
          <div className="flex items-center flex-shrink-0 text-white">
            <img
              src={siteLogoUrl || logo}
              className="w-100 h-10 mr-3"
              alt={siteTitle}
            />
            <div>
              <h1 className="font-medium lg:text-xl text-lg">
                {siteTitle || "AnniesQuickMeal"}
              </h1>
              <p className="text-gray-400 tracking-tight">
                {siteDescription || "I love Cooking"}
              </p>
            </div>
          </div>

          <div className="block lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center px-3 py-2 rounded text-white hover:text-red-400 "
            >
              <svg
                className={`fill-current h-5 w-5 ${
                  isOpen ? "hidden" : "block"
                }`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
              <svg
                className={`fill-current h-5 w-5 ${
                  isOpen ? "block" : "hidden"
                }`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
              </svg>
            </button>
          </div>
          <div
            className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <div className="text-sm flex flex-col lg:flex-row lg:justify-center lg:align-center lg:flex-grow lg:mt-0 mt-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold bg-red-800 rounded-lg px-2 py-2  xl:mr-3 lg:mr-3 lg:w-auto w-24"
                    : " font-medium xl:mr-3 lg:mr-3 px-2 py-2 hover:bg-red-800 hover:rounded-lg w-24 text-center lg:mt-0 mb-3 lg:w-auto"
                }
              >
                HOME
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold bg-red-800 rounded-lg px-2 py-2  xl:mr-3 lg:mr-3 lg:w-auto mt-2 lg:mt-0"
                    : " font-medium xl:mr-3 lg:mr-3 px-2 py-2 hover:bg-red-800 hover:rounded-lg w-24 text-center lg:mt-0 mb-3 lg:w-auto mt-2 lg:mt-0"
                }
              >
                CONTACT
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold bg-red-800 rounded-lg px-2 py-2  xl:mr-3 lg:mr-3 lg:w-auto"
                    : " font-medium xl:mr-3 lg:mr-3 px-2 py-2 hover:bg-red-800 hover:rounded-lg w-24 text-center lg:mt-0 mb-3 lg:w-auto"
                }
              >
                ABOUT
              </NavLink>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold bg-red-800 rounded-lg px-2 py-2  xl:mr-3 lg:mr-3 lg:w-auto"
                    : " font-medium xl:mr-3 lg:mr-3 px-2 py-2 hover:bg-red-800 hover:rounded-lg w-24 text-center lg:mt-0 mb-3 lg:w-auto"
                }
              >
                BLOG
              </NavLink>
              <NavLink
                to="/gallery"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold bg-red-800 rounded-lg px-2 py-2  xl:mr-3 lg:mr-3 lg:w-auto"
                    : " font-medium xl:mr-3 lg:mr-3 px-2 py-2 hover:bg-red-800 hover:rounded-lg w-24 text-center lg:mt-0 mb-3 lg:w-auto"
                }
              >
                GALLERY
              </NavLink>
            </div>
            <div>
              <button
                className="inline-flex items-center bg-red-700 rounded-3xl border-0 py-2 px-4 text-white font-medium"
                onClick={(e) => shopLink(e)}
              >
                Shop
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
