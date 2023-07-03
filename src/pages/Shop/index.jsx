import Layout from "../../Components/layout/Layout";
import Products from "../../Components/Products";

const Shop = ({ showSidebar}) => {
  return (
    <main>
      <Layout>
        <Products showSidebar={showSidebar} />
      </Layout>
    </main>
  );
};
export default Shop;
