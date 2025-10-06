import React from "react";
import { useSelector } from "react-redux";
  

function Topbar({ onToggleDarkMode, darkMode, openSidebarHandler }) {
    const { userInfo, loading } = useSelector((state) => state.auth);
  return (
    <div className=" min-h-14 md:min-h-18 py-2 px-2 md:px-6 flex items-center justify-between z-50  bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm lg:rounded-xl  left-100 top-0 ">
      {/* left section */}
      <div className=" flex items-center ">
        <div className="flex ">
          <div className=" btn-circle avatar">
            <div className="w-8 h-8  md:w-11 md:h-auto rounded-full">
              <img alt="Tailwind CSS Navbar component" src="/avatar.png" />
            </div>
          </div>
          <div className="flex flex-col justify-center ml-3">
            {loading ? (
              <>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 mb-1 animate-pulse"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
              </>
            ) : userInfo ? (
              <>
                <span className="text-sm md:text-basefont-medium">{userInfo.name || "User"}</span>
                <span className="text-sm lowercase font-medium text-gray-400">
                  {userInfo.role || "Member"}
                </span>
              </>
            ) : (
              <>
                <span className="font-medium">Guest</span>
                <span className="text-sm lowercase font-medium text-gray-400">
                  visitor
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* right section */}
      <div className="flex  gap-2 md:gap-3 order-2 md:order-1">
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
        {/* mobile Bars icon */}
        <div
          role="button"
          className="md:hidden md:invisible "
          onClick={openSidebarHandler}
        >
          <svg className=" w-5 h-5 xs:w-7 xs:h-7  md:w-8 md:h-8 cursor-pointer text-gray-800 dark:text-gray-200">
            <use href="#icon-bars" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Topbar;