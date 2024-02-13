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

const formSchema = z.object({
    classroom: z.string({
        required_error: "nama wajib diisi"
    }).min(1),
    seninSatu: z.string({
        required_error: "pelajaran wajib diisi",
    }).min(1),seninDua: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),seninTiga: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),seninEmpat: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),seninLima: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),seninEnam: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),seninTujuh: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),seninDelapan: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),seninSembilan: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),seninSepuluh: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),
    selasaSatu: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),selasaDua: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),selasaTiga: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),selasaEmpat: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),selasaLima: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),selasaEnam: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),selasaTujuh: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),selasaDelapan: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),selasaSembilan: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),selasaSepuluh: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),
    rabuSatu: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),rabuDua: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),rabuTiga: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),rabuEmpat: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),rabuLima: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),rabuEnam: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),rabuTujuh: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),rabuDelapan: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),rabuSembilan: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),rabuSepuluh: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),
    kamisSatu: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),kamisDua: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),kamisTiga: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),kamisEmpat: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),kamisLima: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),kamisEnam: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),kamisTujuh: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),kamisDelapan: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),kamisSembilan: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),kamisSepuluh: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),
    jumatSatu: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),jumatDua: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),jumatTiga: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),jumatEmpat: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),jumatLima: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),jumatEnam: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),jumatTujuh: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),jumatDelapan: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),jumatSembilan: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),jumatSepuluh: z.string({
        required_error: "pelajaran wajib diisi"
    }).min(1),
})

export interface SubjectDataType {
    subjectId: number
    name: string
}

interface Subjects {
    subjects: SubjectDataType[]
}

export default function CreateClassForm({subjects}: Subjects) {
    // ...

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            classroom: "",
            seninSatu: "",
            seninDua: "",
            seninTiga: "",
            seninEmpat: "",
            seninLima: "",
            seninEnam: "",
            seninTujuh: "",
            seninDelapan: "",
            seninSembilan: "",
            seninSepuluh: "",
            selasaSatu: "",
            selasaDua: "",
            selasaTiga: "",
            selasaEmpat: "",
            selasaLima: "",
            selasaEnam: "",
            selasaTujuh: "",
            selasaDelapan: "",
            selasaSembilan: "",
            selasaSepuluh: "",
            rabuSatu: "",
            rabuDua: "",
            rabuTiga: "",
            rabuEmpat: "",
            rabuLima: "",
            rabuEnam: "",
            rabuTujuh: "",
            rabuDelapan: "",
            rabuSembilan: "",
            rabuSepuluh: "",
            kamisSatu: "",
            kamisDua: "",
            kamisTiga: "",
            kamisEmpat: "",
            kamisLima: "",
            kamisEnam: "",
            kamisTujuh: "",
            kamisDelapan: "",
            kamisSembilan: "",
            kamisSepuluh: "",
            jumatSatu: "",
            jumatDua: "",
            jumatTiga: "",
            jumatEmpat: "",
            jumatLima: "",
            jumatEnam: "",
            jumatTujuh: "",
            jumatDelapan: "",
            jumatSembilan: "",
            jumatSepuluh: "",
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
                                    <ScrollArea className={'h-[300px] w-full p-4'}>
                                        <div className={'flex flex-col space-y-10'}>
                                            <div className={'font-bold text-2xl'}>
                                                Hari Senin

                                                <div className={'grid grid-cols-5 gap-3'}>
                                                        <FormField
                                                            control={form.control}
                                                            name="seninSatu"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 1</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="seninDua"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 2</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="seninTiga"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 3</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="seninEmpat"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 4</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="seninLima"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 5</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="seninEnam"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 6</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="seninTujuh"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 7</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="seninDelapan"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 8</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="seninSembilan"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 9</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="seninSepuluh"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 10</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                            </div>

                                            <div className={'font-bold text-2xl'}>
                                                Hari Selasa

                                                <div className={'grid grid-cols-5 gap-3'}>
                                                        <FormField
                                                            control={form.control}
                                                            name="selasaSatu"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 1</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="selasaDua"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 2</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="selasaTiga"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 3</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="selasaEmpat"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 4</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="selasaLima"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 5</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="selasaEnam"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 6</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="selasaTujuh"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 7</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="selasaDelapan"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 8</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="selasaSembilan"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 9</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="selasaSepuluh"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 10</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                            </div>
                                            <div className={'font-bold text-2xl'}>
                                                Hari Rabu

                                                <div className={'grid grid-cols-5 gap-3'}>
                                                        <FormField
                                                            control={form.control}
                                                            name="rabuSatu"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 1</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="rabuDua"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 2</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="rabuTiga"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 3</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="rabuEmpat"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 4</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="rabuLima"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 5</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="rabuEnam"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 6</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="rabuTujuh"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 7</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="rabuDelapan"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 8</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="rabuSembilan"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 9</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="rabuSepuluh"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 10</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                            </div>
                                            <div className={'font-bold text-2xl'}>
                                                Hari Kamis

                                                <div className={'grid grid-cols-5 gap-3'}>
                                                        <FormField
                                                            control={form.control}
                                                            name="kamisSatu"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 1</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="kamisDua"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 2</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="kamisTiga"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 3</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="kamisEmpat"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 4</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="kamisLima"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 5</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="kamisEnam"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 6</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="kamisTujuh"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 7</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="kamisDelapan"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 8</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="kamisSembilan"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 9</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="kamisSepuluh"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 10</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                            </div>
                                            <div className={'font-bold text-2xl'}>
                                                Hari Jumat

                                                <div className={'grid grid-cols-5 gap-3'}>
                                                        <FormField
                                                            control={form.control}
                                                            name="jumatSatu"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 1</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="jumatDua"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 2</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="jumatTiga"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 3</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="jumatEmpat"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 4</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="jumatLima"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 5</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="jumatEnam"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 6</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="jumatTujuh"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 7</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="jumatDelapan"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 8</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="jumatSembilan"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 9</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /><FormField
                                                            control={form.control}
                                                            name="jumatSepuluh"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mata Pelajaran - 10</FormLabel>
                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                                                            <FormControl>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={"pilih mapel"} />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                {subjects.map((subject) => (
                                                                                    <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>{subject.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                            </div>
                                        </div>
                                    </ScrollArea>
                                {form.formState.isSubmitting ? <Button type={'submit'} disabled><Loader2 className={'mr-2 h-4 w-4 animate-spin'}/>adding data</Button> : <Button type="submit">Submit</Button>}
                            </form>
                        </Form>
                    </div>
                </div>
            </DialogContentLarge>
        </Dialog>
    )
}
