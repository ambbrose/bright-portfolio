import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const HerosPage = async () => {

    const heros = await db.hero.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });

    return (
        <div className="bg-white dark:bg-black p-6">
            <DataTable columns={columns} data={heros} />
        </div>
    );
}

export default HerosPage;