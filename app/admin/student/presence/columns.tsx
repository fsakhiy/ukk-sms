"use client"

import {ColumnDef} from "@tanstack/table-core";
import {Checkbox} from "@/components/ui/checkbox";

export type studentPresenceTableType = {
    id: number,
    name: string,
    classroom: string,
    effectiveDate: string,
    status: string,
    logTime: string,
}

export const columns: ColumnDef<studentPresenceTableType>[] = [
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
        accessorKey: "name",
        header: "Nama Siswa"
    },
    {
        accessorKey: "classroom",
        header: "Kelas Siswa"
    },
    {
        accessorKey: "effectiveDate",
        header: "Tanggal"
    },
    {
        accessorKey: "status",
        header: "Status presensi"
    },
    {
        accessorKey: "logTime",
        header: "Waktu presensi"
    }
]