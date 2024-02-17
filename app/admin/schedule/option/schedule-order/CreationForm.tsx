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
import {CreateNewScheduleOrderAction} from "@/app/admin/schedule/option/schedule-order/action";

export const scheduleOrderSchema = z.object({
    name: z.string().min(1),
    day: z.string().min(1),
    startTime: z.string(),
    endTime: z.string()
})



export default function CreateNewScheduleOrder() {
    // ...

    const { toast } = useToast()

    const form = useForm<z.infer<typeof scheduleOrderSchema>>({
        resolver: zodResolver(scheduleOrderSchema),
        defaultValues: {
            name: "",
            day: "",
            startTime: "",
            endTime: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof scheduleOrderSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        await CreateNewScheduleOrderAction(values)

        toast({ description: "data created"})

    }

    const days = [{ display: "Senin", actual: "MONDAY"}, {display: "Selasa", actual: "TUESDAY"}, {display: "Rabu", actual: "WEDNESDAY"}, {display: "Kamis", actual: "THURSDAY"}, {display: "Jumat", actual: "FRIDAY"}]

    return (
        <Dialog>
            <Toaster />
            {/*<DialogTrigger>*/}
            <DialogTrigger asChild>
                <Button variant={'outline'} >
                    Tambah data jam pelajaran baru
                </Button>
            </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tambah Jam Pelajaran</DialogTitle>
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
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Jam Selesai</FormLabel>
                                                <FormDescription>
                                                    nama jam pelajaran seperti (jam pertama) atau (jam kedua) dst..
                                                </FormDescription>

                                                <FormControl>
                                                    <Input placeholder={'jam pertama'} {...field}/>
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="day"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Hari</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder={"pilih hari"} />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {days.map((day) => (
                                                                <SelectItem key={day.actual} value={day.actual}>{day.display}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="startTime"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Jam Mulai</FormLabel>
                                                <FormDescription>
                                                    jam haru sesuai format HH:MM contohnya 13:45 atau 07:00
                                                </FormDescription>

                                                <FormControl>
                                                    <Input placeholder={'07:00'} {...field}/>
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="endTime"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Jam Selesai</FormLabel>
                                                <FormDescription>
                                                    jam haru sesuai format HH:MM contohnya 13:45 atau 07:00
                                                </FormDescription>

                                                <FormControl>
                                                    <Input placeholder={'07:00'} {...field}/>
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {form.formState.isSubmitting ?
                                        <Button type={'submit'} disabled><Loader2 className={'mr-2 h-4 w-4 animate-spin'}/>membuat data</Button>
                                        :
                                        <Button type="submit">Buat Data</Button>
                                    }

                                </form>
                            </Form>
                        </div>
                    </div>
            </DialogContent>
        </Dialog>
    )
}
