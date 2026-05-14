import { CommandPalette } from "@/components/CommandPalette";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { usePalette } from "@/context/PaletteContext";
import { Outlet } from "react-router-dom";

export function Layout() {
  const { open, setOpen } = usePalette();

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="lg:pl-[260px]">
        <TopBar />
        <Outlet />
      </div>
      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
