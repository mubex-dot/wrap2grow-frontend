import { Outlet } from "react-router";
import Footer from "./Footer";

type Props = {
  drawerWidth: number;
};

function Main({ drawerWidth }: Props) {
  return (
    <main
      style={{ "--drawer-width": `${drawerWidth}px` } as React.CSSProperties}
      className="sm:w-[calc(100%-var(--drawer-width))] grow min-h-screen flex flex-col w-11/12 "
    >
      <div className="py-16.5 px-5 bg-[#F6F5F4] dark:bg-[#A2C8E8] flex-1">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}

export default Main;
