import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCurrentUser } from "../../pages/auth/authSlice";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ChevronLeft,
  FileText,
  BarChart3,
  Mail,
  Settings,
  Users,
  ListOrdered,
  ChartColumnIncreasing,
  Wallet,
} from "lucide-react";

// Import your logo assets
import connectedLogoLight from "../../assets/icons/connected-logo-light.svg";
import connectedLogoDark from "../../assets/icons/connected-logo-dark.svg";
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
  const user = useSelector(selectCurrentUser);
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
    navigate("/login");
    setIsLoading(false);
  };

  const adminNavItems = [
    {
      text: "Dashboard",
      icon: LayoutDashboard,
      link: "/dashboard",
    },
    {
      text: "User List",
      icon: Users,
      link: "/users",
    },
    {
      text: "Customers",
      icon: ListOrdered,
      link: "/customers",
    },
    {
      text: "Analytics",
      icon: ChartColumnIncreasing,
      link: "/analytics",
    },
    {
      text: "Payments",
      icon: Wallet,
      link: "/payments",
    },
    {
      text: "Settings",
      icon: Settings,
      link: "/settings",
    },
  ];

  const organizationNavItems = [
    {
      text: "Dashboard",
      icon: LayoutDashboard,
      link: "/dashboard",
    },
    {
      text: "Messages",
      icon: Mail,
      link: "/messages",
    },
    {
      text: "Files",
      icon: FileText,
      link: "/files",
    },
    {
      text: "Analytics",
      icon: BarChart3,
      link: "/analytics",
    },
    {
      text: "Settings",
      icon: Settings,
      link: "/settings",
    },
  ];

  const navItems =
    user?.role === "admin" || user?.role === "super_admin"
      ? adminNavItems
      : organizationNavItems;

  const drawer = (
    <div className="px-4 h-full overflow-auto">
      <div className="my-12 flex justify-center items-center flex-col">
        <div className="flex items-center gap-2 w-full justify-between">
          <div className="w-full">
            <div className="w-full flex flex-col justify-center items-center">
              <img
                src={connectedLogoDark}
                alt="connected logo"
                className="w-3/4 h-auto hidden dark:block"
              />
              <img
                src={connectedLogoLight}
                alt="connected logo"
                className="w-3/4 h-auto block dark:hidden"
              />
            </div>
            {/* <p className="text-xs font-light uppercase mt-4 text-primary">
              {user?.role === "admin"
                ? "Admin dashboard"
                : "Organization dashboard"}
            </p> */}
          </div>
          <button onClick={handleDrawerToggle} className="block sm:hidden">
            <ChevronLeft className="text-[#95969D] cursor-pointer" />
          </button>
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
                      ? "text-white block w-full bg-[#025692]"
                      : "text-primary block w-full"
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
          <div className="bg-[#A2C8E8] dark:bg-[#F6F5F4] w-full p-3 flex items-center gap-3 rounded-xl">
            <div>
              <img src={sidenavImg} alt="" className="w-full" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-[#1A1A1A] font-semibold">
                {user?.company_name.split(" ")[0]}
              </p>
              {/* <p className="text-xs text-[#1A1A1A]">Admin</p> */}
            </div>
          </div>

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
            block sm:hidden
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
