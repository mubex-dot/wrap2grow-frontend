import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  drawerWidth: number;
  handleDrawerToggle: () => void;
};

function Header({ drawerWidth, handleDrawerToggle }: Props) {
  // Extract the value for CSS custom properties
  const cssVars = {
    "--drawer-width": `${drawerWidth}px`,
  } as React.CSSProperties;

  return (
    <div
      style={cssVars}
      className="fixed shadow-none bg-bg-primary py-2 px-4 w-full sm:w-[calc(100%-var(--drawer-width))] sm:ml-(--drawer-width)"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-between sm:justify-end w-full">
          <Button
            className="mr-2 sm:hidden flex justify-center items-center"
            variant="default"
            size="icon"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </Button>
        </div>
        <div className="grow"></div>
      </div>
    </div>
  );
}

export default Header;
