import { Preview } from "@/components/preview";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const ProjectPage = async ({ params }: { params: { projectId: string } }) => {

    const project = await db.project.findUnique({
        where: {
            id: params.projectId
        }
    });

    return (
        <div className="h-full w-full flex min-h-screen flex-col items-center justify-between md:px-24 py-24">
            <div className="flex items-center justify-center p-4">
                <h1 className="text-md sm:text-xl md:text-3xl dark:text-white font-bold">
                    Project Title: {project?.title}
                </h1>
            </div>

            <div className="flex items-center justify-start p-4 overflow-hidden">
                <p className="text-lg dark:text-white sm:px-6 md:px-12">
                    {project?.description ? (
                        <Preview value={project.description} />
                    ) : "No descripton"}
                </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-1 text-gray-900 mr-1 font-bold w-full p-4 px-16">
                {project?.url ? (
                    <Link
                        href={project?.url || ""}
                        target="_blank"
                        className="md:w-auto w-full flex items-center justify-center"
                    >
                        <Button
                            className="w-full"
                        >
                            <LinkIcon size={20} className="mr-2" />
                            Live
                        </Button>
                    </Link>
                ) : (
                    <Button
                        disabled
                        className="md:w-auto w-full"
                    >
                        <LinkIcon size={20} className="mr-2" />
                        Live
                    </Button>
                )}

                {project?.source_code_link ? (
                    <Link
                        href={project?.source_code_link || ""}
                        target="_blank"
                        className="md:w-auto w-full flex items-center justify-center"
                    >
                        <Button className="w-full">
                            <FaGithub size={20} className="mr-2" />
                            Source Code
                        </Button>
                    </Link>
                ) : (
                    <Button className="md:w-auto w-full" disabled>
                        <FaGithub size={20} className="mr-2" />
                        Source Code
                    </Button>
                )}
            </div>
        </div>
    );
}

export default ProjectPage;

export async function generateMetadata({ params }: { params: { projectId: string } }) {

    const project = await db.project.findUnique({
        where: {
            id: params.projectId
        }
    });

    return {
        title: `Rikin - ${project?.title}`
    }
}