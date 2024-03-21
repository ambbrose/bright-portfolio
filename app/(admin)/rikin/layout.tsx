import { currentUser } from '@clerk/nextjs';
import { redirect } from "next/navigation";

import { isAdmin } from '@/lib/isAdmin';

import { Sidebar } from './_components/sidebar';
import { Navbar } from './_components/navbar';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({ children }) => {

    const user = await currentUser();

    if (!user?.id || !isAdmin(user?.id, user.emailAddresses?.[0].emailAddress)) {
        return redirect('/');
    }

    return (
        <div className="h-full">
            <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
                <Navbar />
            </div>

            <div className="hidden md:flex h-full w-56 flex-col inset-y-0 fixed z-50">
                <Sidebar />
            </div>

            <main className="md:pl-56 pt-[80px] h-full dark:bg-black">
                {children}
            </main>
        </div>
    );
}

export default DashboardLayout;