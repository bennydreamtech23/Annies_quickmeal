import Layout from "../../Components/layout/Layout";
import Products from "../../Components/Products";
import React, {useContext } from "react";
import { MenuContext } from "../../contexts/MenuContext";

const Shop = (props) => {
  const { isMenuOpen } = useContext(MenuContext);
  return (
    <main>
      <Layout>
        <Products showSidebar={isMenuOpen} />
      </Layout>
    </main>
  );
};
export default Shop;
