import React, { useContext, useState } from "react";
import { AppContext } from "../context";
import { Link } from "react-router-dom";
const defaultCustomerInfo = {
  firstName: "Imran",
  lastName: "Sayed",
  address1: "123 Abc farm",
  address2: "Hill Road",
  city: "Mumbai",
  country: "IN",
  state: "Maharastra",
  postcode: "221029",
  email: "codeytek.academy@gmail.com",
  phone: "9883778278",
  company: "The Company",
  errors: null,
};

const CheckoutForm = ({ countriesData }) => {
  console.log("countriesData", countriesData);

  const { billingCountries, shippingCountries } = countriesData || {};
  const initialState = {
    billing: { ...defaultCustomerInfo },
    shipping: { ...defaultCustomerInfo },
    createAccount: false,
    orderNotes: "",
    billingDifferentThanShipping: false,
    paymentMethod: "cod",
  };
  const [cart, setCart] = useContext(AppContext);
  const [input, setInput] = useState(initialState);
  const [requestError, setRequestError] = useState(null);
  const [theShippingStates, setTheShippingStates] = useState([]);
  const [isFetchingShippingStates, setIsFetchingShippingStates] =
    useState(false);
  const [theBillingStates, setTheBillingStates] = useState([]);
  const [isFetchingBillingStates, setIsFetchingBillingStates] = useState(false);
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [createdOrderData, setCreatedOrderData] = useState({});
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("checkout");
  };

  return (
    <>
      {cart ? (
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              {/*shipping details*/}
              <div>
                <h1>Shipping Details</h1>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div>
          <h1>No item in cart</h1>
          <div className="mt-3">
            <Link to="/shop" className="bg-red-700 text-white px-2 py-3">
              Return to Shop
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
export default CheckoutForm;
