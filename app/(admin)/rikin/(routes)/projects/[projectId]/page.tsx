import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { LayoutDashboard } from "lucide-react";

import { isAdmin } from "@/lib/isAdmin";
import { db } from "@/lib/db";
import { Banner } from "@/components/banner";
import { HeaderActions } from "@/components/header-actions";
import { IconBadge } from "@/components/icon-badge";
import { TitleForm } from "./_components/title-form";
import { SourceCodeForm } from "./_components/source-code-form";
import { LiveUrlForm } from "./_components/live-url-form";
import { DescriptionForm } from "./_components/description-form";
import { PublishForm } from "./_components/publish-form";
import { ImageForm } from "./_components/image-form";

const ProjectPage = async ({ params }: { params: { projectId: string } }) => {

    const user = await currentUser();

    if (!user?.id || !isAdmin(user?.id, user.emailAddresses?.[0].emailAddress)) {
        return redirect('/');
    }

    const project = await db.project.findUnique({
        where: {
            id: params.projectId
        }
    });

    if (!project) {
        return redirect("/rikin/projects");
    }

    return (
        <>
            {!project.isPublished && (
                <Banner
                    variant='warning'
                    label="This project is not yet published. It will not be visible to the clients."
                />
            )}

            <div className=" overflow-hidden p-6 dark:bg-black">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-x-1">
                        <IconBadge icon={LayoutDashboard} />

                        <h2 className="text-xl font-medium">
                            Customize your project
                        </h2>
                    </div>

                    <HeaderActions
                        deleteRoute={`/api/projects/${params.projectId}`}
                        successRoute="rikin/projects"
                        successMsg="Project deleted succesfully."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6 mt-16">

                    <div>
                        <TitleForm
                            initialData={project}
                            projectId={project.id}
                        />

                        <DescriptionForm
                            initialData={project}
                            projectId={project.id}
                        />

                        <ImageForm
                            initialData={project}
                            projectId={project.id}
                        />
                    </div>

                    <div>
                        <SourceCodeForm
                            initialData={project}
                            projectId={project.id}
                        />

                        <LiveUrlForm
                            initialData={project}
                            projectId={project.id}
                        />

                        <PublishForm
                            initialData={project}
                            projectId={project.id}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectPage;