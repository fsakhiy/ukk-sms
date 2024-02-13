"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {createNewStudent} from "@/app/admin/student/action";
import {Loader2} from "lucide-react";
import {createNewSubject} from "@/app/admin/subject/action";

export const subjectFormSchema = z.object({

    name: z.string({
        required_error: "nama wajib diisi"
    }).min(1)
})


export default function CreateSubjectForm() {
    // ...

    const { toast } = useToast()

    const form = useForm<z.infer<typeof subjectFormSchema>>({
        resolver: zodResolver(subjectFormSchema),
        defaultValues: {
            name: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof subjectFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // console.log(values)

        await createNewSubject(values)
        toast({ description: "data created"})

    }

    return (
        <Dialog>
            <Toaster />
            <DialogTrigger className={'p-3 rounded-lg outline outline-gray-200 hover:bg-gray-200 outline-1'}>
                {/*<Button>*/}
                Tambah data mata pelajaran baru
                {/*</Button>*/}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambah data mata pelajaran baru</DialogTitle>
                </DialogHeader>
                <div  className={'items-center justify-center flex flex-col space-y-10 w-full'}>
                    {/*<div className={'font-bold text-3xl'}>*/}
                    {/*    Tambah Siswa Baru*/}
                    {/*</div>*/}
                    <div className={'w-full max-w-xl'}>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama Mata Pelajaran</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Bahasa Inggris, Matematika, KRPL, dll..." {...field} />
                                            </FormControl>
                                            {/*<FormDescription>*/}
                                            {/*    This is your public display name.*/}
                                            {/*</FormDescription>*/}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {form.formState.isSubmitting ?
                                    <Button type={'submit'} disabled><Loader2 className={'mr-2 h-4 w-4 animate-spin'}/>adding data</Button>
                                    :
                                    <Button type="submit">Submit</Button>
                                }

                            </form>
                        </Form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
