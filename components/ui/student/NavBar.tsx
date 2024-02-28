"use client"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Menu} from "lucide-react";
import LogoutButton from "@/components/web-component/LogoutButton";
import React from "react";

interface studentNavbar {
    name: string,
    signOutText: string,
}

export default function StudentNavbar({name, signOutText}: studentNavbar) {
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            {/*Selamat Datang, {name}!*/}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger className={'flex gap-2'}>
                    {/*<Button>Menu</Button>*/}
                    <Menu /> Menu
                </SheetTrigger>
                <SheetContent side={'left'}>
                    <SheetHeader>
                        <SheetTitle>{name}</SheetTitle>
                        <SheetDescription>
                            Selamat Datang di School Manager
                        </SheetDescription>
                    </SheetHeader>
                    <div className={'w-full flex flex-col gap-3 mt-10'}>
                        <Link href={'/student'}>
                            <Button
                                variant={'outline'}
                                onClick={() => {setOpen(false)}}
                                className={'w-full'}>
                                Presensi Hari Ini
                            </Button>
                        </Link>
                        <Link href={'/student/history'}>
                            <Button
                                variant={'outline'}
                                onClick={() => {setOpen(false)}}
                                className={'w-full'}>
                                Riwayat Presensi Harian
                            </Button>
                        </Link>

                        <Link href={'/student/class'}>
                            <Button
                                variant={'outline'}
                                onClick={() => {setOpen(false)}}
                                className={'w-full'}>
                                Presensi Jam KBM
                            </Button>
                        </Link>
                        <Link href={'/student/schedule'}>
                            <Button
                                variant={'outline'}
                                onClick={() => {setOpen(false)}}
                                className={'w-full'}>
                                Jadwal Pembelajaran
                            </Button>
                        </Link>

                        <Link href={'/student/setting'}>
                            <Button
                                className={'w-full'}
                                onClick={() => {setOpen(false)}}
                            >
                                Pengaturan Akun
                            </Button>
                        </Link>

                        <LogoutButton text={'Keluar'} />
                    </div>
                </SheetContent>
            </Sheet>

        </div>
    )
}