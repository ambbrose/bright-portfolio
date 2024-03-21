import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isAdmin } from "@/lib/isAdmin";

export async function DELETE(
    request: Request,
    { params }: { params: { projectId: string } }
) {
    try {
        const { userId } = auth();
        const user = await currentUser();

        if (!userId || !isAdmin(userId, user?.emailAddresses?.[0]?.emailAddress)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const deletedProject = await db.project.delete({
            where: {
                id: params.projectId
            }
        });

        return NextResponse.json(deletedProject);

    } catch (error) {
        console.log('[PROJECT-DELETE-ERROR]:- ', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: { projectId: string } }
) {
    try {
        const { userId } = auth();

        const user = await currentUser();

        const values = await request.json();

        if (!userId || !isAdmin(userId, user?.emailAddresses?.[0]?.emailAddress)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params.projectId) {
            return new NextResponse("Project ID is required", { status: 400 });
        }

        if (!values) {
            return new NextResponse("Values are required", { status: 400 });
        }

        const updatedProject = await db.project.update({
            where: {
                id: params.projectId
            },
            data: {
                ...values
            }
        });

        return NextResponse.json(updatedProject);

    } catch (error) {
        console.log('[PROJECT-UPDATE-ERROR]:- ', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}