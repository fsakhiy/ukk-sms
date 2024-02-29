"use client"

import {ColumnDef} from "@tanstack/table-core";
import {Checkbox} from "@/components/ui/checkbox";

export type TeacherScheduleDataType = {
    id: number,
    subject: string,
    startTime: string,
    endTime: string,
    classroom: string,
    scheduleOrderName: string
}

export const columns: ColumnDef<TeacherScheduleDataType>[] = [
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
    // {
    //     accessorKey: "id",
    //     header: "Id"
    // },
    {
        accessorKey: "subject",
        header: "Mata Pelajaran"
    },
    {
        accessorKey: "classroom",
        header: "Kelas"
    },
    {
        accessorKey: "scheduleOrderName",
        header: "Jam KBM"
    },
    {
        accessorKey: "startTime",
        header: "Waktu Mulai"
    },
    {
        accessorKey: "endTime",
        header: "Waktu Selesai"
    },
]