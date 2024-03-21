import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";

import { isAdmin } from "@/lib/isAdmin";
import { db } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const { userId } = auth();

        const user = await currentUser();

        const values = await request.json();

        if (!userId || !isAdmin(user?.id, user?.emailAddresses?.[0].emailAddress)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!values) {
            return new NextResponse("Value is required", { status: 400 });
        }

        const hero = await db.hero.create({
            data: {
                ...values
            }
        });

        return NextResponse.json(hero);

    } catch (error) {
        console.log("[HERO-POST-ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}