import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";

import { isAdmin } from "@/lib/isAdmin";
import { db } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const { userId } = auth();

        const user = await currentUser();

        const { name } = await request.json();

        if (!userId || !isAdmin(user?.id, user?.emailAddresses?.[0].emailAddress)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        const contact = await db.contact.create({
            data: {
                name
            }
        });

        return NextResponse.json(contact);

    } catch (error) {
        console.log("[CONTACT-POST-ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}