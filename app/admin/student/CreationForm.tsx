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
import {useState} from "react";

export const studentFormSchema = z.object({

    name: z.string().min(1),
    nis: z.string().min(1),
    nisn: z.string().min(1),
    classroom: z
        .string({
            required_error: "kelas wajib dipilih"

        })
        .min(1)
})

export interface ClassroomDataType {
    classroomId: number
    name: string
}

interface ClassroomsType {
    classrooms: ClassroomDataType[]
}

export default function CreateStudentForm({classrooms}: ClassroomsType) {
    // ...

    const { toast } = useToast()

    const form = useForm<z.infer<typeof studentFormSchema>>({
        resolver: zodResolver(studentFormSchema),
        defaultValues: {
            name: "",
            nis: "",
            nisn: "",
            classroom: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof studentFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // console.log(values)

        await createNewStudent(values)
        toast({ description: "data created"})

    }

    return (
        <Dialog>
            <Toaster />
                    {/*<DialogTrigger>*/}
                    <DialogTrigger asChild>
                <Button variant={'outline'} >
                    Tambah data murid baru
                </Button>
                    </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambah data siswa baru</DialogTitle>
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
                                            <FormLabel>Nama Siswa</FormLabel>
                                            <FormControl>
                                                <Input placeholder="john doe" {...field} />
                                            </FormControl>
                                            {/*<FormDescription>*/}
                                            {/*    This is your public display name.*/}
                                            {/*</FormDescription>*/}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="nis"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>NIS</FormLabel>
                                            <FormControl>
                                                <Input placeholder="15243" {...field} />
                                            </FormControl>
                                            {/*<FormDescription>*/}
                                            {/*    This is your public display name.*/}
                                            {/*</FormDescription>*/}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="nisn"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>NISN</FormLabel>
                                            <FormControl>
                                                <Input placeholder="12345678" {...field} />
                                            </FormControl>
                                            {/*<FormDescription>*/}
                                            {/*    This is your public display name.*/}
                                            {/*</FormDescription>*/}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="classroom"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Untuk Kelas</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder={"pilih kelas"} />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {classrooms.map((classroom) => (
                                                            <SelectItem key={classroom.classroomId} value={classroom.classroomId.toString()}>{classroom.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>

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
