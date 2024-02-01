"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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


const formSchema = z.object({
    // username: z.string().min(2, {
    //     message: "Username must be at least 2 characters.",
    // }),
    // password: z.string().min(5, {
    //     message: "password must be at least 5 characters"
    // })
    name: z.string(),
    nis: z.string(),
    nisn: z.string(),
    kelas: z
        .string({
            required_error: "kelas wajib dipilih"

        }),
    jurusan: z
        .string({
            required_error: "jurusan wajib dipilih"
        }),
    pembagianKelas: z
        .string({
            required_error: "pembagian kelas wajib dipilih"
        })
})

export default function CreateStudentForm() {
    // ...

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            nis: "",
            nisn: "",
            kelas: "",
            jurusan: "",
            pembagianKelas: ""
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Dialog>
            <DialogTrigger>
                Tambah data siswa baru
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambah data siswa baru</DialogTitle>
                </DialogHeader>
                <div  className={'p-10 items-center justify-center flex flex-col space-y-10 w-full'}>
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
                                    name="kelas"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Kelas</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih Kelas" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="10">10</SelectItem>
                                                    <SelectItem value="11">11</SelectItem>
                                                    <SelectItem value="12">12</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="jurusan"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Jurusan</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih Jurusan" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="PPLG">PPLG</SelectItem>
                                                    <SelectItem value="DKV">DKV</SelectItem>
                                                    <SelectItem value="TJKT">TJKT</SelectItem>
                                                    <SelectItem value="CG">CG</SelectItem>
                                                    <SelectItem value="PS">PS</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="pembagianKelas"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pembagian Kelas</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih Jurusan" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="1">1</SelectItem>
                                                    <SelectItem value="2">2</SelectItem>
                                                    <SelectItem value="3">3</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    </div>
                </div>
                <div>
                    hello
                </div>
            </DialogContent>
        </Dialog>
    )
}
