"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {Button } from "@/components/ui/button"
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
import {Loader2} from "lucide-react";
import {toast} from "@/components/ui/use-toast";
import {Toaster} from "@/components/ui/toaster";
import {changeLateSetting} from "@/app/admin/student/presence/option/action";


export const formSchema = z.object({
    time: z.string().min(5).max(5)
    // password: z.string().min(8)
})

interface initialData {
    time: string,
}

export function LateSettingForm({time}: initialData) {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            time: time
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        await changeLateSetting(values)
        toast({description: "data tersimpan"})

        // console.log(values)
    }

    return (
        <Form {...form}>
            <Toaster />
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Waktu Terlambat</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                masukkan sesuai format &ldquo;mm:dd&rdquo; contoh &ldquo;07:00&rdquo; atau &ldquo;07:05&rdquo; (tanpa tanda kutip)
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {form.formState.isSubmitting ?
                    <Button type={'submit'} disabled><Loader2 className={'mr-2 h-4 w-4 animate-spin'}/>Mengubah data</Button>
                    :
                    <Button type="submit">Simpan Perubahan</Button>
                }
            </form>
        </Form>
    )
}

