
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const searchParam = searchParams.get('searchParam') ?? undefined;

        if (searchParam) {
            const projects = await db.project.findMany({
                where: {
                    isPublished: true,
                    title: {
                        contains: searchParam,
                        mode: 'insensitive'
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            const response = NextResponse.json(projects);

            response.headers.set('Access-Control-Allow-Origin', `${process.env.FRONTEND_URL}`); // Adjust the origin as needed
            response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS'); // Include other methods if needed
            response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

            return response;
        };
    } catch (error) {
        console.log('[PROJECTS-SEARCH-ERROR]', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    };
};