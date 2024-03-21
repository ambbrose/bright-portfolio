"use client";

import Link from "next/link";

import { Logo } from "@/components/logo";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
    return (
        <div className="h-full border-r dark:border-r-neutral-950 flex flex-col overflow-y-auto bg-white dark:bg-black shadow-md">
            <div className="p-6">
                <Link href={'/rikin'}>
                    <Logo />
                </Link>
            </div>

            <div className="flex flex-col w-full">
                <SidebarRoutes />
            </div>
        </div>
    )
}