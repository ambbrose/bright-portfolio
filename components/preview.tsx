"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
    value: string;
}

export const Preview = ({ value }: PreviewProps) => {

    const pathname = usePathname();

    const [isMounted, setIsMounted] = useState<boolean>(false);

    const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className={cn(
            "bg-white dark:bg-neutral-900",
            pathname.includes("/projects") && "dark:bg-transparent"
        )}>
            <ReactQuill
                theme="bubble"
                value={value}
                readOnly
                className={cn(
                    "dark:bg-neutral-900 rounded-md",
                    pathname.includes("/projects") && "dark:bg-transparent"
                )}
            />
        </div>
    );
}