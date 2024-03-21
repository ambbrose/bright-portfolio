"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ClientSidebar } from "./client-sidebar";
import { ProjectsSearch } from "./project-search";

export const Navbar = ({ isSiteOwner }: { isSiteOwner: boolean }) => {

    const pathname = usePathname();

    const navOptions = [
        {
            name: "Home",
            href: "/",
            active: pathname === '/'
        },
        {
            name: "Projects",
            href: "/projects",
            active: pathname.includes('/projects'),
        },
        {
            name: "Contacts",
            href: "/contacts",
            active: pathname.includes('/contacts')
        }
    ];

    return (
        <div className="shadow-sm md:p-4 md:px-6 border-b dark:border-b-neutral-950 h-full flex items-center bg-white dark:bg-[#01032b]">
            <div className="p-6">
                <Link href={'/'}>
                    <Logo />
                </Link>
            </div>

            <div className="hidden md:block">
                {isSiteOwner && (
                    <Link href={'/rikin/projects'}>
                        <Button variant={'ghost'}>
                            Admin Side
                        </Button>
                    </Link>
                )}
            </div>

            <div className="flex items-center md:hidden ml-auto">
                <ClientSidebar isSiteOwner={!!isSiteOwner} />
            </div>

            <nav className="hidden md:flex ml-auto space-x-2 items-center">
                <ProjectsSearch />

                <ThemeToggle />

                {navOptions.map((nav) => (
                    <Link
                        key={nav.href}
                        href={nav.href}
                    >
                        <Button 
                            variant={'ghost'}
                            className={cn(
                                nav.active && "text-slate-700 bg-neutral-200 dark:bg-neutral-200 hover:bg-sky-200 hover:text-sky-700 dark:hover:text-slate-500"
                            )}
                        >
                            {nav.name}
                        </Button>
                    </Link>
                ))}
            </nav>
        </div>
    );
}