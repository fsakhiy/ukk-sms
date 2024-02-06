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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {createNewClass} from "@/app/admin/class/action";
import FormButton from "@/components/web-component/formButton";
import {useFormStatus} from "react-dom";
import {Loader2} from "lucide-react";
import { Toaster } from "@/components/ui/toaster"
import {toast} from "@/components/ui/use-toast";

const formSchema = z.object({
    classroom: z.string({
        required_error: "nama wajib diisi"
    }).min(1)
})

export default function CreateClassForm() {
    // ...

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            classroom: ""
        },
    })

    // const { isSubmitting }  = form.formState

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        await createNewClass(values.classroom)
        toast({description: "data created"})

    }

    return (
        <Dialog>
            <Toaster />
            <DialogTrigger className={'p-3 rounded-lg outline outline-gray-200 hover:bg-gray-200 outline-1'}>
                {/*<Button>*/}
                    Tambah data kelas baru
                {/*</Button>*/}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambah kelas baru</DialogTitle>
                </DialogHeader>

                <div  className={'flex flex-col space-y-2 w-full max-w-xl'}>
                    <div className={'w-full max-w-xl'}>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="classroom"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama Kelas</FormLabel>
                                            <FormControl>
                                                <Input placeholder="X DKV 1, XI TJKT 2, dll" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/*<FormButton >Submit</FormButton>*/}
                                {form.formState.isSubmitting ? <Button type={'submit'} disabled><Loader2 className={'mr-2 h-4 w-4 animate-spin'}/>adding data</Button> : <Button type="submit">Submit</Button>}
                            </form>
                        </Form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
