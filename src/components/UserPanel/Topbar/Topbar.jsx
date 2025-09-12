import React from "react";

function Topbar({ onToggleDarkMode, darkMode, openSidebarHandler }) {
  return (
    <div className=" min-h-14 md:min-h-18 py-2 px-6 flex items-center justify-between z-50  bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm lg:rounded-xl sticky top-0 ">
     {/* left section */}
      <div className=" gap-3 relative hidden invisible md:flex md:visible ">
        <input
          type="text"
          placeholder="Search "
          className="input input-bordered  md:w-60 lg:w-70 hidden md:block"
        />
        <svg className="block w-6 h-6 cursor-pointer text-gray-800 absolute right-0 top-2 mr-3 z-10 ">
          <use href="#icon-magnifying-glass" />
        </svg>
      </div>

      {/* right section */}
      <div className="flex  gap-2 md:gap-3 order-2 md:order-1">
        <div className="relative group">
          <svg className="w-5 h-5 xs:w-7 xs:h-7  md:w-8 md:h-8 cursor-pointer text-gray-800 dark:text-gray-200">
            <use href="#icon-notification" />
          </svg>
          <ul className=" text-gray-800 dark:text-gray-200 transition-all delay-75 invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute right-0 menu menu-sm dropdown-content bg-white dark:bg-gray-600 border-green-300 md:top-8 border-t-2 rounded-box z-1 mt-3 w-52 p-2 shadow ">
            <li>
              <span className="justify-between ">
                Profile
                <span className="badge">New</span>
              </span>
            </li>
            <li>
              <span> Settings</span>
            </li>
            <li>
              <span>Logout</span>
            </li>
          </ul>
        </div>
        <svg className="w-5 h-5 xs:w-7 xs:h-7  md:w-8 md:h-8 cursor-pointer text-gray-800 dark:text-gray-200">
          <use href="#icon-shopping-cart" />
        </svg>
        <button onClick={onToggleDarkMode} className="cursor-pointer">
          {darkMode ? (
            <svg className="w-5 h-5 xs:w-7 xs:h-7  md:w-8 md:h-8 cursor-pointer text-gray-800 dark:text-gray-200">
              <use href="#icon-sun" />
            </svg>
          ) : (
            <svg className="w-5 h-5 xs:w-7 xs:h-7  md:w-8 md:h-8 cursor-pointer text-gray-800 dark:text-gray-200">
              <use href="#icon-moon" />
            </svg>
          )}
        </button>
      </div>
      {/* mobile Bars icon */}
      <div role="button" className="md:hidden md:invisible order-1 md:order-2 " onClick={openSidebarHandler}>
        <svg className=" w-5 h-5 xs:w-7 xs:h-7  md:w-8 md:h-8 cursor-pointer text-gray-800 dark:text-gray-200">
          <use href="#icon-bars" />
        </svg>
      </div>
    </div>
  );
}

export default Topbar;
