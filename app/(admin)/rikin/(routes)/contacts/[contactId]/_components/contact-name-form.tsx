"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader, Pencil, X } from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface ContactFormProps {
    initialData: { name: string; };
    contactId: string;
}

const formSchema = z.object({
    name: z.string().min(1, {
        message: 'Name is required'
    })
});

export const ContactNameForm = ({ initialData, contactId }: ContactFormProps) => {

    const router = useRouter();

    const { toast } = useToast();

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/contacts/${contactId}`, values);

            toast({
                variant: "default",
                description: "Contact updated succesfully.",
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
                Contact name
                <Button variant='ghost' onClick={toggleEdit}>
                    {isEditing ? (
                        <>
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                        </>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit name
                        </>
                    )}
                </Button>
            </div>

            {!isEditing ? (
                <p className={cn(
                    "mt-2 text-sm",
                    !initialData.name && "text-slate-500 italic"
                )}>
                    {!initialData.name && "No contact value"}

                    {initialData.name && initialData.name}
                </p>
            ) : (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Telegram'"
                                            {...field}
                                            className="dark:bg-neutral-900"
                                        />
                                    </FormControl>
                                    <FormMessage />
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