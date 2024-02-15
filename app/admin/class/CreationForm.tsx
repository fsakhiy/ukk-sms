"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z, object } from "zod"

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
    DialogContent, DialogContentLarge,
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
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {ScrollArea} from "@/components/ui/scroll-area";



export interface SubjectDataType {
    subjectId: number
    name: string
}

export interface ScheduleOrderDataType {
    id: number
    name: string
    day: string
    startPeriod: Date
    endPeriod: Date
}

interface Subjects {
    subjects: SubjectDataType[]
    scheduleOrder: ScheduleOrderDataType[]
}


export default function CreateClassForm({subjects, scheduleOrder}: Subjects) {
    // ...

    const formSchema = z.object({
        classroom: z.string({
            required_error: "nama wajib diisi"
        }).min(1),

        // [scheduleOrder.map((order) => [order.id])]: z.string()
        // [scheduleOrder[].name]: z.string()


    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            classroom: "",
            // [scheduleOrder[0].name]: ""
            // @ts-ignore
            // [scheduleOrder.map((order) => [order.name])]: ""
        },
    })

    // const { isSubmitting }  = form.formState

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        // await createNewClass(values.classroom)
        console.log(values)
        toast({description: "data created"})

    }
    return (
        <Dialog>
            <Toaster />
            <DialogTrigger asChild>
                <Button>
                    Tambah data kelas baru
                </Button>
            </DialogTrigger>

            <DialogContentLarge>
                <DialogHeader>
                    <DialogTitle>Tambah kelas baru</DialogTitle>
                </DialogHeader>
                    <div  className={'flex flex-col space-y-2 w-full'}>
                    <div className={'w-full'}>
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

                                {form.formState.isSubmitting ? <Button type={'submit'} disabled><Loader2 className={'mr-2 h-4 w-4 animate-spin'}/>adding data</Button> : <Button type="submit">Submit</Button>}
                            </form>
                        </Form>
                    </div>
                </div>
            </DialogContentLarge>
        </Dialog>
    )
}
