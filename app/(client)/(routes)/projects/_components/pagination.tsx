"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

interface PaginationProps {
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
    count: number;
    per_page: number;
    totalPages: number;
    prevPage: number;
    nextPage: number;
}

export const PaginationControls = ({ hasNextPage, hasPrevPage, count, per_page }: PaginationProps) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

    const onPrev = () => {
        router.push(`/projects/?page=${Number(currentPage) - 1}&per_page=${per_page}`);
        window.scrollTo(0, 500);
    }

    const onNext = () => {
        router.push(`/projects/?page=${Number(currentPage) + 1}&per_page=${per_page}`);
        window.scrollTo(0, 500);
    }

    return (
        <div className="flex flex-row gap-4 items-center">
            <Button
                onClick={onPrev}
                disabled={!hasPrevPage}
            >
                Previous
            </Button>

            <p className="text-xs sm:text-sm">
                page {currentPage} of {Math.ceil(count / Number(per_page))}
            </p>

            <Button 
                onClick={onNext}
                disabled={!hasNextPage}
            >
                Next
            </Button>
        </div>
    );
}