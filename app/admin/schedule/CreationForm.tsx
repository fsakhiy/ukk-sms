"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"


import { Button } from "@/components/ui/Button"
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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {createNewClass} from "@/app/admin/class/action";
import FormButton from "@/components/web-component/formButton";
import {useFormStatus} from "react-dom";
import {Loader2} from "lucide-react";
import { Toaster } from "@/components/ui/toaster"
import {toast} from "@/components/ui/use-toast";
import {createNewSchedule} from "@/app/admin/schedule/action";
export interface ClassroomDataType {
    classroomId: number
    name: string
}

interface ClassroomsType {
    classrooms: ClassroomDataType[]
}

export const scheduleFormSchema = z.object({
    name: z.string({
        required_error: "nama wajib diisi"
    }).min(1),
    classroom: z.string({
        required_error: "kelas wajib diisi"
    }),
    startDate: z.date({
        required_error: "tanggal mulai wajib diisi"
    }),
    endDate: z.date({
        required_error: "tanggal berakhir wajib diisi"
    })
})

export default function CreateScheduleForm({classrooms}: ClassroomsType) {


    const form = useForm<z.infer<typeof scheduleFormSchema>>({
        resolver: zodResolver(scheduleFormSchema),
        defaultValues: {
            name: "",
            classroom: "",
            startDate: new Date(),
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 3))
        },
    })


    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof scheduleFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        await createNewSchedule(values)
        toast({description: "data created"})

    }

    return (
        <Dialog>
            <Toaster />
            <DialogTrigger className={'p-3 rounded-lg outline outline-gray-200 hover:bg-gray-200 outline-1'}>
                Tambah data jadwal baru
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambah Jadwal baru</DialogTitle>
                </DialogHeader>

                <div  className={'flex flex-col space-y-2 w-full max-w-xl'}>
                    <div className={'w-full max-w-xl'}>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama Jadwal</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Jadwal x pplg 1 jan-mar 2024" {...field} />
                                            </FormControl>
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
                                <FormField
                                    control={form.control}
                                    name="startDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Tanggal Mulai</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-[240px] pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Tanggal Mulai</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date < new Date()
                                                            // || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>

                                            <FormDescription>
                                                tanggal mulai pembelajaran dengan jadwal ini.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="endDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Tanggal Akhir</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-[240px] pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Tanggal Selesai</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        // disabled={(date) =>
                                                        //     date < new Date() || date < new Date("1900-01-01")
                                                        // }
                                                        disabled={(date) =>
                                                            date < new Date()
                                                            // || z.
                                                            || date < form.getValues("startDate")
                                                        }

                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>

                                            <FormDescription>
                                                tanggal selesai pembelajaran dengan jadwal ini.
                                            </FormDescription>
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
