"use client";

import { Hero } from "@prisma/client";
import { motion } from "framer-motion";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const HomePageClient = ({ hero }: { hero: Hero | null }) => {
    return (
        <>
            <motion.main className="md:w-full">
                <div className="flex flex-col md:flex-row items-center md:justify-evenly">
                    <motion.div
                        whileHover={{ scale: 1.4 }}
                        initial={{ x: -100 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 1.4 }}
                    >
                        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-0 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                            <Avatar className="h-90 w-80 relative ring-4 ring-neutral-900 dark:ring-blue-950">
                                <AvatarImage
                                    alt="Profile Picture"
                                    src={hero?.imageUrl || ""}
                                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
                                />
                            </Avatar>
                        </div>
                    </motion.div>

                    <div className="my-5 flex flex-col">
                        <motion.div
                            initial={{ x: 100 }}
                            animate={{ x: 0 }}
                            transition={{ duration: 1.2 }}
                            className="flex flex-wrap items-center justify-center"
                        >
                            <p className="text-base text-gray-600 dark:text-gray-500">
                                {hero?.jobTitle}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ x: 100 }}
                            animate={{ x: 0 }}
                            transition={{ duration: 1.5 }}
                            className="my-5 flex flex-wrap items-center justify-center"
                        >
                            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white md:text-4xl lg:text-5xl text-center">
                                {hero?.name}
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ x: 100 }}
                            animate={{ x: 0 }}
                            transition={{ duration: 1.8 }}
                            className="flex max-w-sm flex-wrap items-center md:max-w-md"
                        >
                            <p className="text-center text-sm text-neutral-900 dark:text-white md:text-lg relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-0 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                                {hero?.description}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.main>

            <div className="mb-32 mt-10 grid text-center lg:max-w-5xl w-full lg:mb-0 lg:grid-cols-1 lg:text-left gap-2">
                <div
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-700 dark:hover:border-gray-300 hover:dark:border-neutral-700 hover:bg-neutral-500 hover:dark:bg-neutral-800/30 bg-neutral-600 dark:bg-blue-950"
                >
                    <h2 className={`mb-3 text-2xl font-semibold text-white`}>
                        Data Analysis and Insights{" "}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 text-sm opacity-60 dark:opacity-50 text-white`}>
                        Performing data analysis on provided datasets to uncover insights, trends, and patterns. Generating reports and visualizations to communicate findings effectively to stakeholders. Offering recommendations and actionable insights based on data analysis results.
                    </p>
                </div>

                <div
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-700 dark:hover:border-gray-300 hover:dark:border-neutral-700 hover:bg-neutral-500 hover:dark:bg-neutral-800/30 bg-neutral-600 dark:bg-blue-950"
                >
                    <h2 className={`mb-3 text-2xl font-semibold text-white`}>
                        Data Cleaning and Preparation{" "}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 text-sm opacity-60 dark:opacity-50 text-white`}>
                        Cleaning and preprocessing raw data to ensure its quality and usability. Handling missing data, outliers, and inconsistencies in datasets. Transforming and structuring data for analysis and modeling purposes.
                    </p>
                </div>

                <div
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-700 dark:hover:border-gray-300 hover:dark:border-neutral-700 hover:bg-neutral-500 hover:dark:bg-neutral-800/30 bg-neutral-600 dark:bg-blue-950"
                >
                    <h2 className={`mb-3 text-2xl font-semibold text-white`}>
                        Predictive Modeling and Machine Learning{" "}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 text-sm opacity-60 dark:opacity-50 text-white`}>
                        Building predictive models and machine learning algorithms to forecast outcomes or classify data. Evaluating model performance and fine-tuning algorithms for optimal results. Implementing predictive analytics solutions for specific business needs, such as customer churn prediction or demand forecasting.
                    </p>
                </div>

                <div
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-700 dark:hover:border-gray-300 hover:dark:border-neutral-700 hover:bg-neutral-500 hover:dark:bg-neutral-800/30 bg-neutral-600 dark:bg-blue-950"
                >
                    <h2 className={`mb-3 text-2xl font-semibold text-white`}>
                        Data Visualization and Dashboard Development{" "}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 text-sm opacity-60 dark:opacity-50 text-white`}>
                        Creating interactive dashboards and visualizations to present key metrics and insights. Customizing dashboards to meet specific business requirements and user preferences. Utilizing tools like Tableau, Power BI, or Python libraries (e.g., Matplotlib, Seaborn) for data visualization.
                    </p>
                </div>

                <div
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-700 dark:hover:border-gray-300 hover:dark:border-neutral-700 hover:bg-neutral-500 hover:dark:bg-neutral-800/30 bg-neutral-600 dark:bg-blue-950"
                >
                    <h2 className={`mb-3 text-2xl font-semibold text-white`}>
                        Statistical Analysis and Experiment Design{" "}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 text-sm opacity-60 dark:opacity-50 text-white`}>
                        Conducting statistical analysis to test hypotheses and validate findings. Designing experiments and A/B tests to measure the impact of changes or interventions. Providing statistical consultation and guidance on experimental design and analysis methodologies.
                    </p>
                </div>
            </div>
        </>
    );
}