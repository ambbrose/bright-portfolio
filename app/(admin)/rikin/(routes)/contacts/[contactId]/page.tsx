import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { LayoutDashboard } from "lucide-react";

import { isAdmin } from "@/lib/isAdmin";
import { db } from "@/lib/db";
import { Banner } from "@/components/banner";
import { HeaderActions } from "@/components/header-actions";
import { IconBadge } from "@/components/icon-badge";
import { ContactNameForm } from "./_components/contact-name-form";
import { ContactValueForm } from "./_components/contact-value-form";
import { ContactPublishForm } from "./_components/contact-publish-form";
import { ContactIconForm } from "./_components/contact-icon-form";
// import { LiveUrlForm } from "./_components/live-url-form";
// import { DescriptionForm } from "./_components/description-form";
// import { PublishForm } from "./_components/publish-form";

const ProjectPage = async ({ params }: { params: { contactId: string } }) => {

    const user = await currentUser();

    if (!user?.id || !isAdmin(user?.id, user.emailAddresses?.[0].emailAddress)) {
        return redirect('/');
    }

    const contact = await db.contact.findUnique({
        where: {
            id: params.contactId
        }
    });

    if (!contact) {
        return redirect("/rikin/contacts");
    }

    return (
        <>
            {!contact.isPublished && (
                <Banner
                    variant='warning'
                    label="This contact is not yet published. It will not be visible to the clients."
                />
            )}

            <div className=" overflow-hidden p-6 dark:bg-black">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-x-1">
                        <IconBadge icon={LayoutDashboard} />

                        <h2 className="text-xl font-medium">
                            Customize your contact
                        </h2>
                    </div>

                    <HeaderActions
                        deleteRoute={`/api/contacts/${params.contactId}`}
                        successRoute="/rikin/contacts"
                        successMsg="Contact deleted succesfully."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6 mt-16">

                    <div>
                        <ContactNameForm
                            initialData={contact}
                            contactId={contact.id}
                        />

                        <ContactIconForm
                            initialData={contact}
                            contactId={contact.id}
                        />
                    </div>

                    <div>
                        <ContactValueForm
                            initialData={contact}
                            contactId={contact.id}
                        />

                        <ContactPublishForm
                            initialData={contact}
                            contactId={contact.id}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectPage;