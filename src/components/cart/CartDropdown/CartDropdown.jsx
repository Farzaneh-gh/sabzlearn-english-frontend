import React from "react";
import CartItem from "../CartItem/CartItem";
import CartContext from "../../../contexts/cartContext";
import { Link } from "react-router-dom";
function CartDropdown() {
  const { cartItems, removeFromCart } = React.useContext(CartContext);


  return (
    <div
      className="absolute transition-all delay-75 w-100 border-t-3 top-full right-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 border-orange-300
     text-zinc-700 dark:text-white text-base leading-6 tracking-normal bg-white dark:bg-zinc-700 shadow-normal rounded-2xl p-5 font-sans"
    >
      <div className="flex items-center justify-between text-xs tracking-tighter leading-6">
        <span className="text-gray-600 font-bold text-lg">
          {cartItems.length} courses
        </span>
        <a
          href="#"
          className="text-orange-300 font-bold flex items-center text-lg gap-1"
        >
          My Cart
          <svg className="inline-block w-4 h-4 cursor-pointer font-bold leading-0 transform rotate-180">
            <use href="#icon-chevron" />
          </svg>
        </a>
      </div>

      <div className="max-h-94 overflow-y-auto overflow-x-hidden scroll-ms-6 scroll-m-1 scroll-smooth">
        <div>
          {cartItems.map((item) => (
            <CartItem
              key={item.id || item._id}
              course={item.productId || item}
              deleteItem={() => removeFromCart(item)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center pt-5">
        <div className="flex flex-col">
          <span className="text-gray-500 text-xs tracking-tighter mb-2">
            Total Price:
          </span>
          <span className="font-DanaDemiBold text-xl text-zinc-700 dark:text-white">
            {cartItems.reduce(
              (acc, item) =>
                acc + Number(item.productId?.price || item.price || 0),
              0
            )}{" "}
            <span className="text-sm dark:text-white">€</span>
          </span>
        </div>
        <Link
          to="/cart"
          className="text-white bg-teal-600 dark:bg-emerald-500 py-3.5 px-7 rounded-xl text-xl tracking-tightest transition-colors hover:bg-teal-700 dark:hover:bg-emerald-600"
        >
          View Cart
        </Link>
      </div>
    </div>
  );
}

export default CartDropdown;
