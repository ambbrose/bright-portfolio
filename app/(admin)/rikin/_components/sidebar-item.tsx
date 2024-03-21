"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
    icon: LucideIcon;
    href: string;
    label: string;
};

export const SidebarItem = ({ icon: Icon, href, label }: SidebarItemProps) => {

    const router = useRouter();
    const pathname = usePathname();

    const isActive = (pathname === '/' && href === '/') || pathname === href || pathname?.startsWith(`${href}/`);

    const onClick = () => {
        router.push(href);
    }

    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-x-2 text-slate-900 dark:text-slate-300 text-sm font-[500] pl-6 transition-all hover:text-slate-400 hover:bg-neutral-500/20",
                isActive && "text-slate-700 bg-neutral-200 dark:bg-neutral-200/10 hover:bg-sky-200/10 hover:text-sky-700 dark:hover:text-sky-300",
                href === "/" && "bg-neutral-300 dark:bg-neutral-300/30 text-sky-800 dark:text-sky-300 animate-pulse mb-2 text-xl"
            )}
        >
            <div className="flex items-center gap-x-4 py-4">
                <Icon 
                    size={22}
                    className={cn(
                        "text-slate-500",
                        isActive && "text-sky-700"
                    )}
                />
                {label}
            </div>

            <div className={cn(
                "ml-auto opacity-0 border-2 border-sky-950 h-full transition-all",
                isActive && "opacity-100"
            )} />
        </button>
    );
}