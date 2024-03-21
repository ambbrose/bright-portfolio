import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { LayoutDashboard } from "lucide-react";

import { isAdmin } from "@/lib/isAdmin";
import { db } from "@/lib/db";
import { Banner } from "@/components/banner";
import { HeaderActions } from "@/components/header-actions";
import { IconBadge } from "@/components/icon-badge";
import { NameForm } from "./_components/name-form";
import { JobTitleForm } from "./_components/job-title-form";
import { HeroPublishForm } from "./_components/publish-form";
import { HeroDescriptionForm } from "./_components/description-form";
import { HeroImageForm } from "./_components/image-form";

const HeroPage = async ({ params }: { params: { heroId: string } }) => {

    const user = await currentUser();

    if (!user?.id || !isAdmin(user?.id, user.emailAddresses?.[0].emailAddress)) {
        return redirect('/');
    }

    const hero = await db.hero.findUnique({
        where: {
            id: params.heroId
        }
    });

    if (!hero) {
        return redirect("/rikin/heros");
    }

    const requiredFields = [
        hero.description,
        hero.imageUrl,
        hero.jobTitle,
        hero.name
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean);

    return (
        <>
            {!hero.isPublished && (
                <Banner
                    variant='warning'
                    label="This hero is not yet published. It will not be used in the home page of the client side"
                />
            )}

            <div className=" overflow-hidden p-6 dark:bg-black">

                <div className="flex items-center justify-between">

                    <div className="">
                        <div className="flex items-center gap-x-1">

                            <IconBadge icon={LayoutDashboard} />

                            <h2 className="text-xl font-medium">
                                Customize the hero
                            </h2>
                        </div>

                        <span className="text-sm text-slate-700">
                            Complete all fields {completionText}
                        </span>
                    </div>

                    <HeaderActions
                        deleteRoute={`/api/heros/${params.heroId}`}
                        successRoute="/rikin/heros"
                        successMsg="Hero deleted succesfully."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6 mt-16">

                    <div>
                        <NameForm
                            initialData={hero}
                            heroId={hero.id}
                        />

                        <HeroPublishForm
                            initialData={hero}
                            heroId={hero.id}
                            disabled={!isComplete}
                        />

                        <HeroImageForm
                            initialData={hero}
                            heroId={hero.id}
                        />
                    </div>

                    <div>
                        <JobTitleForm
                            initialData={hero}
                            heroId={hero.id}
                        />

                        <HeroDescriptionForm
                            initialData={hero}
                            heroId={hero.id}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeroPage;