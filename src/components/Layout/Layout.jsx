// Layout.jsx
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import MobileCartSidebar from "../MobileCartSidebar/MobileCartSidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [darkMode, setDarkMode] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openMobileCartSidebar, setOpenMobileCartSidebar] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const openSidebarHandler = () => setOpenSidebar(true);
  const handelCloseSidebar = () => setOpenSidebar(false);
  const openMobileCartSidebarHandler = () => setOpenMobileCartSidebar(true);
  const closeMobileCartSidebar = () => setOpenMobileCartSidebar(false);

  return (
    <div className={`${darkMode ? "dark" : ""} main`}>
      <div className="bg-gray-100 dark:bg-zinc-800 min-h-screen">
        <Navbar
          onToggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
          openSidebarHandler={openSidebarHandler}
          openMobileCartSidebarHandler={openMobileCartSidebarHandler}
        />

        {openSidebar && (
          <Sidebar
            onToggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
            closeSidebar={handelCloseSidebar}
            openMobileCartSidebarHandler={openMobileCartSidebarHandler}
          />
        )}

        {openMobileCartSidebar && (
          <MobileCartSidebar closeMobileCartSidebar={closeMobileCartSidebar} />
        )}

        <main>
          {" "}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
