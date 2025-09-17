import React, { useContext } from "react";
import AuthContext from "../../../../contexts/authContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

import swal from "sweetalert";

const links = [
  { to: "/p-user", label: "Home", icon: "#icon-home" },
  { to: "courses", label: "My Courses", icon: "#icon-book" },
  { to: "tickets", label: "Tickets", icon: "#icon-envelop" },
  { to: "questions", label: "Q&A", icon: "#icon-comment" },
  { to: "edit-account", label: "My Account", icon: "#icon-user" },
];

function Sidebar({ closeSidebar, openSidebar }) {
  const { userInfo, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();


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
    <div className={`${openSidebar ? "block" : "hidden"} md:block`}>
      <aside className="fixed top-0 left-0 bottom-0 z-101 md:block w-65 md:w-66 lg:w-70 h-screen shrink-0 md:border-r md:border-gray-200 px-4 py-5   overflow-y-auto md:z-50 bg-white dark:bg-gray-700 lg:shadow-2xl md:sticky md:top-0 lg:rounded-xl">
        <div className="flex flex-col gap-y-5  text-gray-700 dark:text-gray-200 h-full">
          {/* top section*/}
          <div className=" flex items-center border-b border-gray-200 dark:border-gray-600 pb-1">
            <div className="flex flex-1">
              <div className=" btn-circle avatar">
                <div className="w-11 h-auto rounded-full">
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
                    <span className="font-medium">
                      {userInfo.name || "User"}
                    </span>
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
          {/* Menu section */}
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-3 select-none">
              Quick Access
            </h2>
            <ul className="space-y-3">
              {links.map(({ to, label, icon }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={`flex items-center gap-x-2.5 p-1.5 rounded-md transition-colors
                ${
                  pathname.split("/").pop() === to
                    ? "text-green-600 bg-gray-100"
                    : "text-gray-800 dark:text-gray-200 hover:text-green-600"
                }`}
                    onClick={closeSidebar}
                  >
                    <svg className="w-6 h-6">
                      <use href={icon} />
                    </svg>
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* bottom section */}
          <div className="border-t border-gray-300 pt-3 md:border-t-0  dark:border-gray-600 mt-auto md:mt-1 flex justify-between items-center md:justify-normal gap-x-2.5 p-1.5 text-gray-800 dark:text-gray-200">
            <span className="text-base md:text-lg  md:order-2">Log out</span>
            <svg
              className="md:order-1 w-6 h-6  cursor-pointer transform rotate-180 text-gray-600 dark:text-gray-300 hover:text-red-400 md:transform md:rotate-0"
              onClick={handleLogout}
            >
              <use href="#icon-logout" />
            </svg>
          </div>
        </div>
        {/* Overlay */}
      </aside>
      <div
        className="fixed inset-0 bg-black/30 z-100 md:hidden"
        onClick={closeSidebar}
      ></div>
    </div>
  );
}

export default Sidebar;
