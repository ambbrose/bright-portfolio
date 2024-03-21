import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isAdmin } from "@/lib/isAdmin";

export async function DELETE(
    request: Request,
    { params }: { params: { contactId: string } }
) {
    try {
        const { userId } = auth();
        const user = await currentUser();

        if (!userId || !isAdmin(userId, user?.emailAddresses?.[0]?.emailAddress)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const deletedContact = await db.contact.delete({
            where: {
                id: params.contactId
            }
        });

        return NextResponse.json(deletedContact);

    } catch (error) {
        console.log('[CONTACT-DELETE-ERROR]:- ', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: { contactId: string } }
) {
    try {
        const { userId } = auth();

        const user = await currentUser();

        const values = await request.json();

        if (!userId || !isAdmin(userId, user?.emailAddresses?.[0]?.emailAddress)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params.contactId) {
            return new NextResponse("Contact ID is required", { status: 400 });
        }

        if (!values) {
            return new NextResponse("Values are required", { status: 400 });
        }

        const updatedContact = await db.contact.update({
            where: {
                id: params.contactId
            },
            data: {
                ...values
            }
        });

        return NextResponse.json(updatedContact);

    } catch (error) {
        console.log('[CONTACT-UPDATE-ERROR]:- ', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}