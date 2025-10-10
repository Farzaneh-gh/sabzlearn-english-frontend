import React from "react";

function Topbar({ onToggleDarkMode, darkMode, openSidebarHandler }) {
  return (
    <div className=" min-h-14 md:min-h-18 py-2 px-6 flex items-center justify-between z-50  bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm lg:rounded-xl sticky top-0 ">
     {/* left section */}
      <div className=" gap-3 relative hidden invisible md:flex md:visible border dark:bg-gray-300 border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1">
        <input
          type="text"
          placeholder="Search "
          className=" outline-0 focus:outline-0 border-0 shadow-none md:w-60 lg:w-70 hidden md:block placeholder:text-gray-600"
        />
        <svg className="block w-6 h-6 cursor-pointer text-gray-800 absolute right-0 top-2 mr-3 z-10 ">
          <use href="#icon-magnifying-glass" />
        </svg>
      </div>

      {/* right section */}
      <div className="flex  gap-4 md:gap-3 order-2 md:order-1">
        <div className="relative group">
          <svg className="w-5 h-5 xs:w-7 xs:h-7  md:w-8 md:h-8 cursor-pointer text-gray-800 dark:text-gray-200">
            <use href="#icon-notification" />
          </svg>
    
        </div>
        
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
