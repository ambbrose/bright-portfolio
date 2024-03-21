import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";

import { isAdmin } from "@/lib/isAdmin";
import { db } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const { userId } = auth();

        const user = await currentUser();

        const { title } = await request.json();

        if (!userId || !isAdmin(user?.id, user?.emailAddresses?.[0].emailAddress)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!title) {
            return new NextResponse("Title is required", { status: 400 });
        }

        const project = await db.project.create({
            data: {
                title
            }
        });

        return NextResponse.json(project);

    } catch (error) {
        console.log("[PROJECT-POST-ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}