import { Project } from "@prisma/client";
import { Info, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";

export const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <div className="relative max-w-md rounded-xl border shadow-md border-gray-700 p-2">
            <Link href={`/projects/${project.id}`} className="relative">

                <div className="aspect-square rounded-xl relative cursor-pointer">
                    <Image
                        fill
                        src={project.imageUrl || "/project-card.jpg"}
                        alt={project.title}
                        className="object-cover rounded-xl"
                    />
                </div>
            </Link>

            <div className="p-2 mb-1">
                <h3 className="dark:text-white font-bold sm:text-md text-lg truncate tracking-tight">
                    {project.title}
                </h3>

                <div className="flex flex-row mb-0 items-center justify-between gap-1 text-gray-900 mr-1 font-bold">
                {project?.url ? (
                    <Link
                        href={project?.url || ""}
                        target="_blank"
                    >
                        <Button>
                            <LinkIcon size={20} className="mr-2" />
                            Live
                        </Button>
                    </Link>
                ) : (
                    <Button disabled>
                        <LinkIcon size={20} className="mr-2" />
                        Live
                    </Button>
                )}

                {project?.source_code_link ? (
                    <Link
                        href={project?.source_code_link || ""}
                        target="_blank"
                    >
                        <Button>
                            <FaGithub size={20} className="mr-2" />
                            Source Code
                        </Button>
                    </Link>
                ) : (
                    <Button disabled>
                        <FaGithub size={20} className="mr-2" />
                        Source Code
                    </Button>
                )}
                </div>
            </div>

            {/* <Link href={`/projects/${project.id}`} className="absolute top-0 right-0 z-10 p-4">
                <Info className="text-white" />
            </Link> */}
        </div>
    );
}