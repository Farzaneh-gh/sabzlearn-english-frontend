import React from "react";
import CartItem from "../CartItem/CartItem";
import CartContext from "../../../contexts/cartContext";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

function MobileCartSidebar({ closeMobileCartSidebar }) {
 const { cartItems,  removeFromCart } = React.useContext(CartContext);
console.log(cartItems);


  return (
    <div className="relative lg:hidden">
      <div className="flex flex-col fixed top-0 left-0 bottom-0 px-4 w-64 h-screen bg-white dark:bg-zinc-700 z-101 ">
        {/* Header */}
        <div className="flex justify-between items-center py-5 border-b-1 border-gray-300 dark:border-white/10">
          <span className="font-DanaMedium text-zinc-700 dark:text-white">
            Shopping Cart
          </span>
          <div onClick={closeMobileCartSidebar}>
            <svg className="w-5 h-5 text-zinc-600 dark:text-white">
              <use href="#icon-close" />
            </svg>
          </div>
        </div>

        {/* Empty Cart Message */}
        {cartItems.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">
            <img
              src="/images/info/empty-shopping-cart.webp"
              alt="Empty Cart"
              className="w-40 h-40"
            />
            <span className="text-gray-500 dark:text-white">
              Your shopping cart is empty
            </span>
          </div>
        )}

        {/* Cart Items */}
        <div className="overflow-y-auto">
          {cartItems.map((item) => (
            <CartItem
              titleClassNames="text-sm tracking-tighter"
              imageSize="w-22.5 h-22.5"
              key={item.id}
              course={item.productId || item}
              deleteItem={removeFromCart}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mb-8 mt-auto flex justify-between items-end pt-5 gap-x-4" onClick={closeMobileCartSidebar}>
          <Link
            to="/cart"
            className="text-white bg-teal-600 dark:bg-emerald-500 py-2.5 px-2 text-center w-28 rounded-xl font-Dana text-md transition-colors hover:bg-teal-700 dark:hover:bg-emerald-600"
          >
            View Cart
          </Link>

        

          <div className="flex flex-col">
            <span className="text-gray-500 text-xs font-DanaMedium tracking-tighter">
              Total Amount
            </span>
            <span className="font-DanaDemiBold text-base text-zinc-700 dark:text-white">
              {cartItems.reduce(
                (acc, item) =>
                  acc + Number(item.productId?.price || item.price || 0),
                0
              )}{" "}
              <span className="font-Dana text-sm dark:text-white">€</span>
            </span>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        className="overlay fixed inset-0 bg-black/40 z-100 w-full h-full"
        onClick={closeMobileCartSidebar}
      ></div>
    </div>
  );
}

export default MobileCartSidebar;
