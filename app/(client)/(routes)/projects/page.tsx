import { db } from "@/lib/db";
import { ProjectsClient } from "./_components/projects-client";


const ProjectsPage = async (
    { searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }
) => {

    const PER_PAGE = 6;
    const take = PER_PAGE || 6;
    const currentPage = Math.max(Number(searchParams['page'] || 1), 1);
    const skip = (currentPage - 1) * PER_PAGE;

    const projects = await db.project.findMany({
        where: {
            isPublished: true
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: skip,
        take: take
    });

    const projectsCount = await db.project.count({
        where: {
            isPublished: true
        }
    });

    const totalPages = Math.ceil(projectsCount / PER_PAGE);
    const prevPage = Math.max(currentPage - 1, 0);
    const nextPage = Math.min(currentPage + 1, totalPages);

    return (
        <div className="h-full flex min-h-screen flex-col items-center md:px-24 py-24 pb-10">
            <ProjectsClient
                projects={projects}
                totalPages={totalPages}
                prevPage={prevPage}
                nextPage={nextPage}
                per_page={PER_PAGE}
                count={projectsCount}
                currentPage={currentPage}
            />
        </div>
    );
}

export default ProjectsPage;