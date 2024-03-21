// import { NavbarRoutes } from "@/components/navbar-routes";
import { UserButton } from "@clerk/nextjs";

import { MobileSidebar } from "./mobile-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

export const Navbar = () => {
    return (
        <div className="shadow-sm p-4 border-b dark:border-b-neutral-950 h-full flex items-center bg-white dark:bg-black">
            <MobileSidebar />

            <div className="flex gap-x-4 ml-auto items-center">
                <ThemeToggle />

                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    );
};