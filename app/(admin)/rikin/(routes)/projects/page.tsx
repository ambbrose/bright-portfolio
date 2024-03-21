import { db } from "@/lib/db";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const ProjectsPage = async () => {

    const projects = await db.project.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });

    return (
        <div className="bg-white dark:bg-black p-6">
            <DataTable columns={columns} data={projects} />
        </div>
    );
}

export default ProjectsPage;