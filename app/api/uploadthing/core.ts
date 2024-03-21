import { auth, currentUser } from "@clerk/nextjs";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

import { isAdmin } from "@/lib/isAdmin";

const f = createUploadthing();

const handleAuth = async () => {
    const { userId } = auth();

    const user = await currentUser();

    const isAuthorized = isAdmin(userId, user?.emailAddresses?.[0].emailAddress);

    if (!userId || !isAuthorized) throw new UploadThingError("Unauthorized");

    return { userId }
}

export const ourFileRouter = {

    projectImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),

    heroImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),

    contactIcon: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { })

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;