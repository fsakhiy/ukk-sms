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

interface studentNavbar {
    name: string,
    signOutText: string,
}

export default function TeacherNavbar({name, signOutText}: studentNavbar) {
    return (
        <div>
            {/*Selamat Datang, {name}!*/}
            <Sheet>
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
                        <Button variant={'outline'} className={'w-full'}>
                            <Link href={'/teacher'}>Informasi KBM Hari Ini</Link>
                        </Button>
                        <Button variant={'outline'} className={'w-full'}>
                            <Link href={'/teacher/history'}>Riwayat Presensi Harian</Link>
                        </Button>
                        {/*<Button variant={'outline'} className={'w-full'}>*/}
                        {/*    <Link href={'/student/class'}>Presensi Per Pelajaran Hari Ini</Link>*/}
                        {/*</Button>*/}
                        <Button  className={'w-full'}>
                            <Link href={'/teacher/schedule'}>Jadwal Pembelajaran</Link>
                        </Button>

                    </div>
                </SheetContent>
            </Sheet>

        </div>
    )
}