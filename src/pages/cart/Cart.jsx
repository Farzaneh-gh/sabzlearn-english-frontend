import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../../contexts/cartContext";


export default function Cart() {
  const { cartItems, removeFromCart, isLoading } = useContext(CartContext);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);

  if (isLoading) {
    return (
      <div className="container py-10">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        <p>Loading cart items...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen mx-auto flex flex-col items-center justify-center my-auto">
        <img    
          src="/images/info/empty-shopping-cart.webp"
          alt="Empty Cart"
          className="mx-auto w-64 h-64"
        />
        <h1 className="text-2xl font-bold mt-6 mb-2 text-gray-600 dark:text-gray-200">Your Cart is Empty</h1>
        <p className="text-gray-600 dark:text-gray-200 mb-6">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/courses/1"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  return (
    <section
      id="cart-page"
      className="bg-gray-50 dark:bg-gray-900 min-h-screen mx-auto   "
    >
     
        <div className="xxs:container p-3 pt-40">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 mt-10">
            Shopping Cart
          </h1>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
                <ul>
                  {cartItems.map((item, index) => (
                    <li
                      key={item._id}
                      className={`flex items-center justify-center flex-col xxs:flex-row md:gap-4 p-4 ${
                        index < cartItems.length - 1
                          ? "border-b border-gray-200 dark:border-gray-700"
                          : ""
                      }`}
                    >
                      <img
                        className=" object-cover object-center   rounded-xl  w-20 h-20 md:w-30 md:h-30"
                        loading="lazy"
                        src={`${
                          import.meta.env.VITE_BACKEND_URL_IMG
                        }/courses/covers/${item?.cover}`}
                        alt={item.name}
                      />
                      <div className="flex-grow ml-3  ">
                        <h2 className="font-semibold text-sm md:text-lg text-gray-800 dark:text-white">
                          {item.name}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          By Sabzlearn
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mr-a">
                        <p className="font-semibold text-sm md:text-lg text-gray-800 dark:text-white">
                          ${item.price.toLocaleString()}
                        </p>
                        <button
                          onClick={() => removeFromCart(item)}
                          className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                          
                        >
                            <svg className="w-4 h-4 md:w-6 md:h-6">
                                <use href="#icon-trash" />
                            </svg>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                  Order Summary
                </h2>
                <div className="flex justify-between mb-2 text-gray-600 dark:text-gray-300">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-4 text-gray-600 dark:text-gray-300">
                  <span>Taxes</span>
                  <span>$0.00</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
                <div className="flex justify-between font-bold text-lg text-gray-800 dark:text-white">
                  <span>Total</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <button className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
    
    </section>
  );
}
