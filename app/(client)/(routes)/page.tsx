import { db } from "@/lib/db";
import { HomePageClient } from "./_components/home-page-client";

export default async function Home() {

    const hero = await db.hero.findFirst({
        where: {
            isPublished: true,
        },
    });

    return (
        <main className="flex w-full min-h-screen flex-col items-center justify-between p-6 md:p-24 pb-10">
            <HomePageClient hero={hero} />
        </main>
    );
}
