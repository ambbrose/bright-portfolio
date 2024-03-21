"use client";

import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-items";
import { Contact, FolderKanban, Home, Shield } from "lucide-react";

export const SidebarRoutes = ({ isSiteOwner }: { isSiteOwner: boolean }) => {

    const pathname = usePathname();

    const navOptions = [
        {
            label: "Home",
            href: "/",
            icon: Home,
            active: pathname === '/'
        },
        {
            label: "Projects",
            href: "/projects",
            icon: FolderKanban,
            active: pathname.includes('/projects'),
        },
        {
            label: "Contacts",
            href: "/contacts",
            icon: Contact,
            active: pathname.includes('/contacts')
        }
    ];

    return (
        <div className="h-full border-r dark:border-r-neutral-950 flex flex-col overflow-y-auto dark:bg-[#01032b] shadow-md">
            <div className="flex flex-col w-full">
                {isSiteOwner && (
                    <SidebarItem 
                        icon={Shield}
                        label="Admin Side"
                        href="/rikin/projects"
                    />
                )}
                {navOptions.map((nav) => (
                    <SidebarItem
                        key={nav.label}
                        icon={nav.icon}
                        label={nav.label}
                        href={nav.href}
                    />
                ))}
            </div>
        </div>
    );
}