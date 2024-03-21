import { db } from "@/lib/db";
import { ContactsList } from "./_components/contacts-list";

const ContactsPage = async () => {

    const contacts = await db.contact.findMany({
        where: {
            isPublished: true
        }
    });

    return (
        <div className="h-full flex min-h-screen flex-col items-center px-3 md:px-24 py-24 pb-10">
            <div className="flex">
                <h1 className="text-xl font-bold dark:text-white md:text-2xl lg:text-3xl">
                    Contacts
                </h1>
            </div>

            <div className="w-full items-center justify-center flex mb-7">
                <p className="mt-4 text-[17px] text-center max-w-3xl leading-[30px]">
                    These cards showcase various methods through which you can reach out to me, including social media and other communication channels. I am eager to establish connections with you, emphasizing open communication by offering multiple avenues for contact. Whether you have inquiries, feedback, or simply wish to extend greetings, I am readily available to lend an ear and provide assistance. Feel free to explore the diverse contact options below and select the one that aligns with your preferences. Your input is highly valued, and I anticipate hearing from you soon
                </p>
            </div>

            <ContactsList contacts={contacts} />
        </div>
    );
}

export default ContactsPage;