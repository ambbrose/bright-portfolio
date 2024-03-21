import { Project } from "@prisma/client";

import { ProjectCard } from "./project-card";
import { NoResult } from "./no-result";


export const ProjectsList = ({ projects }: { projects: Project[] }) => {
    return (
        <>
            {projects.length < 1 && <NoResult />}

            <div className="grid grid-flow-row gap-6 p-10 lg:grid-cols-3">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                    />
                ))}
            </div>
        </>
    );
}