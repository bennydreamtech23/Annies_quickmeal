import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const [footer, setFooter] = useState([]);
  const url = import.meta.env.VITE_HEADER_FOOTER_ENDPOINT;

  const fetchInfo = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => setFooter(data?.data?.footer || {}));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  //const { socialLinks,  } =
  //  header || {};
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto py-6 px-5 lg:px-0">
        <div className="flex flex-wrap -mx-3 overflow-hidden ">
          <div className="mt-4 mb-8 px-3 w-full overflow-hidden sm:w-1/2 md:w-1/3 xl:w-1/4">
            <h3>details</h3>
            <h5>name</h5>
            <p>description</p>
          </div>
          <div className="mt-4 mb-8 px-3 w-full overflow-hidden sm:w-1/2 md:w-1/3 xl:w-1/4">
            <h3>details</h3>
            <h5>name</h5>
            <p>description</p>
          </div>
          <div className="mt-4 mb-8 px-3 w-full overflow-hidden sm:w-1/2 md:w-1/3 xl:w-1/4">
            <h3>details</h3>
            <h5>name</h5>
            <p>description</p>
          </div>
          
        </div>
      </div>
      <div className="bg-red-700 text-center p-2">
        <p>@anniesfoodies.com</p>
      </div>
    </footer>
  );
};

export default Footer;
