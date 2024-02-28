"use client"

import {ColumnDef} from "@tanstack/table-core";
import {Checkbox} from "@/components/ui/checkbox";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Info} from "lucide-react";

export type ScheduleDetailDataType = {
    id: number,
    subject: string,
    teacher: string,
    scheduleOrder: string,
    startTime: string,
    endTime: string
}

export const columns: ColumnDef<ScheduleDetailDataType>[] = [
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={
    //                 table.getIsAllPageRowsSelected() ||
    //                 (table.getIsSomePageRowsSelected() && "indeterminate")
    //             }
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label="Select all"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    {
        accessorKey: "id",
        header: "Id"
    },
    {
        accessorKey: "subject",
        header: "Mata Pelajaran"
    },
    {
        accessorKey: "teacher",
        header: "Guru Pengampu"
    },
    {
        accessorKey: "scheduleOrder",
        header: "Jam ke"
    },
    {
        accessorKey: "startTime",
        header: "Waktu Dimulai"
    },
    {
        accessorKey: "endTime",
        header: "Waktu Selesai"
    },
]