import { currentUser } from "@clerk/nextjs";
import { Navbar } from "./_components/navbar";

import { isAdmin } from "@/lib/isAdmin";
import { Footer } from "./_components/footer";
import { QueryProvider } from "./_components/query-provider";

const ClientDashBoard = async ({ children }: { children: React.ReactNode }) => {

    const user = await currentUser();

    const isSiteOwner = isAdmin(user?.id, user?.emailAddresses[0].emailAddress);

    return (
        <div className="">
            <QueryProvider>
                <div className="h-[80px] fixed inset-y-0 w-full z-50">
                    <Navbar
                        isSiteOwner={!!isSiteOwner}
                    />
                </div>

                {children}

                <Footer />
            </QueryProvider>
        </div>
    );
}

export default ClientDashBoard;