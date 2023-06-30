// AddToCart.jsx
import React, { useState, useContext } from "react";
import { AppContext } from "../context";

import { addToCart } from "../../utils/cart";
import { isEmpty } from "lodash";
import { BsFillCartPlusFill } from "react-icons/bs";
import cx from "classnames";
import CartModal from "../CartModal";

const AddToCart = ({ product }) => {
  const [cart, setCart] = useContext(AppContext);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //console.log("addToCart called with productId:", product);
 // console.log("setCart function:", setCart);

  const addToCartBtnClasses = cx(
    "duration-500 font-semibold py-2 px-4 border rounded-3xl shadow",
    {
      "bg-red-700 hover:bg-red-500 text-white border-red-400": !loading,
      "bg-gray-200 border-gray-400 text-gray-400": loading,
    }
  );

  if (isEmpty(product)) {
    return <h1>No Product</h1>;
  }

  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center gap-3">
      <button
        className={addToCartBtnClasses}
        onClick={() =>
          addToCart(product?.id ?? 0, 1, setCart, setIsAddedToCart, setLoading)
        }
        disabled={loading}
      >
        {loading ? "Adding.." : <BsFillCartPlusFill />}
      </button>
      {isAddedToCart && !loading ? (
        <button
          onClick={openModal}
          className="bg-red-700 text-white hover:bg-red-500 font-semibold py-2 px-4 border border-red-400 rounded-3xl shadow text-base"
        >
          View cart
        </button>
      ) : null}
      {/* Offcanvas modal */}
      <CartModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default AddToCart;
