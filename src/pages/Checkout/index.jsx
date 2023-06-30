import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Components/layout/ShopHeader";
import Footer from "../../Components/layout/Footer";
import { WOOCOMMERCE_COUNTRIES_ENDPOINT } from "../../utils/constants/endpoints";
import CheckoutForm from "../../Components/checkout/CheckoutForm";
const CheckoutPage = () => {
  const [countries, setCountries] = useState([]);

  const url = WOOCOMMERCE_COUNTRIES_ENDPOINT;

  const fetchCountries = async () => {
    try {
      const response = await axios.get(url);
      const { data } = response;
      setCountries(data);
    } catch (error) {
      // Handle error
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <main>
      <Header />
      <div className="container mx-auto py-5">
        <h1>Checkout</h1>
        <CheckoutForm countriesData={countries} />
      </div>
      <Footer />
    </main>
  );
};

export default CheckoutPage;
