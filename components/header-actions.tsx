"use client";

import axios from "axios";
import { useState } from "react";
import { Loader, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import { ConfirmationModal } from "@/components/modals/confirmation-modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface HeaderActionsProps {
    deleteRoute: string;
    successRoute: string;
    successMsg: string;
}

export const HeaderActions = ({ deleteRoute, successRoute, successMsg }: HeaderActionsProps) => {

    const router = useRouter();

    const { toast } = useToast();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onDelete = async () => {
        try {
            setIsLoading(true);

            await axios.delete(deleteRoute);

            toast({
                variant: "default",
                description: successMsg,
                className: "bg-green-700"
            });
            router.refresh();
            router.push(successRoute);
            router.refresh();

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <ConfirmationModal onConfirm={onDelete}>
            <Button
                size={'sm'}
                disabled={isLoading}
                className="dark:bg-red-500 text-white bg-red-500 hover:bg-red-600 dark:hover:bg-red-400"
            >
                {isLoading && <Loader className="h-4 w-4 mr-2 animate-spin" />}
                <Trash className="h-4 w-4" />
            </Button>
        </ConfirmationModal>
    );
}