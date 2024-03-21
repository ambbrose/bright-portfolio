import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarRoutes } from "./sidebar-routes";
import { ThemeToggle } from "@/components/theme-toggle";

export const ClientSidebar = ({ isSiteOwner }: { isSiteOwner?: boolean }) => {

    return (
        <Sheet>
            <ThemeToggle />
            
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition dark:text-white">
                <Menu />
            </SheetTrigger>

            <SheetContent side='left' className="p-0 bg-white">
                <SidebarRoutes isSiteOwner={!!isSiteOwner} />
            </SheetContent>
        </Sheet>
    );
}