import React,{ useContext} from "react";
import AuthContext from "../../../contexts/authContext";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/p-user", label: "Home", icon: "#icon-home" },
  { to: "courses", label: "My Courses", icon: "#icon-book" },
  { to: "tickets", label: "Tickets", icon: "#icon-envelop" },
  { to: "questions", label: "Q&A", icon: "#icon-comment" },
  { to: "/sessions", label: "My Account", icon: "#icon-user" },
];

function Sidebar({closeSidebar,openSidebar}) {
    const { userInfo } = useContext(AuthContext);
      const { pathname } = useLocation();

    
  return (
    <div className={`${openSidebar ? "block" : "hidden"} md:block` }>
      <aside className="fixed top-0 left-0 bottom-0 z-101 md:block w-65 md:w-66 lg:w-70 h-screen shrink-0 md:border-r md:border-gray-200 px-4 py-5   overflow-y-auto md:z-50 bg-white dark:bg-gray-700 lg:shadow-2xl md:sticky md:top-0 lg:rounded-xl">
        <div className="flex flex-col gap-y-5  text-gray-700 dark:text-gray-200">
          {/* top section*/}
          <div className=" flex items-center border-b border-gray-200 dark:border-gray-600 pb-1">
            <div className="flex flex-1">
              <div className=" btn-circle avatar">
                <div className="w-11 h-auto rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="/avatar.png"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center ml-3">
                <span className="font-medium">{userInfo.name}</span>
                <span className="text-sm lowercase font-medium text-gray-400">
                  {userInfo.role}
                </span>
              </div>
            </div>
            <svg className="w-8 h-8 cursor-pointer transform rotate-180 text-gray-400 dark:text-gray-300 hover:text-red-400">
              <use href="#icon-logout" />
            </svg>
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
                  pathname === to
                    ? "text-green-600 bg-gray-100"
                    : "text-gray-800 dark:text-gray-200 hover:text-green-600"
                }`}
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
        </div>
        {/* Overlay */}
      </aside>
      <div className="fixed inset-0 bg-black/30 z-100 md:hidden" onClick={closeSidebar}></div>
    </div>
  );
}

export default Sidebar;
