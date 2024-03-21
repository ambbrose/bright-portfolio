import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isAdmin } from "@/lib/isAdmin";

export async function DELETE(
    request: Request,
    { params }: { params: { heroId: string } }
) {
    try {
        const { userId } = auth();
        const user = await currentUser();

        if (!userId || !isAdmin(userId, user?.emailAddresses?.[0]?.emailAddress)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const deletedHero = await db.hero.delete({
            where: {
                id: params.heroId
            }
        });

        return NextResponse.json(deletedHero);

    } catch (error) {
        console.log('[HERO-DELETE-ERROR]:- ', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: { heroId: string } }
) {
    try {
        const { userId } = auth();

        const user = await currentUser();

        const { name, jobTitle, description, isPublished, imageUrl } = await request.json();

        if (!userId || !isAdmin(userId, user?.emailAddresses?.[0]?.emailAddress)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params.heroId) {
            return new NextResponse("Hero ID is required", { status: 400 });
        }

        // if (!name || !jobTitle || !description || !imageUrl) {
        //     return new NextResponse("Values are required", { status: 400 });
        // }

        if (isPublished) {
            const publishedHero = await db.hero.findFirst({
                where: {
                    isPublished: true,
                },
            });

            if (publishedHero && publishedHero.id !== params.heroId) {
                return new NextResponse("Another hero is already published", { status: 400 });
            }
        }

        const updatedHero = await db.hero.update({
            where: {
                id: params.heroId
            },
            data: {
                name,
                jobTitle,
                description,
                imageUrl,
                isPublished
            }
        });

        return NextResponse.json(updatedHero);

    } catch (error) {
        console.log('[HERO-UPDATE-ERROR]:- ', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}