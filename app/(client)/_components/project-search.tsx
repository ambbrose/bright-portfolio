
"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { FolderRoot, Search } from "lucide-react";
import debounce from 'lodash.debounce';
import { useQuery } from '@tanstack/react-query';
import Link from "next/link";
import axios from "axios";
import { Project } from "@prisma/client";
import qs from "query-string";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";


export const ProjectsSearch = () => {

    const router = useRouter();
    const pathname = usePathname();
    const [input, setInput] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);

    const request = debounce(async () => {
        refetch();
    }, 300);

    const debounceRequest = useCallback(() => {
        request();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const url = qs.stringifyUrl({
        url: '/api/project-search',
        query: {
            searchParam: input
        }
    });

    const {
        isFetching,
        isFetched,
        data,
        refetch
    } = useQuery({
        queryFn: async () => {
            if (!input) return [];
            const { data } = await axios.get(url);

            return data as Project[];
        },
        queryKey: ['project-search-query'],
        enabled: false,
    });

    useEffect(() => {
        setInput("");
        setOpen(false);
    }, [pathname]);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();

                setOpen((open) => !open);
            };
        };

        document.addEventListener('keydown', down);

        return () => document.removeEventListener('keydown', down);
    }, []);

    return (
        <div className="w-[200px] sm:w-[250px] md:w-[300px] text-white flex items-center justify-center">
            <button
                onClick={() => setOpen(true)}
                className="group px-2 py-2 bg-zinc-700/30 hover:bg-zinc-700/50 rounded-md flex items-center gap-x-2 w-full transition"
            >
                <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />

                <p
                    className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition truncate"
                >
                    Search Projects...
                </p>

                <kbd
                    className="pointer-events-none md:inline-flex hidden h-4 select-none items-center gap-1 rounded border bg-muted px-1.5 py-3 font-mono text-[10px] font-medium text-muted-foreground ml-auto"
                >
                    <span className="text-xs">⌘</span><span className="text-sm">K</span>
                </kbd>
            </button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput
                    isLoading={isFetching}
                    onValueChange={(text) => {
                        setInput(text)
                        debounceRequest()
                    }}
                    value={input}
                    className='outline-none border-none focus:border-none focus:outline-none ring-0'
                    placeholder='Search Projects...'
                />

                <CommandList>
                    {!data && isFetched && <CommandEmpty>No results found.</CommandEmpty>}

                    {isFetched && (data?.length ?? 0) > 0 && (
                        <CommandGroup heading='Projects...'>
                            {data?.map((project) => (
                                <Link key={project.id} href={`/projects/${project.id}`}>
                                    <CommandItem
                                        value={project.title}
                                        onSelect={(e) => {
                                            router.push(`/projects/${project.id}`);
                                            router.refresh();
                                        }}
                                    >
                                        <FolderRoot className='mr-2 h-4 w-4' />
                                        <p className="font-semibold">
                                            {project.title}
                                        </p>
                                    </CommandItem>
                                </Link>
                            ))}
                        </CommandGroup>
                    )}
                </CommandList>

            </CommandDialog>
        </div>
    );
}