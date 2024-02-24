"use client"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

// interface adminNavbar {
//     name: string
// }
//
// export default function AdminNavbar() {
//     return (
//         <NavigationMenu>
//             <NavigationMenuList>
//                 <NavigationMenuItem>
//                     <NavigationMenuTrigger>Murid</NavigationMenuTrigger>
//                     <NavigationMenuContent>
//                         <Link href="/admin/student" legacyBehavior passHref>
//                             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//                                 Data Murid
//                             </NavigationMenuLink>
//                         </Link>
//                     </NavigationMenuContent>
//                 </NavigationMenuItem>
//
//             </NavigationMenuList>
//         </NavigationMenu>
//     )
// }

import * as React from "react"
import { cn } from "@/lib/utils"


const studentsList: { title: string; href: string; description: string }[] = [
    {
        title: "Data Murid",
        href: "/admin/student",
        description:
            "Data Semua Murid",
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
        title: "Pengaturan Jam Pembelajaran",
        href: "/admin/schedule/option/schedule-order",
        description:
            "pengaturan banyaknya dan durasi jam pembeljaran setiap harinya",
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

export default function AdminNavbar() {
    return (
        <NavigationMenu className={'flex flex-row items-center gap-5 p-3'}>

            <NavigationMenuList className={'flex'}>

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
