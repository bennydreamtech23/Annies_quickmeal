import { useState } from "react";
import CartContainer from "../cart/cartItemContainer";

const CartModal = ({ isOpen, onClose }) => {
  const closeModal = () => {
    onClose(false);
  };

  return (
    <div
      className={`fixed inset-0 overflow-hidden ${isOpen ? "flex" : "hidden"}`}
    >
      {/* Offcanvas overlay */}
      <div
        className="fixed inset-0 transition-opacity"
        aria-hidden="true"
        onClick={closeModal}
      >
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      {/* Offcanvas content */}
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col py-6 bg-white shadow-xl">
            {/* Close button */}
            <div className="px-4 sm:px-6">
              <button
                className="text-gray-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={closeModal}
              >
                <span className="sr-only">Close panel</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal content */}
            <div className="mt-6 relative flex-1 px-4 sm:px-6">
              <div className="absolute inset-0 px-4 sm:px-6 overflow-y-auto">
                <CartContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
