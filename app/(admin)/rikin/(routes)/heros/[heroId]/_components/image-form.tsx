"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ImageIcon, Pencil, PlusCircle, X } from "lucide-react";
import { Hero } from "@prisma/client";
import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { useToast } from "@/components/ui/use-toast";

interface HeroImageFormProps {
    initialData: Hero;
    heroId: string;
};

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Image URL required"
    })
});

export const HeroImageForm = ({ initialData, heroId }: HeroImageFormProps) => {

    const router = useRouter();

    const { toast } = useToast();

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/heros/${heroId}`, values);

            toast({
                variant: "default",
                description: "Hero updated succesfully.",
                className: "bg-green-500 text-white dark:bg-green-700"
            });

            toggleEdit();

            router.refresh();
        } catch {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        }
    }

    return (
        <div className="mt-6 border dark:border-neutral-800 bg-slate-100 dark:bg-neutral-950 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Hero image
                <Button variant='ghost' onClick={toggleEdit}>
                    {isEditing && (
                        <>
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                        </>
                    )}

                    {!isEditing && !initialData.imageUrl && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add an image
                        </>
                    )}

                    {!isEditing && initialData.imageUrl && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit image
                        </>
                    )}
                </Button>
            </div>

            {!isEditing ? (
                !initialData.imageUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 dark:bg-slate-500 rounded-md">
                        <ImageIcon />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-12">
                        <Image
                            fill
                            alt="upload"
                            src={initialData.imageUrl}
                            className="object-cover rounded-md"
                        />
                    </div>
                )
            ) : (
                <div>
                    <FileUpload
                        endpoint="heroImage"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ imageUrl: url })
                            }
                        }}
                    />

                    <div className="text-xs text-muted-foreground mt-4">
                        16.9 aspect ratio recommended
                    </div>
                </div>
            )}
        </div>
    );
}