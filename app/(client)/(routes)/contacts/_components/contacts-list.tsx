"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Contact } from "@prisma/client";

export const ContactsList = ({ contacts }: { contacts: Contact[] }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {contacts.map((contact) => (
                <Link
                    key={contact.id}
                    target="_blank"
                    href={contact.contactValue || ""}
                    className="shadow-card"
                >
                    <motion.div
                        initial={{ x: -100 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 1.3 }}
                        whileHover={{ scale: 1.15 }}
                    >
                        <div className="bg-neutral-700 dark:bg-blue-950 rounded-[20px] py-5 px-12 min-h-[200px] min-w-[100px] flex justify-evenly items-center flex-col">
                            <Image
                                alt={contact.name}
                                src={contact.iconUrl || ""}
                                height={100}
                                width={100}
                                className="object-contain aspect-square"
                                priority
                            />

                            <h3 className="text-white text-[20px] font-bold text-center">
                                {contact.name}
                            </h3>
                        </div>
                    </motion.div>
                </Link>
            ))}
        </div>
    );
}