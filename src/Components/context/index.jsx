import React, { useState, useEffect } from "react";
export const AppContext = React.createContext([{}, () => {}]);

export const AppProvider = (props) => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    // @TODO Will add option to show the cart with localStorage later.
    let cartData = localStorage.getItem("woo-cart");
    cartData = null !== cartData ? JSON.parse(cartData) : "";
    setCart( cartData);
  }, []);
  
  /**
   * 1.When setCart() is called that changes the value of 'cart',
   * this will set the new data in the localStorage.
   *
   * 2.The 'cart' will anyways have the new data, as setCart()
   * would have set that.
   */
  useEffect(() => {
    localStorage.setItem("woo-cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <AppContext.Provider value={[cart, setCart]}>
      {props.children}
    </AppContext.Provider>
  );
};
