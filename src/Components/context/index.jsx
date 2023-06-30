import React, { useState, useEffect } from "react";

export const AppContext = React.createContext([null, () => {}]);

export const AppProvider = (props) => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    localStorage.setItem("next-cart", JSON.stringify(cart));
    console.log("Cart value:", cart); // Log the cart value
  }, [cart]);

  return (
    <AppContext.Provider value={[cart, setCart]}>
      {props.children}
    </AppContext.Provider>
  );
};
