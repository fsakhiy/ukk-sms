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

export default function StudentNavbar({name, signOutText}: studentNavbar) {
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
                        <Link href={'/student'}>
                            <Button variant={'outline'} className={'w-full'}>
                                Presensi Hari Ini
                            </Button>
                        </Link>
                        <Link href={'/student/history'}>
                            <Button variant={'outline'} className={'w-full'}>
                                Riwayat Presensi Harian
                            </Button>
                        </Link>

                        <Link href={'/student/class'}>
                            <Button variant={'outline'} className={'w-full'}>
                                Presensi Jam KBM
                            </Button>
                        </Link>
                        <Link href={'/student/schedule'}>
                            <Button  variant={'outline'} className={'w-full'}>
                                Jadwal Pembelajaran
                            </Button>
                        </Link>

                        <Link href={'/student/setting'}>
                            <Button  className={'w-full'}>
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