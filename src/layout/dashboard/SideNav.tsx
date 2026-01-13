import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../pages/auth/authSlice";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ChevronLeft,
  FileText,
  // BarChart3,
  Mail,
  Settings,
} from "lucide-react";

import sidenavImg from "../../assets/icons/sidenavIcon.svg";

type Props = {
  drawerWidth: number;
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
};

function SideNav({ drawerWidth, handleDrawerToggle, mobileOpen }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const sideNavRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close mobile drawer
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileOpen &&
        sideNavRef.current &&
        !sideNavRef.current.contains(event.target as Node)
      ) {
        handleDrawerToggle();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileOpen, handleDrawerToggle]);

  const handleLogout = () => {
    setIsLoading(true);
    dispatch(logout());
    navigate("/");
    setIsLoading(false);
  };

  const navItems = [
    {
      text: "Dashboard",
      icon: LayoutDashboard,
      link: "/dashboard",
    },
    {
      text: "Wrap Management",
      icon: Mail,
      link: "/wrap-management",
    },
    {
      text: "Environment",
      icon: FileText,
      link: "/environment",
    },
    // {
    //   text: "Analytics",
    //   icon: BarChart3,
    //   link: "/analytics",
    // },
    // {
    //   text: "Activities",
    //   icon: Settings,
    //   link: "/activities",
    // },
    {
      text: "Settings",
      icon: Settings,
      link: "/settings",
    },
  ];

  const drawer = (
    <div className="px-4 h-full overflow-auto">
      <div className="my-12 flex justify-center items-center flex-col">
        <div className="flex items-center gap-2 w-full justify-between">
          <div className="w-full"></div>
          <button onClick={handleDrawerToggle} className="block sm:hidden">
            <ChevronLeft className="text-[#95969D] cursor-pointer" />
          </button>
        </div>

        <div className="flex items-center gap-4 w-full">
          <img src={sidenavImg} alt="Wrap2Grow icon" />
          <div>
            <h3 className="font-bold text-foreground">Wrap2Grow</h3>
            <p className="text-text-primary">Green Degrade Tracker</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between h-[75%]">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            const isActive = location.pathname.includes(item.link);

            return (
              <li key={index} className="py-1">
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-foreground block w-full bg-primary rounded-md"
                      : "text-text-primary block w-full"
                  }

                  // onClick={() => navigate(`${item.link}`)}
                >
                  <div
                    className="flex items-center gap-2 p-3"
                    onClick={handleDrawerToggle}
                  >
                    <item.icon
                      className={isActive ? "text-white" : "text-[#6F6F67]"}
                      size={20}
                    />
                    <span
                      className={`text-sm md:text-base ${
                        isActive ? "font-bold" : "font-lexend"
                      }`}
                    >
                      {item.text}
                    </span>
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-col gap-2">
          <Button
            className="w-full"
            disabled={isLoading}
            onClick={handleLogout}
          >
            {isLoading ? "Loading..." : "LOGOUT"}
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Overlay for mobile when drawer is open */}
      <div
        className={`
          fixed inset-0 bg-black/50 z-30 sm:hidden
          transition-opacity duration-300 ease-in-out
          ${mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        aria-hidden="true"
      />

      <nav
        style={{ "--drawer-width": `${drawerWidth}px` } as React.CSSProperties}
        className="sm:w-(--drawer-width) sm:shrink-0"
      >
        {/* Mobile drawer */}
        <div
          ref={sideNavRef}
          className={`
            fixed inset-y-0 left-0 z-40 
            w-(--drawer-width) 
            transform ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
            transition-transform duration-300 ease-in-out
            bg-bg-primary border-none
            block sm:hidden bg-background
          `}
        >
          <div className="h-full overflow-y-auto">{drawer}</div>
        </div>

        {/* Desktop permanent drawer */}
        <div className="hidden sm:block fixed inset-y-0 left-0 z-40 w-(--drawer-width) bg-bg-primary border-none overflow-y-auto">
          {drawer}
        </div>
      </nav>
    </>
  );
}

export default SideNav;
