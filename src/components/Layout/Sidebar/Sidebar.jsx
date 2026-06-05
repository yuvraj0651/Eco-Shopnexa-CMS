import React, { useEffect, useState } from "react";
import {
  IoGridOutline,
  IoCubeOutline,
  IoCartOutline,
  IoPeopleOutline,
  IoBarChartOutline,
  IoSettingsOutline,
  IoNotificationsOutline,
  IoChevronForwardOutline,
  IoCloseOutline,
  IoLogOutOutline
} from "react-icons/io5";
import { CiRoute } from "react-icons/ci";
import { RiPagesLine } from "react-icons/ri";
import { BiSolidBookContent } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../API/Auth/AuthThunk";
import { toast } from "sonner";

const sidebarLinks = [
  {
    id: 1,
    title: "Dashboard",
    icon: <IoGridOutline />,
    path: "/home",
    active: true,
    end: true,
  },
  {
    id: 2,
    title: "Products",
    icon: <IoCubeOutline />,
    path: "/home/products",
  },
  {
    id: 3,
    title: "Orders",
    icon: <IoCartOutline />,
    path: "/home/orders",
  },
  {
    id: 4,
    title: "Customers",
    icon: <IoPeopleOutline />,
    path: "/home/customers",
  },
  // {
  //   id: 5,
  //   title: "Analytics",
  //   icon: <IoBarChartOutline />,
  //   path: "/analytics",
  // },
  {
    id: 6,
    title: "Routes",
    icon: <CiRoute />,
    path: "/home/routes",
  },
  {
    id: 7,
    title: "Pages",
    icon: <RiPagesLine />,
    path: "/home/pages",
  },
  {
    id: 8,
    title: "Content",
    icon: <BiSolidBookContent />,
    path: "/home/content",
  },
  {
    id: 9,
    title: "Settings",
    icon: <IoSettingsOutline />,
    path: "/home/settings",
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  const closeSidebar = () => setSidebarOpen(false);

  const logoutHandler = () => {
    dispatch(logout());

    toast.success("User Logged Out Successfully");
    navigate("/");
  };

  return (
    <>
      <div
        onClick={closeSidebar}
        className={`fixed left-0 right-0 bottom-0 top-[75px] z-40 bg-black/50 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          sidebarOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />
      <aside
        className={`fixed left-0 top-[75px] z-50 flex h-[calc(100vh-75px)] w-[300px] flex-col border-r border-slate-200 bg-white transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 shadow-lg shadow-emerald-500/20">
              <span className="text-xl font-black text-white">E</span>
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 dark:text-white">
                Eco Shopnexa
              </h1>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ecommerce CMS
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Sidebar Close Button"
            onClick={closeSidebar}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          >
            <IoCloseOutline className="text-xl" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="border-b border-slate-200 p-5 dark:border-slate-800">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-lg font-bold text-white">
                Y
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Admin User
                </h3>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Super Administrator
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-2xl bg-white p-3 dark:bg-slate-950">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Revenue
                </p>

                <h4 className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                  ₹2.4L
                </h4>
              </div>

              <div className="rounded-xl bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                +18%
              </div>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto px-4 py-5">
          <div className="mb-4 px-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Main Menu
            </p>
          </div>

          <nav className="space-y-2">
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.path}
                end
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `group flex h-14 items-center justify-between rounded-2xl px-4 transition-all duration-300 ${
                    isActive
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                      : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-emerald-400"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-4">
                      <span className="text-xl">{link.icon}</span>
                      <span className="text-sm font-semibold">
                        {link.title}
                      </span>
                    </div>

                    <IoChevronForwardOutline
                      className={`text-sm transition-transform duration-300 group-hover:translate-x-1 ${
                        isActive ? "text-white" : "text-slate-400"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <button
            type="button"
            aria-label="Sidebar Logout Button"
            onClick={logoutHandler}
            className="group flex h-14 w-full items-center justify-between rounded-2xl border border-red-500/20 bg-red-500/5 px-4 text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white"
          >
            <div className="flex items-center gap-4">
              <IoLogOutOutline className="text-xl" />

              <span className="text-sm font-semibold">Logout</span>
            </div>

            <IoChevronForwardOutline className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
