import { db } from "@/lib/db";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const ContactsPage = async () => {

    const contacts = await db.contact.findMany({
        orderBy: {
            isPublished: "desc"
        }
    });

    return (
        <div className="bg-white dark:bg-black p-6">
            <DataTable columns={columns} data={contacts} />
        </div>
    );
}

export default ContactsPage;