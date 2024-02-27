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
                        <Link href={'/teacher'}>
                            <Button variant={'outline'} className={'w-full'}>
                                Informasi KBM Hari Ini
                            </Button>
                        </Link>

                        <Link href={'/teacher/history'}>
                            <Button variant={'outline'} className={'w-full'}>
                                Riwayat Presensi Harian
                            </Button>
                        </Link>
                        {/*<Button variant={'outline'} className={'w-full'}>*/}
                        {/*    <Link href={'/student/class'}>Presensi Per Pelajaran Hari Ini</Link>*/}
                        {/*</Button>*/}
                        <Link href={'/teacher/schedule'}>
                            <Button variant={'outline'} className={'w-full'}>
                                Jadwal Pembelajaran
                            </Button>
                        </Link>

                        <Link href={'/teacher/setting'}>
                            <Button className={'w-full'}>
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