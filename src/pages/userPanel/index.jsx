import React, { useState } from "react";
import Topbar from "../../components/user/UserPanel/Topbar/Topbar";
import Sidebar from "../../components/user/UserPanel/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const handelCloseSidebar = () => setOpenSidebar(false);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  return (
    <div className={`${darkMode ? "dark" : ""} main`}>
      <div className=" lg:bg-gray-200 dark:bg-zinc-800 min-h-screen ">
        <div className="lg:container relative flex lg:items-start lg:gap-8 lg:p-9 lg:pb-0 mx-auto ">
          <Sidebar
            closeSidebar={handelCloseSidebar}
            openSidebar={openSidebar}
          />
          <div className=" flex-1 flex flex-col ">
            <Topbar
              onToggleDarkMode={toggleDarkMode}
              darkMode={darkMode}
              openSidebarHandler={() => setOpenSidebar(true)}
            />

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
