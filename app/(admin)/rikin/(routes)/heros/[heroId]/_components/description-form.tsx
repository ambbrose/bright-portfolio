"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader, Pencil, X } from "lucide-react";
import { Hero } from "@prisma/client";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Editor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Preview } from "@/components/preview";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";


interface HeroDescriptionFormProps {
    initialData: Hero;
    heroId: string;
}

const formSchema = z.object({
    description: z.string().min(1)
});

export const HeroDescriptionForm = ({ initialData, heroId }: HeroDescriptionFormProps) => {

    const router = useRouter();

    const { toast } = useToast();

    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData.description || ""
        }
    });

    const { isSubmitting, isValid } = form.formState;

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

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="mt-6 border dark:border-neutral-800 bg-slate-100 dark:bg-neutral-950 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Description

                <Button
                    variant='ghost'
                    onClick={toggleEdit}
                >
                    {isEditing ? (
                        <>
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                        </>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit description
                        </>
                    )}
                </Button>
            </div>

            {!isEditing ? (
                <p className={cn(
                    "mt-2 text-sm",
                    !initialData.description && "text-slate-500 italic"
                )}>
                    {initialData.description ? initialData.description : 'No description'}
                </p>
            ) : (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'This course is about...'"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center gap-x-2">
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                            >
                                {isSubmitting && <Loader className="h-4 w-4 mr-2 animate-spin" />}
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
}