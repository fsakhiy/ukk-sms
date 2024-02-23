"use client"

import {ColumnDef} from "@tanstack/table-core";
import {Checkbox} from "@/components/ui/checkbox";

export type DailyStudentPresenceDataTableType = {
    id: number,
    date: String,
    status: string,
    logTime: string
}

export const columns: ColumnDef<DailyStudentPresenceDataTableType>[] = [
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
        accessorKey: "status",
        header: "Status Presensi"
    },
    {
        accessorKey: "logTime",
        header: "Waktu Masuk"
    }
]