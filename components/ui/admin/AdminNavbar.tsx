"use client"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger, navigationMenuTriggerStyle,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import * as React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import LogoutButton from "@/components/web-component/LogoutButton";

const studentsList: { title: string; href: string; description: string }[] = [
    {
        title: "Data Murid",
        href: "/admin/student",
        description:
            "Data Semua Murid",
    },
    {
        title: "Data Sampah Murid",
        href: "/admin/student/trash",
        description:
            "Data semua murid yang telah dihapus",
    },
    {
        title: "Data Presensi Murid",
        href: "/admin/student/presence",
        description:
            "data presensi semua murid hari ini (per hari)",
    },
    {
        title: "Riwayat Presensi Murid",
        href: "/admin/student/presence/history",
        description:
            "data riwayat seluruh presensi murid (per hari)",
    },

]

const classList: { title: string; href: string; description: string }[] = [
    {
        title: "Data kelas",
        href: "/admin/class",
        description:
            "Data Semua Kelas",
    },
    {
        title: "Data Sampah kelas",
        href: "/admin/class/trash",
        description:
            "Data semua kelas yang dihapus",
    },
]

const subjectAndScheduleList: { title: string; href: string; description: string }[] = [
    {
        title: "Data Jadwal Pembelajaran",
        href: "/admin/schedule",
        description:
            "data jadwal pembelajaran untuk semua kelas",
    },
    {
        title: "Data Pelajaran",
        href: "/admin/subject",
        description:
            "semua data pelajaran dan guru pengampu",
    },
    {
        title: "Data Guru",
        href: "/admin/teacher",
        description:
            "data semua guru pengampu",
    }
]

const settingList: { title: string; href: string; description: string }[] = [
    {
        title: "Pengaturan Jam Pembelajaran",
        href: "/admin/schedule/option/schedule-order",
        description:
            "pengaturan banyaknya dan durasi jam pembeljaran setiap harinya",
    },
    {
        title: "Pengaturan Jam Terlambat",
        href: "/admin/student/presence/option",
        description:
            "pengaturan kapan presensi murid dihitung terlambat",
    },
    {
        title: "Halaman SuperAdmin",
        href: "/admin/superadmin",
        description:
            "Halaman SuperAdmin"
    }
]

export default function AdminNavbar() {
    return (
        <NavigationMenu className={'flex flex-row items-center gap-5 p-2'}>

            <NavigationMenuList>

                <NavigationMenuItem>
                    <Link href="/admin" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Dashboard
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>


                <NavigationMenuItem>
                    <NavigationMenuTrigger>Murid</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {studentsList.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Kelas</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {classList.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Pelajaran & Jadwal</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {subjectAndScheduleList.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Pengaturan</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {settingList.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    {/*<Link href="/docs" legacyBehavior passHref>*/}
                    {/*    <NavigationMenuLink className={navigationMenuTriggerStyle()}>*/}
                    {/*        Keluar*/}
                    {/*    </NavigationMenuLink>*/}
                    {/*</Link>*/}
                    <LogoutButton text={'keluar'} />
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
