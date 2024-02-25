"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Toaster} from "@/components/ui/toaster";
import {toast} from "@/components/ui/use-toast";
import {logToClassNew} from "@/app/student/class/action";
import React, {useState} from "react";

interface logPresence {
    studentId: number
    classId: number
    subject: string
}

export default function LogPresence({studentId, classId, subject}: logPresence) {
    const [code, setCode] = useState('')
    const [open, setOpen] = useState(false);

    async function handlePresence() {
        // toast({ description: "hello" })

        try {
            await logToClassNew(studentId, classId, code)
        } catch (error) {
            // console.log(e)
            toast({description: (error as Error).message, variant: 'destructive'})
            return
        }

        toast({description: "sukses"})
        setOpen(!open)
    }

    function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
        setCode(e.target.value)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Toaster />
            <DialogTrigger asChild>
                <Button className={'w-full'}>Masuk Kelas</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Masuk ke {subject}</DialogTitle>
                    <DialogDescription>
                        Silahkan meminta kode kelas dari guru pengampu.
                    </DialogDescription>
                </DialogHeader>

                <div>
                    <div className="">
                        <div className="flex items-center gap-3">
                            <Label htmlFor="name" className="text-left ">
                                Kode Kelas
                            </Label>
                            <Input
                                id="name"
                                // defaultValue=""
                                className=""
                                placeholder={''}
                                value={code}
                                onChange={handleTextChange}
                            />
                            <button ></button>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handlePresence}>masuk</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
)
}