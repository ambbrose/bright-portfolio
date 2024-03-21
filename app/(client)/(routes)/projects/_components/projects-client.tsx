"use client";

import { motion } from "framer-motion";
import { Project } from "@prisma/client";

import { ProjectsList } from "./projects-list";
import { PaginationControls } from "./pagination";

interface ProjectsClientProps {
    projects: Project[];
    count: number;
    per_page: number;
    totalPages: number;
    prevPage: number;
    nextPage: number;
    currentPage: number;
}

export const ProjectsClient = ({ projects, count, per_page, totalPages, prevPage, nextPage, currentPage }: ProjectsClientProps) => {
    return (
        <motion.main>
            <motion.div
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                transition={{ duration: 1.5 }}
                className="items-center justify-center flex p-10"
            >
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold dark:text-white">
                    A Catalog of Endeavors
                </h1>
            </motion.div>

            <motion.div
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ duration: 2.3 }}
                className="w-full h-auto flex flex-col md:px-20 px-5"
            >
                <p className="flex flex-wrap dark:text-indigo-100 relative place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-0 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1] text-center">
                    Thank you for visiting, this portfolio is a humble showcase of my journey through Data Analysis. I have had the privilege of working on a few data analysis projects, each teaching me something valuable. Browse through my collection, and get a glimpse of my experiences, and the projects that have shaped my journey. Each project is a testament to my dedication to quality and my drive to constantly learn and improve.
                </p>
            </motion.div>

            <div className="">
                <ProjectsList projects={projects} />
            </div>

            <div className="h-auto w-full flex items-center justify-center my-10">
                {totalPages > 1 && <PaginationControls
                    hasPrevPage={currentPage > 1}
                    hasNextPage={currentPage < totalPages}
                    count={count}
                    per_page={per_page}
                    totalPages={totalPages}
                    prevPage={prevPage}
                    nextPage={nextPage}
                />}
            </div>
        </motion.main>
    );
}