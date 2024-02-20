"use client"

import {ColumnDef} from "@tanstack/table-core";
import {Checkbox} from "@/components/ui/checkbox";

export type StudentClassPresenceDataTableType = {
    id: number,
    date: Date,
    subject: string,
    day: string,
    scheduleOrder: string
    status: string
}

export const columns: ColumnDef<StudentClassPresenceDataTableType>[] = [
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
        accessorKey: "date",
        header: "Tanggal"
    },
    {
        accessorKey: "subject",
        header: "Mata Pelajaran"
    },
    {
        accessorKey: "day",
        header: "Hari"
    },
    {
        accessorKey: "scheduleOrder",
        header: "Jam Pelajaran"
    },
    {
        accessorKey: "status",
        header: "Status Presensi"
    }
]