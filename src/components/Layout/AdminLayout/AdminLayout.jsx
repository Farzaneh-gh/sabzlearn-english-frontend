import React, { useState } from "react";
import Topbar from "../../../components/admin/Topbar/Topbar";
import Sidebar from "../../../components/admin/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
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

            <div className="flex-1 overflow-hidden overflow-y-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
