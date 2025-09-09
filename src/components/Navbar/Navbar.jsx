import React, { useState, useEffect } from "react";
import CartDropdown from "../CartDropdown/CartDropdown";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import { useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import CartContext from "../../contexts/cartContext";

function Navbar({
  onToggleDarkMode,
  darkMode,
  openSidebarHandler,
  openMobileCartSidebarHandler,
}) {
  const [menus, setMenus] = useState([]);
  const { cartItems } = useContext(CartContext);
  const { isLoggedIn, logout, userInfo } = useContext(AuthContext);

  const navigate = useNavigate();


  useEffect(() => {}, [cartItems]);



  const fetchMenus = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/menus`);
      const data = await res.json();
      setMenus(
        data.map((m) => ({
          ...m,
          submenus: Array.isArray(m.submenus) ? m.submenus : [],
        }))
      );
    } catch (err) {
      console.error("Error fetching menus:", err);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleLogout = () => {
    swal({
      title: "Are you sure you want to log out?",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then((confirm) => {
      if (confirm) {
        logout();
        navigate("/");
      }
    });
  };
  return (
    <>
      {/* Desktop Header */}
      <header className="hidden lg:flex fixed top-0 left-0 right-0 w-full h-24 justify-between items-center px-5  py-5 bg-black/50 mx-auto backdrop-blur-md z-50">
        {/* right side */}
        <nav className="flex items-center gap-x-5 lg:gap-x-6 xl:gap-x-9">
          <div className="">
            <svg className="h-11 w-11 md:h-10 md:w-10 lg:h-14  lg:w-14 text-orange-300">
              <use href="#icon-logo-sabzlearn" />
            </svg>
          </div>

          <ul className="flex gap-x-3 md:gap-x-3 lg:gap-x-3 2xl:gap-x-9 text-sm md:text-lg lg:text-xl text-gray-300 tracking-tightest h-14 leading-14 items-center">
            <li className="text-orange-200 font-DanaMedium">
              <a href="/">Home</a>
            </li>

            {menus.map((menu, index) => (
              <li key={index} className="relative group">
                <a
                  href="#"
                  className="group-hover:text-orange-300 transition-colors flex-center "
                >
                  {menu.title}
                  {menu.submenus.length > 0 && (
                    <svg className="w-4 h-4 inline-block ml-1.5">
                      <use href="#icon-chevron-down" />
                    </svg>
                  )}
                </a>

                {menu.submenus.length > 0 && (
                  <div
                    className="flex flex-col absolute transition-all delay-75 w-52 h-auto border-t-3 top-full invisible opacity-0 group-hover:visible group-hover:opacity-100 border-orange-300
                      text-zinc-700 dark:text-white text-base leading-6 tracking-normal bg-white dark:bg-zinc-700 shadow-normal rounded-2xl child:inline-block p-6 space-y-4
                      child-hover:text-orange-300 child:transition-colors"
                  >
                    {menu.submenus.map((submenu, subIndex) => (
                      <a
                        href={submenu.href}
                        key={subIndex}
                        className="block hover:text-orange-300"
                      >
                        {submenu.title}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* left side */}
        <div className="flex text-orange-200 items-center gap-x-3 md:gap-x-5 xl:gap-x-6">
          <div className="flex gap-x-5 items-center h-14 leading-14">
            <div className="relative h-14 leading-14 flex items-center group">
              <div className="relative">
                <svg className="w-8 h-8 cursor-pointer">
                  <use href="#icon-shopping-cart" />
                </svg>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4.5 h-4.5 text-base text-white bg-orange-300 rounded-full flex items-baseline justify-center">
                    {cartItems.length}
                  </span>
                )}
              </div>
              {cartItems.length > 0 && (
                <CartDropdown
                  cartItems={cartItems}
             
                />
              )}
            </div>

            <button onClick={onToggleDarkMode} className="cursor-pointer">
              {darkMode ? (
                <svg className="w-8 h-8">
                  <use href="#icon-sun" />
                </svg>
              ) : (
                <svg className="w-8 h-8">
                  <use href="#icon-moon" />
                </svg>
              )}
            </button>
          </div>

          <span className="w-px bg-white/20 h-14"></span>

          {isLoggedIn ? (
            <div className="relative group">
              <Link
                to="/"
                className="flex gap-x-2 items-center hover:bg-orange-200/20 rounded-full py-3.5 px-2 xl:px-6"
              >
                <svg className="w-8 h-8">
                  <use href="#icon-user" />
                </svg>
                <span className="hidden xl:inline-block text-xl">
                  {userInfo.name}{" "}
                </span>
              </Link>
              <ul
                className="flex flex-col absolute transition-all delay-75 w-52 h-auto border-t-3 top-full right-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 border-orange-300
                      text-zinc-700 dark:text-white text-base child:text-base child:leading-6 child:tracking-normal bg-white dark:bg-zinc-700 shadow-normal rounded-2xl child:inline-block p-3 space-y-4
                      child-hover:text-orange-300 child:transition-colors"
              >
                <li>
                  <Link
                    to="/profile"
                    className="flex gap-x-2 items-center hover:bg-orange-200/20 rounded-full py-1 "
                  >
                    <svg className="w-6 h-6">
                      <use href="#icon-profile" />
                    </svg>
                    <span className="inline-block text-zinc-600">Profile</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex gap-x-2 items-center hover:bg-orange-200/20 rounded-full py-1 "
                  >
                    <svg className="w-6 h-6">
                      <use href="#icon-logout" />
                    </svg>
                    <span className="inline-block ">Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex gap-x-2 items-center hover:bg-orange-200/20 rounded-full py-3.5 px-2 xl:px-6"
            >
              <svg className="w-8 h-8">
                <use href="#icon-arrow-left" />
              </svg>
              <span className="hidden xl:inline-block text-xl">
                Login | Sign Up
              </span>
            </Link>
          )}
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden bg-white dark:bg-zinc-700 w-full h-16 flex items-center justify-between px-4 py-3 fixed top-0 right-0 left-0 z-50">
        <div className="cursor-pointer" onClick={openSidebarHandler}>
          <svg className="w-6 h-6 text-zinc-700 dark:text-white">
            <use href="#icon-bars" />
          </svg>
        </div>
        <div>
          <svg className="w-25 h-11 text-orange-300">
            <use href="#icon-logo-sabzlearn" />
          </svg>
        </div>
        <div onClick={openMobileCartSidebarHandler} className="relative cursor-pointer">
          <svg className="w-6 h-6 text-zinc-700 dark:text-white">
            <use href="#icon-shopping-cart" />
          </svg>
          <div>
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-2 w-4.5 h-4.5 text-xs text-white bg-orange-300 rounded-full flex items-baseline justify-center">
                {cartItems.length}
              </span>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
