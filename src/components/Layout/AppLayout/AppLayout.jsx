import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar Floating Layer */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Layout */}
      <div className="flex min-h-screen flex-col">
        {/* Header Full Width */}
        <Header setSidebarOpen={setSidebarOpen} toggleSidebar={toggleSidebar}/>

        {/* Main Content */}
        <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1800px]">
            <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-4 shadow-[0_10px_40px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 sm:p-6 lg:p-8">
              {/* Glow */}
              <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-emerald-500/5 blur-3xl" />

              <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500/5 blur-3xl" />

              {/* Page Content */}
              <div className="relative z-10">
                <Outlet />
              </div>
            </div>
          </div>
        </main>

        {/* Footer Full Width */}
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
