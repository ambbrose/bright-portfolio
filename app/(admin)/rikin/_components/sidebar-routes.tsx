import { Contact, FolderKanban, Layout, LayoutDashboard } from "lucide-react";

import { SidebarItem } from "./sidebar-item";

const routes = [
    {
        icon: Layout,
        label: 'Client Side',
        href: '/'
    },
    {
        icon: FolderKanban,
        label: 'Projects',
        href: '/rikin/projects'
    },
    {
        icon: LayoutDashboard,
        label: 'Heros',
        href: '/rikin/heros'
    },
    {
        icon: Contact,
        label: 'Contacts',
        href: '/rikin/contacts'
    }
];


export const SidebarRoutes = () => {

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                    key={route.label}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    );
}