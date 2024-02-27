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
import {updateUserInformation} from "@/app/student/setting/action";
import {toast} from "@/components/ui/use-toast";
import {Toaster} from "@/components/ui/toaster";


export const formSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(8)
})

interface initialData {
    id: number,
    username: string,
}

export function StudentSettingForm({id, username}: initialData) {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: username,
            password: ""
        },
    })

    // 2. Define a submit handler.
   async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

       await updateUserInformation(id, values)
       toast({description: "data tersimpan"})

        // console.log(values)
    }

    return (
        <Form {...form}>
            <Toaster />
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                masukkan username baru jika ingin mengubahnya
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type={'password'} placeholder={'masukkan pasword baru'} {...field} />
                            </FormControl>
                            <FormDescription>
                                pastikan password yang anda buat aman.
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

