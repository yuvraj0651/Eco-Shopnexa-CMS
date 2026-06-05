import { useContext } from "react";
import { HiBars3BottomLeft, HiOutlineBell } from "react-icons/hi2";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import {
  IoPersonOutline,
  IoLogOutOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button,
} from "@/components/UI";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../API/Auth/AuthThunk";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import ThemeContext from "../../context/Theme/ThemeContext";

const Header = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    toast.success("User Logged Out Successfully");
    navigate("/");
  };

  return (
    <header className="sticky top-0 inset-x-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <div className="flex h-[75px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 lg:gap-5">
          <button
            onClick={toggleSidebar}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white dark:border-slate-500 dark:bg-slate-900/80"
          >
            <HiBars3BottomLeft className="text-2xl dark:text-white" />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-white font-black">
              E
            </div>

            <div className="hidden sm:block">
              <h2 className="font-bold dark:text-slate-50">Eco Shopnexa</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">CMS</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 dark:border-slate-500">
            <HiOutlineBell className="text-xl dark:text-white" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-500" />
          </button>

          <button
            onClick={toggleTheme}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 dark:border-slate-500"
          >
            {theme === "dark" ? (
              <MdOutlineLightMode className="dark:text-white" />
            ) : (
              <MdDarkMode className="dark:text-white" />
            )}
          </button>

          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center h-auto leading-none gap-3 rounded-2xl border border-slate-200 bg-white px-2 py-2 dark:border-slate-500 dark:bg-slate-700 dark:text-white"
                >
                  <img
                    src="https://i.pravatar.cc/150?img=12"
                    alt="admin"
                    className="h-10 w-10 rounded-2xl"
                  />

                  <div className="hidden text-left xl:block">
                    <h3 className="text-sm font-semibold">
                      {currentUser?.fullName}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-white capitalize">
                      {currentUser?.role}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem className="flex w-full cursor-pointer items-center gap-3 rounded-xs px-4 py-3 text-sm outline-none transition-all duration-200 hover:bg-slate-500 hover:text-white focus:bg-slate-500 focus:text-white dark:text-white dark:hover:bg-slate-800 dark:focus:bg-slate-800 focus:outline-none focus:ring-0">
                    <IoPersonOutline />
                    My Account
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex w-full cursor-pointer items-center gap-3 rounded-xs px-4 py-3 text-sm outline-none transition-all duration-200 hover:bg-slate-500 hover:text-white focus:bg-slate-500 focus:text-white dark:text-white dark:hover:bg-slate-800 dark:focus:bg-slate-800 focus:outline-none focus:ring-0">
                    <IoSettingsOutline />
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logoutHandler}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-xs px-4 py-3 text-sm outline-none transition-all duration-200 hover:bg-slate-500 hover:text-white text-red-700 focus:bg-slate-500 focus:text-white dark:text-white dark:hover:bg-slate-800 dark:focus:bg-slate-800 focus:outline-none focus:ring-0"
                >
                  <IoLogOutOutline />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
