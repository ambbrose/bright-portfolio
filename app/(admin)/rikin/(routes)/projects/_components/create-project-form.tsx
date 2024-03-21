"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
    title: z.string().min(1, {
        message: 'Title is required'
    })
});

export const CreateProjectForm = () => {

    const router = useRouter();

    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/projects`, values);
            form.reset();
            router.refresh();
            toast({
                variant: "default",
                description: "Project created succesfully.",
                className: "bg-green-700"
            });

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="dark:bg-neutral-700 dark:text-white shadow-md"
                >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New Project
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[390px] rounded-sm sm:max-w-[500px] bg-white dark:bg-black">
                <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>

                    <DialogDescription>
                        Enter project title to create project. You can edit later.
                    </DialogDescription>
                </DialogHeader>

                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 mt-4"
                        >
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className="focus-visible:ring-0 focus-visible:ring-transparent bg-white dark:bg-neutral-900"
                                                disabled={isSubmitting}
                                                placeholder="Enter project title..."
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <Button
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                >
                                    {isSubmitting && <Loader className="h-4 w-4 mr-2 animate-spin" />}
                                    Save
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}